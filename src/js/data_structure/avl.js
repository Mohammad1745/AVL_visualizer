import {leftPtr, rightPtr, parentPtr, snapshot, isNode} from "../script/helper";

let avl = {
    node: (data) => ({
        data,
        bf: 0
    }),
    create: (input) => {
        let avlArr = []
        let lastPtr = 0
        let animation = []
        let maxHeight = 0
        for (let i=0; i<input.length; i++) {
            if(i===0) {
                avlArr[i] = avl.node(input[i])
                animation.push({tree: snapshot(avlArr), index: i})
            }
            else {
                lastPtr = avl.insertNode(input[i], avlArr)
                let balanced = avl.getBalanceFactor(avlArr)
                animation.push({tree: snapshot(avlArr), index: i})

                while (!balanced) {
                    avl.balanceTree(avlArr, lastPtr)
                    balanced = avl.getBalanceFactor(avlArr)
                    animation.push({tree: snapshot(avlArr)})
                }
            }
            maxHeight = Math.max(maxHeight, avl.getHeight(snapshot(avlArr)))
        }
        maxHeight = Math.max(5, maxHeight)
        let height = avl.getHeight(avlArr)
        return {avlArr, animation, height, maxHeight}
    },

    insertNode: (key, avlArr, ptr=0) => {
        let lastPtr = {}
        if (key<avlArr[ptr].data) {
            if (avlArr[leftPtr(ptr)]) {
                lastPtr = avl.insertNode(key, avlArr, leftPtr(ptr))
            }
            else {
                avlArr[leftPtr(ptr)] = avl.node(key)
                lastPtr = leftPtr(ptr)
            }
        }
        else if (key>avlArr[ptr].data) {
            if (avlArr[rightPtr(ptr)]) {
                lastPtr = avl.insertNode(key, avlArr, rightPtr(ptr))
            }
            else {
                avlArr[rightPtr(ptr)] = avl.node(key)
                lastPtr = rightPtr(ptr)
            }
        }
        return lastPtr
    },
    getBalanceFactor: (avlArr, ptr=0) => {
        let bf = 0
        if(avlArr[leftPtr(ptr)]) bf += (avl.getHeight(avlArr, leftPtr(ptr))+1)
        if(avlArr[rightPtr(ptr)]) bf -= (avl.getHeight(avlArr, rightPtr(ptr))+1)
        avlArr[ptr].bf = bf

        let balanced = Math.abs(bf)<2
        if(avlArr[leftPtr(ptr)]) {
            let leftBalanced = avl.getBalanceFactor(avlArr, leftPtr(ptr))
            balanced = balanced ? leftBalanced : balanced
        }
        if(avlArr[rightPtr(ptr)]) {
            let rightBalanced = avl.getBalanceFactor(avlArr, rightPtr(ptr))
            balanced = balanced ? rightBalanced : balanced
        }
        return balanced
    },
    getHeight: (avlArr, ptr=0) => {
        if (!avlArr[leftPtr(ptr)] && !avlArr[rightPtr(ptr)]) return 0;
        else if (!avlArr[rightPtr(ptr)]) return avl.getHeight(avlArr, leftPtr(ptr)) +1
        else if (!avlArr[leftPtr(ptr)]) return avl.getHeight(avlArr, rightPtr(ptr)) +1
        else {
            let leftHeight = avl.getHeight(avlArr, leftPtr(ptr))
            let rightHeight = avl.getHeight(avlArr, rightPtr(ptr))
            return Math.max(leftHeight, rightHeight) + 1
        }
    },
    balanceTree: (avlArray, ptr) => {
        let isBalanced = false
        while (parentPtr(ptr)>=0) {
            ptr = parentPtr(ptr)
            if (isBalanced) continue
            if(avlArray[ptr].bf > 1) {
                if(isNode(avlArray[leftPtr(ptr)]) && avlArray[leftPtr(ptr)].bf>0){
                    avl.rotateLL (avlArray, ptr)
                    isBalanced = true
                }
                if(isNode(avlArray[leftPtr(ptr)]) && avlArray[leftPtr(ptr)].bf<0){
                    avl.rotateLR (avlArray, ptr)
                    isBalanced = true
                }
            }
            else if(avlArray[ptr].bf < -1){
                if(isNode(avlArray[rightPtr(ptr)]) && avlArray[rightPtr(ptr)].bf<0){
                    avl.rotateRR (avlArray, ptr)
                    isBalanced = true
                }
                if(isNode(avlArray[rightPtr(ptr)]) && avlArray[rightPtr(ptr)].bf>0){
                    avl.rotateRL (avlArray, ptr)
                    isBalanced = true
                }
            }
        }
    },
    rotateLL: (avlArray, ptr) => {
        let avlSnapshot = snapshot(avlArray)
        let lPtr = leftPtr(ptr)
        let rPtr = rightPtr(ptr)
        let leftOfLeftPtr = leftPtr(leftPtr(ptr))
        let rightOfLeftPtr = rightPtr(leftPtr(ptr))
        let leftOfRightPtr = leftPtr(rightPtr(ptr))
        let rightOfRightPtr = rightPtr(rightPtr(ptr))

        avlArray[rPtr] = avlSnapshot[ptr]
        avlArray[ptr] = avlSnapshot[lPtr]
        avlArray[lPtr] = avlSnapshot[leftOfLeftPtr]
        avlArray[leftOfLeftPtr] = null
        avlArray[rightOfRightPtr] = avlSnapshot[rPtr]
        avlArray[leftOfRightPtr] = avlSnapshot[rightOfLeftPtr]
    },
    rotateRR: (avlArray, ptr) => {
        let avlSnapshot = snapshot(avlArray)
        let lPtr = leftPtr(ptr)
        let rPtr = rightPtr(ptr)
        let leftOfLeftPtr = leftPtr(leftPtr(ptr))
        let rightOfRightPtr = rightPtr(rightPtr(ptr))
        let leftOfRightPtr = leftPtr(rightPtr(ptr))
        let rightOfLeftPtr = rightPtr(leftPtr(ptr))

        avlArray[lPtr] = avlSnapshot[ptr]
        avlArray[ptr] = avlSnapshot[rPtr]
        avlArray[rPtr] = avlSnapshot[rightOfRightPtr]
        avlArray[rightOfRightPtr] = null
        avlArray[leftOfLeftPtr] = avlSnapshot[lPtr]
        avlArray[rightOfLeftPtr] = avlSnapshot[leftOfRightPtr]
    },
    rotateLR: (avlArray, ptr) => {
        let avlSnapshot = snapshot(avlArray)
        let lPtr = leftPtr(ptr)
        let rPtr = rightPtr(ptr)
        let leftOfLeftPtr = leftPtr(leftPtr(ptr))
        let rightOfRightPtr = rightPtr(rightPtr(ptr))
        let leftOfRightPtr = leftPtr(rightPtr(ptr))
        let rightOfLeftPtr = rightPtr(leftPtr(ptr))
        let leftOfRightOfLeftPtr = leftPtr(rightPtr(leftPtr(ptr)))
        let rightOfRightOfLeftPtr =  rightPtr(rightPtr(leftPtr(ptr)))

        avlArray[rPtr] = avlSnapshot[ptr]
        avlArray[ptr] = avlSnapshot[rightOfLeftPtr]
        avlArray[lPtr] = avlSnapshot[lPtr]
        avlArray[rightOfRightPtr] = avlSnapshot[rPtr]
        avlArray[rightOfLeftPtr] = avlSnapshot[leftOfRightOfLeftPtr]
        avlArray[leftOfRightPtr] = avlSnapshot[rightOfRightOfLeftPtr]
        avlArray[leftOfRightOfLeftPtr] = null
        avlArray[rightOfRightOfLeftPtr] = null
    },
    rotateRL: (avlArray, ptr) => {
        let avlSnapshot = snapshot(avlArray)
        let lPtr = leftPtr(ptr)
        let rPtr = rightPtr(ptr)
        let leftOfLeftPtr = leftPtr(leftPtr(ptr))
        let rightOfRightPtr = rightPtr(rightPtr(ptr))
        let leftOfRightPtr = leftPtr(rightPtr(ptr))
        let rightOfLeftPtr = rightPtr(leftPtr(ptr))
        let leftOfLeftOfRightPtr = leftPtr(leftPtr(rightPtr(ptr)))
        let rightOfLeftOfRightPtr =  rightPtr(leftPtr(rightPtr(ptr)))

        avlArray[lPtr] = avlSnapshot[ptr]
        avlArray[ptr] = avlSnapshot[leftOfRightPtr]
        avlArray[rPtr] = avlSnapshot[rPtr]
        avlArray[leftOfLeftPtr] = avlSnapshot[lPtr]
        avlArray[rightOfLeftPtr] = avlSnapshot[leftOfLeftOfRightPtr]
        avlArray[leftOfRightPtr] = avlSnapshot[rightOfLeftOfRightPtr]
        avlArray[leftOfLeftOfRightPtr] = null
        avlArray[rightOfLeftOfRightPtr] = null
    }
}

export default avl