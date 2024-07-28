import React, { useState, useEffect } from 'react';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import TreeNode from '../TreeNode/TreeNode';
import { parseFileTree, addNodeToTree } from '../../utils';
import './TreeView.css';
import { fetchData } from '../../api';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const TreeView = () => {
  const [data, setData] = useState({ name: 'root', children: [] });

  useEffect(() => {
    const storedFileStructure = window.localStorage.getItem("fileStructure");
    if (storedFileStructure) {
      const parsedData = JSON.parse(storedFileStructure);
      setData(parsedData);
    } else {
      refreshData();
    }
  }, []);

  const refreshData = () => {
    fetchData()
      .then(responseData => {
        const treeData = parseFileTree(responseData.filepaths);
        setData(treeData);
        window.localStorage.setItem("fileStructure", JSON.stringify(treeData));
      })
  }

  const handleAddNode = (parentNode) => {
    const nodeName = prompt('Enter node name (use / to create folder structure):');
    if (nodeName) {
      setData(prevData => {
        const newData = {...prevData};
        if (parentNode.name === 'root') {
          addNodeToTree(newData, newData, nodeName);
        } else {
          addNodeToTree(newData, parentNode, nodeName);
        }
        window.localStorage.setItem("fileStructure", JSON.stringify(newData));
        return newData;
      });
    }
  };

  const handleRemoveNode = (nodeToRemove) => {
    const removeNode = (node, parent) => {
      if (node === nodeToRemove) {
        const index = parent.children.indexOf(node);
        if (index !== -1) {
          parent.children.splice(index, 1);
        }
      } else {
        if (node.children) {
          node.children.forEach(child => removeNode(child, node));
        }
      }
    };
    setData(prevData => {
      const newData = { ...prevData };
      if (newData === nodeToRemove) {
        return { name: 'root', children: [] };
      }
      newData.children.forEach(child => removeNode(child, newData));
      window.localStorage.setItem("fileStructure", JSON.stringify(newData));
      return newData;
    });
  };

  return (
    <div className="tree-view">
      <div className="tree-refresh" onClick={refreshData}>
        <FontAwesomeIcon icon={faArrowsRotate} />
      </div>
      <TreeNode node={data} onAdd={handleAddNode} onRemove={handleRemoveNode} isRoot />
    </div>
  );
};

export default TreeView;
