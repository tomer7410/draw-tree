import React from 'react'
import { isLeaf, setTreePositionWraped} from './treeClass'
import './tree.css' 
import { PaintedTreeProps, TreeProps,Point,DrawLineProps } from './interfaces'
import { Line } from 'react-lineto';
const DrawLine = ({startedPoint,endPoint}: DrawLineProps) => {
    return (
        <Line x0={startedPoint.x} y0={startedPoint.y} x1={endPoint.x} y1={endPoint.y} borderWidth ={1} />
    )
}
const createLines = (father:JSX.Element,children:JSX.Element[],nodeSize:number) =>{
    const offset =  0.5 * nodeSize
    const fatherPoint : Point = { x:father.props.style.left + offset, y:father.props.style.top + nodeSize}
    const childrenPoints = children.map((child:JSX.Element) : Point=>({x:child.props.tree.x + offset   ,y:child.props.tree.y}))
    return childrenPoints.map((childPos,index:number)=>{
        return <DrawLine startedPoint={fatherPoint} endPoint ={childPos} key ={index} ></DrawLine>
    })
    
    
}
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
         {createLines(node,children,nodeSize)}
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