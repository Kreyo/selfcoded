import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFolderOpen, faFile, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import './TreeNode.css';

const TreeNode = ({ node, onAdd, onRemove, isRoot }) => {
  const [toggled, setToggled] = useState(false);

  const handleToggle = () => {
    setToggled(!toggled);
  };

  const handleAdd = () => {
    onAdd(node);
  };

  const handleRemove = () => {
    onRemove(node);
  };

  const isOpened = () => {
    return toggled || isRoot;
  }

  return (
    <div className="tree-node" style={{ marginLeft: isRoot ? '0px' : '20px' }}>
      <div className="node-header">
        <span onClick={handleToggle} style={{ cursor: 'pointer' }}>
          <span className="node-icon">
            {node.children && node.children.length > 0 ? (
              isOpened() ? <FontAwesomeIcon icon={faFolderOpen} /> : <FontAwesomeIcon icon={faFolder} />
            ) : (
              <FontAwesomeIcon icon={faFile} />
            )}
          </span>
          {node.name}
        </span>
        <span className="node-actions">
          {node.children && isOpened() && <FontAwesomeIcon icon={faPlus} onClick={handleAdd} />}
          {!isRoot && <FontAwesomeIcon icon={faTrash} onClick={handleRemove} />}
        </span>
      </div>
      {isOpened() && node.children && node.children.length > 0 && (
        <div className="node-children">
          {node.children.map((child, index) => (
            <TreeNode key={index} node={child} onAdd={onAdd} onRemove={onRemove} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
