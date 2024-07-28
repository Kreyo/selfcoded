export const parseFileTree = (filePaths) => {
  const root = { name: 'root', children: [] };

  filePaths.forEach(path => {
    const parts = path.split('/');
    let current = root;

    parts.forEach((part, index) => {
      let child = current.children.find(child => child.name === part);
      if (!child) {
        child = { name: part, children: index === parts.length - 1 ? null : [] };
        current.children.push(child);
      }
      current = child;
    });
  });

  return root;
};

export const addNodeToTree = (root, parentNode, nodeName) => {
  const parts = nodeName.split('/');
  let current = parentNode;

  parts.forEach((part, index) => {
    let child = current.children.find(child => child.name === part);
    if (!child) {
      child = { name: part, children: index === parts.length - 1 ? null : [] };
      current.children.push(child);
    }
    current = child;
  });
};
