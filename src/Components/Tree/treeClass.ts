export class Tree {
    value: number
    children: Array<Tree>
    constructor(value:number,children:Tree[]){
        this.value = value
        this.children = children
    }
    
   
}
export class PaintedTree{
    value:number
    children : PaintedTree[]
    x:number
    y:number
    constructor(value:number,children:PaintedTree[],x:number,y:number){
        this.value = value
        this.children = children;
        this.x = x;
        this.y = y
    }
}

export function isLeaf(t:PaintedTree | Tree){
    const x = t.children.length == 0
    return x
}

export function findDividers(number:number) :Array<number>{
    const dividers = [1]
    for (let index = 2; index < number; index++) {
        if(number % index == 0){
            dividers.push(index)
        }
        
    }
    return dividers
}
export const  setTreePositionWraped = (paintedTree:Tree,x:number,y:number,minPosX:number) =>{
    const setTreePosition = (paintedTree:Tree,x:number,y:number) =>{
        let children = null
        const gap = 50
        const isLeafNode = isLeaf(paintedTree)
        let fatherPosX = 0;
        let fatherPosY = y;
        const nOfChildren = paintedTree.children.length;
        if(isLeafNode){
            if(x<minPosX){
                minPosX += 30 + gap
                x = minPosX
            }
            minPosX = x
            return new PaintedTree(paintedTree.value,[],x,y)
        }
        else {
            const childrenAreaWidth = (nOfChildren * 30) + (nOfChildren - 1) * gap
            const childrenAreaHeight = 30 +  gap;  
            let childrenPosX = (x + 15) - (childrenAreaWidth / 2)  
            const childrenPosY = y + childrenAreaHeight 
            children = paintedTree.children.map((child:Tree,index:number) : PaintedTree=>{
                const x = childrenPosX + ((30 + gap) * index ) 
                return setTreePosition(child,x,childrenPosY)
            })
            const firstChildrenXPos = children[0].x
            const lastChildrenXPos = children[nOfChildren - 1].x   
            fatherPosX =   ((firstChildrenXPos + lastChildrenXPos  ) / 2)
            return new PaintedTree(paintedTree.value,children,fatherPosX,fatherPosY)
        }
    }
   return (setTreePosition(paintedTree,x,y))
}

export const buildTree = (number:number) : Tree=> {

    if(number == 1) return new Tree(1,new Array<Tree>())

    const dividers = findDividers(number)
    const children = dividers.map((divider)=>{
        return (buildTree(divider))
    })
    return new Tree(number,children)
}