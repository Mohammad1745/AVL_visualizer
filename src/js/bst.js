import config from "./config"

let bst = {
    node: (parent=null, data=null) => ({
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
            console.log(node)
        }
        return node
    },

    insertNode: (node, key) => {
        if (key<node.data) {
            if (node.left) bst.insertNode(node.left, key)
            else node.left = bst.node(node, key)
        }
        else if (key>node.data) {
            if (node.right) bst.insertNode(node.right, key)
            else node.right = bst.node(node, key)
        }
    }
}

export default bst