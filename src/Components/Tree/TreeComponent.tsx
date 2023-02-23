import React from 'react'
import { PaintedTree,Tree, isLeaf, setTreePositionWraped,buildTree} from './treeClass'
import './tree.css' 
import { PaintedTreeProps, TreeProps } from '../../interfaces'
import LineTo from 'react-lineto';

const DrawTree = ({tree,nodeSize} : PaintedTreeProps) :JSX.Element =>{
    let children = null
    const node = (
        <div className='node' 
            style ={{ width:`${nodeSize}px`, height:`${nodeSize}px`,top:tree.y,left:tree.x}}>{tree.value}
        </div>
    )
    if(isLeaf(tree)){
        return node
    }
    children = tree.children.map((child)=><DrawTree tree = {child} nodeSize = {nodeSize}/>)
    return(
        <>
         {node}
         {children}
        </>
    )
}
const TreeComponent = ({tree,minGap,nodeSize} :TreeProps) : JSX.Element =>  {
    // you can bulid however you want 
   const x = 0
   const y = 0
   const tree2Draw = setTreePositionWraped(tree,x,y,0,minGap,nodeSize)
   return (
   <div className='tree-container'>
       <DrawTree tree = {tree2Draw} nodeSize = {nodeSize}/>
   </div>)
}

export default TreeComponent
