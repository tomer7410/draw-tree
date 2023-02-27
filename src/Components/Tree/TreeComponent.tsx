import React from 'react'
import { PaintedTree,Tree, isLeaf,buildTree, setTreePositionWraped} from './treeClass'
import './tree.css' 
import { PaintedTreeProps, TreeProps,Point } from '../../interfaces'
function radians_to_degrees(radians:number)
{
  var pi = Math.PI;
  return radians * (180/pi);
}
const drawLine = (startedPoint:Point, angle:number , length:number) => {
    return (
        <div style ={{width:'1px', height:length, background:'red', position:'absolute', top : startedPoint.y, left : startedPoint.x,transform:`rotate(${angle}deg)`}}>

        </div>
    )
}
const createLines = (father:JSX.Element,children:JSX.Element[],nodeSize:number) =>{
    const offset =  0.5 * nodeSize
    const fatherPoint : Point = { x:father.props.style.left + offset, y:father.props.style.top + nodeSize }
    const childrenPoints = children.map((child:JSX.Element) : Point=>({x:child.props.tree.x + offset,y:child.props.tree.y}))
    const nOfChildren = children.length
    let lines = null
    if(nOfChildren == 1){
        lines =  drawLine(fatherPoint,0,childrenPoints[0].y - fatherPoint.y)
    }
    else{
        
        const limitIndex = nOfChildren % 2 == 0 ? nOfChildren / 2 : Math.floor((nOfChildren / 2)) + 1
        lines =  childrenPoints.map((childPos:Point,index:number) =>{
            const xDiff = (fatherPoint.x - childPos.x)
            const yDiff = (childPos.y - fatherPoint.y)
            const d = Math.abs(Math.sqrt(xDiff*xDiff + yDiff*yDiff))
            const x = fatherPoint.x - childPos.x
            const y = childPos.y - fatherPoint.y
            const angle  = Math.atan2(y,x) * 180 / Math.PI 
            return (drawLine(fatherPoint,angle,d))
            
        })
    }
    
    return lines
    
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

// const drawLine = (fatherPoint:Point,childPoint:Point) =>{
//     const xDiff = (fatherPoint.x - childPoint.x)
//     const yDiff = (fatherPoint.y - childPoint.y)
//     const d = Math.floor(Math.sqrt(xDiff*xDiff + yDiff*yDiff))
//     const array = new Array(d).fill(0)
//     let startedPoint = fatherPoint
//     let line = null
//     if(xDiff === 0){
       
//         line = array.map((point,index)=>{
//             startedPoint.y += (index * 2)
//             return (
//                 <div style={{width:'2px',height:'2px',background:'red',  position:'absolute' ,top:startedPoint.y,left:startedPoint.x}}></div>
//             )
//         })
//     }
//     else{
//         const a =  (yDiff / xDiff) 
//         const b = fatherPoint.y - (a * fatherPoint.x)
//         const f = (x:number) => a * x + b
//         line = array.map((point,index)=>{
//             startedPoint.x = a < 0 ? startedPoint.x -= (index * 2) : startedPoint.x += (index * 2)
//             startedPoint.y = f(startedPoint.x)
//             return (
//                 <div style={{width:'2px',height:'2px',background:'red', position:'absolute', top:startedPoint.y,left:startedPoint.x}}></div>
//             )
//         })
//     }
//     return line
   
// }