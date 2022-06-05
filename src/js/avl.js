let avl = {
    node: (data, parent=null) => ({
        parent,
        left: null,
        right: null,
        data,
        bf: 0
    }),
    create: (input, animation) => {
        let node = {}
        let lastNode = {}
        for (let i=0; i<input.length; i++) {
            if(i===0) node = avl.node(input[i])
            else {
                lastNode = avl.insertNode(node, input[i])
                avl.getBalanceFactor(node)
                console.log({...node}, {...lastNode})
                node = avl.balanceTree(lastNode)
            }
        }
        return node
    },

    insertNode: (node, key) => {
        let lastNode = {}
        if (key<node.data) {
            if (node.left && Object.keys(node.left).length) {
                lastNode = avl.insertNode(node.left, key)
            }
            else {
                node.left = avl.node(key, node)
                lastNode = {...node.left}
            }
        }
        else if (key>node.data) {
            if (node.right && Object.keys(node.right).length) {
                lastNode = avl.insertNode(node.right, key)
            }
            else {
                node.right = avl.node(key, node)
                lastNode = {...node.right}
            }
        }
        return lastNode
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
        let node = lastNode
        let isBalanced = false
        while (node.parent) {
            node = node.parent
            console.log('current', node)
            if (isBalanced) continue
            if(node.bf > 1) {
                if(avl.isNode(node.left) && node.left.bf>0){
                    avl.rotateLL (node)
                    isBalanced = true
                }
                if(avl.isNode(node.left) && node.left.bf<0){
                    avl.rotateLR (node)
                    isBalanced = true
                }
            }
            else if(node.bf < -1){
                if(avl.isNode(node.right) && node.right.bf<0){
                    avl.rotateRR (node)
                    isBalanced = true
                }
                if(avl.isNode(node.right) && node.right.bf>0){
                    avl.rotateRL (node)
                    isBalanced = true
                }
            }
        }
        return node
    },
    rotateLL: node => {
        console.log('ll', {...node})
        let parent = node.parent
        let left = node.left
        let right = node.right
        let leftOfLeft = node.left.left
        let rightOfLeft = node.left.right

        let newNode = avl.node(left.data, parent)
        newNode.right = node
        newNode.left = leftOfLeft
        newNode.right.left = rightOfLeft
        newNode.left.parent = newNode
        newNode.right.parent = newNode

        if (parent) {
            if (newNode.data<parent.data) parent.left = newNode
            else parent.right = newNode
        }
    },
    rotateRR: node => {
        console.log('rr', {...node})
        let parent = node.parent
        let left = node.left
        let right = node.right
        let leftOfRight = node.right.left
        let rightOfRight = node.right.right

        let newNode = avl.node(right.data, parent)
        newNode.left = node
        newNode.right = rightOfRight
        newNode.left.right = leftOfRight
        newNode.left.parent = newNode
        newNode.right.parent = newNode

        if (parent) {
            if (newNode.data<parent.data) parent.left = newNode
            else parent.right = newNode
        }
    },
    rotateLR: node => {
        console.log('lr', {...node})
        let parent = node.parent
        let left = node.left
        let right = node.right
        let leftOfLeft = node.left.left
        let rightOfLeft = node.left.right
        let leftOfRightOfLeft = node.left.right.left
        let rightOfRightOfLeft = node.left.right.right

        let newNode = avl.node(rightOfLeft.data, parent)
        newNode.right = node
        newNode.left = left
        newNode.left.right = leftOfRightOfLeft
        newNode.right.left = rightOfRightOfLeft
        newNode.left.parent = newNode
        newNode.right.parent = newNode

        if (parent) {
            if (newNode.data<parent.data) parent.left = newNode
            else parent.right = newNode
        }
    },
    rotateRL: node => {
        console.log('rl', {...node})
        let parent = node.parent
        let left = node.left
        let right = node.right
        let leftOfRight = node.right.left
        let rightOfRight = node.right.right
        let rightOfLeftOfRight = node.right.left.right
        let leftOfLeftOfRight = node.right.left.left

        let newNode = avl.node(leftOfRight.data, parent)
        newNode.left = node
        newNode.right = right
        newNode.left.right = leftOfLeftOfRight
        newNode.right.left = rightOfLeftOfRight
        newNode.left.parent = newNode
        newNode.right.parent = newNode

        if (parent) {
            if (newNode.data<parent.data) parent.left = newNode
            else parent.right = newNode
        }
    },
    isNode: node => node && Object.keys(node).length > 0
}

export default avl