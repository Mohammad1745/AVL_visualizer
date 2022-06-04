import config from "./config"

let avl = {
    node: (parent=null) => ({
        parent,
        left: null,
        right: null,
        data: null,
        bf: 0
    }),
    create: (input, animation) => {
        input.map(key => {
            let output = avl.insertNode(config.avlRoot, key)
            config.avlRoot = output.node
            config.avlRoot = avl.getBalanceFactor(config.avlRoot)
            config.avlRoot = avl.balanceTree(output.lastNode)
        })
    },

    insertNode: (node, key) => {
        let lastNode = {}
        if(!Object.keys(node).length) {
            node = avl.node()
            node.data = key
            lastNode = node
        }
        else if (key<node.data) {
            if (node.left) {
                let output = avl.insertNode(node.left, key)
                node.left = output.node
                lastNode = output.lastNode
            }
            else {
                node.left = avl.node(node)
                node.left.data = key
                lastNode = node.left
            }
        }
        else if (key>node.data) {
            if (node.right) {
                let output = avl.insertNode(node.right, key)
                node.right = output.node
                lastNode = output.lastNode
            }
            else {
                node.right = avl.node(node)
                node.right.data = key
                lastNode = node.right
            }
        }
        return {node, lastNode}
    },
    balanceTree: (lastNode) => {
        let node = lastNode
        let isBalanced = false
        while (node.parent) {
            node = node.parent
            if (isBalanced) continue
            if(node.bf > 1) {
                if(node.left && node.left.bf>0){
                    console.log(node, "LL rotate")
                }
                if(node.left && node.left.bf<0){
                    console.log(node, "LR rotate")
                }
            }
            else if(node.bf < -1){
                if(node.right && node.right.bf<0){
                    node = avl.rotateRR (node)
                    isBalanced = true
                }
                if(node.right && node.right.bf>0){
                    console.log(node, "RL rotate")
                }
            }
        }
        return node
    },
    getBalanceFactor: node => {
        let bf = 0
        if(!Object.keys(node).length) {
            return null
        }
        else {
            if(node.left) bf += (avl.getHeight(node.left)+1)
            if(node.right) bf -= (avl.getHeight(node.right)+1)
            node.bf = bf
            if(node.left) node.left = avl.getBalanceFactor(node.left)
            if(node.right) node.right = avl.getBalanceFactor(node.right)
        }
        return node
    },
    getHeight: node => {
        if (!node) return 0
        if (!node.left && !node.right) return 0;
        else if (!node.right) {
            if (!node.left.left && !node.left.right) return 1
            else return avl.getHeight(node.left) +1
        }
        else if (!node.left) {
            if (!node.right.left && !node.right.right) return 1
            else return avl.getHeight(node.right) +1
        }
        else {
            let leftHeight = avl.getHeight(node.left)
            let rightHeight = avl.getHeight(node.right)
            return Math.max(leftHeight, rightHeight) + 1
        }
    },
    rotateRR: node => {
        let parent = node.parent
        let left = node.left
        let right = node.right
        let leftOfParent = parent.left
        let rightOfParent = parent.right
        let leftOfRight = node.right.left
        let rightOfRight = node.right.right

        let newNode = {...right}
        newNode.left = {...node}
        newNode.left.right = {...leftOfRight}
        if (parent) newNode.parent = {...parent}
        node = {...newNode}
        node.parent.right = {...newNode}
        return node
    }
}

export default avl