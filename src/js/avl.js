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
            config.avlRoot = avl.insertNode(config.avlRoot, key)
            config.avlRoot = avl.getBalanceFactor(config.avlRoot)
        })
    },

    insertNode: (node, key) => {
        if(!Object.keys(node).length) {
            node = avl.node()
            node.data = key
        }
        else if (key<node.data) {
            if (node.left) {
                node.left = avl.insertNode(node.left, key)
            }
            else {
                node.left = avl.node(node)
                node.left.data = key
            }
        }
        else if (key>node.data) {
            if (node.right) {
                node.right = avl.insertNode(node.right, key)
            }
            else {
                node.right = avl.node(node)
                node.right.data = key
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
            if(node.left) bf += avl.getHeight(node.left)
            if(node.right) bf -= avl.getHeight(node.right)
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
    }
}

export default avl