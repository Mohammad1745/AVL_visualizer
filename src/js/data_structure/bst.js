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
        let lastNode = {}
        let animation = []
        for (let i=0; i<input.length; i++) {
            if(i===0) {
                node = bst.node(input[i])
                animation.push({index:i, parentIndex: null, direction: null})
            }
            else lastNode = bst.insertNode(node, input, i, animation)
        }
        let height = bst.getHeight(node)
        return {node, animation, height}
    },

    insertNode: (node, input, index, animation) => {
        let lastNode = {}
        if (input[index]<node.data) {
            if (node.left) lastNode = bst.insertNode(node.left, input, index, animation)
            else {
                node.left = bst.node(input[index], node)
                lastNode = {...node.left}
                let parentIndex = input.indexOf(node.data)
                animation.push({index, parentIndex, direction: 'l'})
            }
        }
        else if (input[index]>node.data) {
            if (node.right) lastNode = bst.insertNode(node.right, input, index, animation)
            else {
                node.right = bst.node(input[index], node)
                lastNode = {...node.right}
                let parentIndex = input.indexOf(node.data)
                animation.push({index, parentIndex, direction: 'r'})
            }
        }
        return lastNode
    },

    getHeight: node => {
        if (!node) return 0
        if (!node.left && !node.right) return 0;
        else if (!node.right) {
            if (!node.left.left && !node.left.right) return 1
            else return bst.getHeight(node.left) +1
        }
        else if (!node.left) {
            if (!node.right.left && !node.right.right) return 1
            else return bst.getHeight(node.right) +1
        }
        else {
            let leftHeight = bst.getHeight(node.left)
            let rightHeight = bst.getHeight(node.right)
            return Math.max(leftHeight, rightHeight) + 1
        }
    },
}

export default bst