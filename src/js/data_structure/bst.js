let bst = {
    node: (data, parent=null) => ({
        parent,
        left: null,
        right: null,
        data,
        bf: 0
    }),
    create: (input, animation) => {
        let node = {}
        for (let i=0; i<input.length; i++) {
            if(i===0) node = bst.node(input[i])
            else bst.insertNode(node, input[i])
        }
        return node
    },

    insertNode: (node, key) => {
        if (key<node.data) {
            if (node.left) bst.insertNode(node.left, key)
            else node.left = bst.node(key, node)
        }
        else if (key>node.data) {
            if (node.right) bst.insertNode(node.right, key)
            else node.right = bst.node(key, node)
        }
    }
}

export default bst