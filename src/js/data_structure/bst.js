let bst = {
    node: (data, parent=null) => ({
        parent,
        left: null,
        right: null,
        data,
        bf: 0
    }),
    create: (input) => {
        let node = {}
        let animation = []
        for (let i=0; i<input.length; i++) {
            if(i===0) {
                node = bst.node(input[i])
                animation.push({index:i, parentIndex: null, direction: null})
            }
            else bst.insertNode(node, input, i, animation)
        }
        return {node, animation}
    },

    insertNode: (node, input, index, animation) => {
        if (input[index]<node.data) {
            if (node.left) bst.insertNode(node.left, input, index, animation)
            else {
                node.left = bst.node(input[index], node)
                let parentIndex = input.indexOf(node.data)
                animation.push({index, parentIndex, direction: 'l'})
            }
        }
        else if (input[index]>node.data) {
            if (node.right) bst.insertNode(node.right, input, index, animation)
            else {
                node.right = bst.node(input[index], node)
                let parentIndex = input.indexOf(node.data)
                animation.push({index, parentIndex, direction: 'r'})
            }
        }
    }
}

export default bst