import React from 'react';
import TreeComponent from './lib/Components/Tree/TreeComponent';
import './App.css';
import { buildTree } from './lib/treeClass';

const tree = buildTree(16) // you can build however you want 
function App() {
  return (
    <div className="App">
      <TreeComponent tree ={tree} minGap = {50} nodeSize = {50} ></TreeComponent> 
    </div>
  );
}

export default App;
