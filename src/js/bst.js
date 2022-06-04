import config from "./config"

let bst = {
    node: (parent=null) => ({
        parent,
        left: null,
        right: null,
        data: null,
        bf: 0
    }),
    create: (input, animation) => {
        input.map(key => {
            config.bstRoot = bst.insertNode(config.bstRoot, key)
        })
    },

    insertNode: (node, key) => {
        if(!Object.keys(node).length) {
            node = bst.node()
            node.data = key
        }
        else if (key<node.data) {
            if (node.left) node.left = bst.insertNode(node.left, key)
            else {
                node.left = bst.node(node)
                node.left.data = key
            }
        }
        else if (key>node.data) {
            if (node.right) node.right = bst.insertNode(node.right, key)
            else {
                node.right = bst.node(node)
                node.right.data = key
            }
        }

        return node
    }
}

export default bst