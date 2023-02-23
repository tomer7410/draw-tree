import React from 'react';
import logo from './logo.svg';
import TreeComponent from './Components/Tree/TreeComponent';
import './App.css';
import { buildTree } from './Components/Tree/treeClass';

const tree = buildTree(32) // you can build however you want 
function App() {
  return (
    <div className="App">
      <TreeComponent {...tree}></TreeComponent> 
    </div>
  );
}

export default App;
