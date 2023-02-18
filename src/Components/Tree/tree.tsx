import React,{useState,useEffect} from 'react'

class Tree {
    value: number
    children: Array<Tree>
    constructor(value:number,children:Tree[]){
        this.value = value
        this.children = children
    }
   
   
}
function isLeaf(t:Tree){
    const x = t.children.length == 0
    return x
}
function findDividers(number:number) :Array<number>{
    const dividers = [1]
    for (let index = 2; index < number; index++) {
        if(number % index == 0){
            dividers.push(index)
        }
        
    }
    return dividers
}
let firstNextChildPosX : {[level:number]:number} = {0:0}

function findMax(arr:number[]){
    let max = arr[0]
    for (let index = 1; index < arr.length; index++) {
        const element = arr[index];
        if(element > max){
            max = element
        }
        
    }
    return max
}
const DrawTree = ({tree,x,y,toWrite=false,level} :{tree:Tree,x:number,y:number,toWrite?:boolean,level:number}) : JSX.Element =>{
    let children = null
    const gap = 50
    const isLeafNode = isLeaf(tree)
    let fatherPosX = 0;
    let fatherPosY = y;
    (firstNextChildPosX[level] = x + 30 + gap ) 
    if(isLeafNode){
        return  (
            <div style={{width:'30px',height:'30px',border:'1px red solid',position:'absolute', top:y, left:x,display:'flex',justifyContent:'center'}}>{tree.value}</div>
        )
    }
    else{
        const nOfChildren = tree.children.length;
        const childrenAreaWidth = (nOfChildren * 30) + (nOfChildren - 1) * gap
        const childrenAreaHeight = 30 +  gap;  
        const childrenPosX = !firstNextChildPosX[level] && !firstNextChildPosX[level+1] ?  (x + 15) - (childrenAreaWidth / 2)  : 
        firstNextChildPosX[level] ? firstNextChildPosX[level] : firstNextChildPosX[level+1] 
        const childrenPosY = y + childrenAreaHeight 
        const firstChildPosX = childrenPosX
        let lastChildPosX = 0
        children = tree.children.map((child,index)=>{
            const x = childrenPosX + ((30 + gap) * index ) 
            const y = childrenPosY
            if(index == nOfChildren -1){
                lastChildPosX = x
                return <DrawTree tree = {child}  x={x} y = {y} toWrite = {true} level = {level + 1}/>
                
            }
            return <DrawTree tree = {child}  x={x} y = {y} level = {level + 1}/>
        })
        
        fatherPosX =   ((firstChildPosX + lastChildPosX  ) / 2)
        // firstNextChildPosX[level] = x + 30 + gap 
       
    }

    return (
        <>
        {children} 
        <div style={{width:'30px',height:'30px',border:'1px red solid',position:'absolute', top:fatherPosY, left:fatherPosX ,display:'flex',justifyContent:'center'}}>{tree.value}</div>
        </>
        
    )
}
const buildTree = (number:number) : Tree=> {

    if(number == 1) return new Tree(1,new Array<Tree>())

    const dividers = findDividers(number)
    const children = dividers.map((divider)=>{
        return (buildTree(divider))
    })
    return new Tree(number,children)
}
const Tree1 = () : JSX.Element =>  {
   const tree = buildTree(128)
   const x = (1530/2) - 15
   const y = 0
   return (
   <div style = {{width:'100%',height:'100%'}}>
       <DrawTree tree={tree} x = {x} y = {y} level = {0} />
   </div>)
}

export default Tree1

// children.length % 2 == 0 ?
//                     children.map((t,index)=>{   
//                         let wantedAngle = null             
//                         if(index % 2 == 0){
//                             currentAngle += offfsetAngle;
//                             wantedAngle = currentAngle
        
//                         }
//                         else{
//                             wantedAngle = 360 - currentAngle
//                         }
//                         return (
//                             <div style ={{ display:'flex' ,alignItems:'center', flexDirection:'column'}}>
//                                 <div className='solid' style={{width:'2px',height:'70px',backgroundColor:'green'}}>
//                                 </div>
//                                 <TreeItem key={index} value={t.value} children = {t.children}></TreeItem>
//                             </div>
//                         )
                        
//                     })
//                     : children.map((t,index)=>{ 
//                         let wantedAngle = null
//                         if(index<midlleIndex){
//                             currentAngle += offfsetAngle
//                             wantedAngle = currentAngle
//                         }
//                         else{
//                             if(index === midlleIndex) wantedAngle = 0
//                             else{
//                                 wantedAngle = 360 - currentAngle;
//                                 currentAngle -= offfsetAngle

//                             }
//                         }
//                         return (
//                             <div style ={{ display:'flex' , transform:`rotate(0deg)`,alignItems:'center', flexDirection:'column'}}>
//                                 <div className='solid' style={{width:'2px',height:'70px',backgroundColor:'green'}}>
//                                 </div>
//                                 <TreeItem key={index} value={t.value} children = {t.children}></TreeItem>
//                             </div>
//                         )

//                     })