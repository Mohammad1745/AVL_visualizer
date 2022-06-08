import {leftPtr, rightPtr, parentPtr, snapshot, isNode} from "../script/helper";

let bst = {
    node: (data) => ({
        data,
        bf: 0
    }),
    create: (input) => {
        let bstArr = []
        let animation = []
        for (let i=0; i<input.length; i++) {
            if(i===0) {
                bstArr[i] = bst.node(input[i])
                animation.push({tree: snapshot(bstArr), index: i})
            }
            else {
                bst.insertNode(input[i], bstArr)
                animation.push({tree: snapshot(bstArr), index: i})
            }
        }
        let height = bst.getHeight(bstArr)
        let maxHeight = Math.max(5, height)
        return {bstArr, animation, height, maxHeight}
    },

    insertNode: (key, bstArr, ptr=0) => {
        if (key<bstArr[ptr].data) {
            if (bstArr[leftPtr(ptr)]) bst.insertNode(key, bstArr, leftPtr(ptr))
            else bstArr[leftPtr(ptr)] = bst.node(key)
        }
        else if (key>bstArr[ptr].data) {
            if (bstArr[rightPtr(ptr)]) bst.insertNode(key, bstArr, rightPtr(ptr))

            else bstArr[rightPtr(ptr)] = bst.node(key)
        }
    },
    getHeight: (bstArr, ptr=0) => {
        if (!bstArr[leftPtr(ptr)] && !bstArr[rightPtr(ptr)]) return 0;
        else if (!bstArr[rightPtr(ptr)]) return bst.getHeight(bstArr, leftPtr(ptr)) +1
        else if (!bstArr[leftPtr(ptr)]) return bst.getHeight(bstArr, rightPtr(ptr)) +1
        else {
            let leftHeight = bst.getHeight(bstArr, leftPtr(ptr))
            let rightHeight = bst.getHeight(bstArr, rightPtr(ptr))
            return Math.max(leftHeight, rightHeight) + 1
        }
    }
}

export default bst