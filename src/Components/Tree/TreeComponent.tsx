import React from 'react'
import { PaintedTree,Tree, isLeaf, setTreePositionWraped,buildTree} from './treeClass'

const DrawTree = (tree:PaintedTree) :JSX.Element =>{
    let children = null
    if(isLeaf(tree)){
        return (
            <div 
                style ={{position:'absolute', textAlign:'center', width:'30px', height:'30px', border:'1px red solid', borderRadius:'50%',top:tree.y,left:tree.x}}>{tree.value}
            </div>
        )
    }
    children = tree.children.map((child)=>DrawTree(child))
    return(
        <>
          <div 
                style ={{position:'absolute', textAlign:'center', width:'30px', height:'30px', border:'1px red solid', borderRadius:'50%',top:tree.y,left:tree.x}}>{tree.value}
         </div>
         {children}
        </>
    )
}
const TreeComponent = (tree:Tree) : JSX.Element =>  {
    // you can bulid however you want 
   const x = 0
   const y = 0
   const tree2Draw = setTreePositionWraped(tree,x,y,0)
   return (
   <div style = {{width:'100%',height:'100%'}}>
       <DrawTree {...tree2Draw}/>
   </div>)
}

export default TreeComponent
