import { PaintedTree, Tree } from "./Components/Tree/treeClass"

export interface TreeProps {
    tree:Tree,
    minGap:number,
    nodeSize:number
}
export interface PaintedTreeProps {
    tree:PaintedTree,
    nodeSize:number
}
