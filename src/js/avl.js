import config from "./config"

let avl = {
    node: (parent=null, data=null) => ({
        parent,
        left: null,
        right: null,
        data,
        bf: 0
    }),
    create: (input, animation) => {
        // input.map(key => {
        //     let output = avl.insertNode(config.avlRoot, key)
        //     config.avlRoot = output.node
        //     config.avlRoot = avl.getBalanceFactor(config.avlRoot)
        //     config.avlRoot = avl.balanceTree(output.lastNode)
        // })
        let node = {}
        for (let i=0; i<input.length; i++) {
            if(i===0) node = avl.node(input[i])
            else {
                let lastNode = {}
                avl.insertNode(node, lastNode, input[i])
                avl.getBalanceFactor(node)
                // avl.balanceTree(node, lastNode)
            }
            console.log({...node})
        }
        return node
    },

    insertNode: (node, lastNode, key) => {
        if (key<node.data) {
            if (node.left && Object.keys(node.left).length) {
                avl.insertNode(node.left, lastNode, key)
            }
            else {
                node.left = avl.node(node, key)
                lastNode = node.left
            }
        }
        else if (key>node.data) {
            if (node.right && Object.keys(node.right).length) {
                avl.insertNode(node.right, lastNode, key)
            }
            else {
                node.right = avl.node(node, key)
                lastNode = node.right
            }
        }
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
            if(node.left) avl.getBalanceFactor(node.left)
            if(node.right) avl.getBalanceFactor(node.right)
        }
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
    balanceTree: (lastNode) => {
        let node = {...lastNode}
        let isBalanced = false
        while (node.parent) {
            node = node.parent
            if (isBalanced) continue
            if(node.bf > 1) {
                if(node.left && node.left.bf>0){
                    node = avl.rotateLL (node)
                    isBalanced = true
                }
                if(node.left && node.left.bf<0){
                    node = avl.rotateLR (node)
                    isBalanced = true
                }
            }
            else if(node.bf < -1){
                if(node.right && node.right.bf<0){
                    node = avl.rotateRR (node)
                    isBalanced = true
                }
                if(node.right && node.right.bf>0){
                    node = avl.rotateRL (node)
                    isBalanced = true
                }
            }
        }
        return node
    },
    rotateLL: node => {
        let parent = node.parent
        let left = node.left
        let rightOfLeft = node.left.right

        let newNode = {...left}
        newNode.right = {...node}
        newNode.right.left = {...rightOfLeft}
        if (parent) newNode.parent = parent
        node = newNode
        if (parent) {
            if (newNode.data<parent.data) node.parent.left = node
            else node.parent.right = node
        }
        return node
    },
    rotateRR: node => {
        let parent = node.parent
        let left = node.left
        let right = node.right
        let leftOfRight = node.right.left

        let newNode = {...right}
        newNode.left = {...node}
        newNode.left.right = {...leftOfRight}
        if (parent) newNode.parent = parent
        node = newNode
        if (parent) {
            if (newNode.data<parent.data) node.parent.left = node
            else node.parent.right = node
        }
        return node
    },
    rotateLR: node => {
        let parent = node.parent
        let left = node.left
        let rightOfLeft = node.left.right
        let leftOfRightOfLeft = node.left.right.left
        let rightOfRightOfLeft = node.left.right.right

        let newNode = {...rightOfLeft}
        newNode.left = {...left}
        newNode.right = {...node}
        newNode.left.right = {...leftOfRightOfLeft}
        newNode.right.left = {...rightOfRightOfLeft}
        if (parent) newNode.parent = parent
        node = newNode
        if (parent) {
            if (newNode.data<parent.data) node.parent.left = node
            else node.parent.right = node
        }
        return node
    },
    rotateRL: node => {
        let parent = node.parent
        let right = node.right
        let leftOfRight = node.right.left
        let leftOfLeftOfRight = node.right.left.left
        let rightOfLeftOfRight = node.right.left.right

        let newNode = {...leftOfRight}
        newNode.right = {...right}
        newNode.left = {...node}
        newNode.right.left = {...rightOfLeftOfRight}
        newNode.left.right = {...leftOfLeftOfRight}
        if (parent) newNode.parent = parent
        node = newNode
        if (parent) {
            if (newNode.data < parent.data) node.parent.left = node
            else node.parent.right = node
        }
        return node
    },
}

export default avl