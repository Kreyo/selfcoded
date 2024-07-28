import React from 'react';
import TreeView from './components/TreeView/TreeView';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>File Tree Viewer</h1>
      </header>
      <TreeView />
    </div>
  );
}

export default App;
