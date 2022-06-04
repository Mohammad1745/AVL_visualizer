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
        })
    },

    insertNode: (node, key) => {
        if(!Object.keys(node).length) {
            node = avl.node()
            node.data = key
        }
        else if (key<node.data) {
            if (node.left) node.left = avl.insertNode(node.left, key)
            else {
                node.left = avl.node(node)
                node.left.data = key
            }
        }
        else if (key>node.data) {
            if (node.right) node.right = avl.insertNode(node.right, key)
            else {
                node.right = avl.node(node)
                node.right.data = key
            }
        }

        return node
    }
}

export default avl