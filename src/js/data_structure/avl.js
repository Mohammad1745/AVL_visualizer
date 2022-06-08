let avl = {
    node: (data) => ({
        data,
        bf: 0
    }),
    leftPtr: ptr => 2*ptr+1,
    rightPtr: ptr => 2*(ptr+1),
    parentPtr: ptr => Math.ceil(ptr/2)-1,
    snapshot: arr => JSON.parse(JSON.stringify(arr)),
    create: (input) => {
        let avlArr = []
        let lastPtr = 0
        let animation = []
        for (let i=0; i<input.length; i++) {
            if(i===0) {
                avlArr[i] = avl.node(input[i])
                animation.push({tree: avl.snapshot(avlArr)})
            }
            else {
                lastPtr = avl.insertNode(input[i], avlArr)
                let balanced = avl.getBalanceFactor(avlArr)
                // console.log(avl.snapshot(avlArr), lastPtr, 'before')
                animation.push({tree: avl.snapshot(avlArr)})

                while (!balanced) {
                    avl.balanceTree(avlArr, lastPtr)
                    balanced = avl.getBalanceFactor(avlArr)
                    animation.push({tree: avl.snapshot(avlArr)})
                }
                // console.log(avl.snapshot(avlArr), lastPtr, 'after')
            }
        }
        console.log(animation)
        return {avlArr, animation}
    },

    insertNode: (key, avlArr, ptr=0) => {
        let lastPtr = {}
        if (key<avlArr[ptr].data) {
            if (avlArr[avl.leftPtr(ptr)]) {
                lastPtr = avl.insertNode(key, avlArr, avl.leftPtr(ptr))
            }
            else {
                avlArr[avl.leftPtr(ptr)] = avl.node(key)
                lastPtr = avl.leftPtr(ptr)
            }
        }
        else if (key>avlArr[ptr].data) {
            if (avlArr[avl.rightPtr(ptr)]) {
                lastPtr = avl.insertNode(key, avlArr, avl.rightPtr(ptr))
            }
            else {
                avlArr[avl.rightPtr(ptr)] = avl.node(key)
                lastPtr = avl.rightPtr(ptr)
            }
        }
        return lastPtr
    },
    getBalanceFactor: (avlArr, ptr=0) => {
        let balanced = true
        let bf = 0
        if(avlArr[avl.leftPtr(ptr)]) bf += (avl.getHeight(avlArr, avl.leftPtr(ptr))+1)
        if(avlArr[avl.rightPtr(ptr)]) bf -= (avl.getHeight(avlArr, avl.rightPtr(ptr))+1)
        avlArr[ptr].bf = bf
        if(avlArr[avl.leftPtr(ptr)]) balanced = avl.getBalanceFactor(avlArr, avl.leftPtr(ptr))
        if(avlArr[avl.rightPtr(ptr)]) balanced = avl.getBalanceFactor(avlArr, avl.rightPtr(ptr))
        return balanced ? bf>=-1 && bf<=1 : balanced
    },
    getHeight: (avlArr, ptr=0) => {
        if (!avlArr[avl.leftPtr(ptr)] && !avlArr[avl.rightPtr(ptr)]) return 0;
        else if (!avlArr[avl.rightPtr(ptr)]) return avl.getHeight(avlArr, avl.leftPtr(ptr)) +1
        else if (!avlArr[avl.leftPtr(ptr)]) return avl.getHeight(avlArr, avl.rightPtr(ptr)) +1
        else {
            let leftHeight = avl.getHeight(avlArr, avl.leftPtr(ptr))
            let rightHeight = avl.getHeight(avlArr, avl.rightPtr(ptr))
            return Math.max(leftHeight, rightHeight) + 1
        }
    },
    balanceTree: (avlArray, ptr) => {
        let isBalanced = false
        while (avl.parentPtr(ptr)>=0) {
            ptr = avl.parentPtr(ptr)
            console.log('current', avlArray[ptr])
            if (isBalanced) continue
            if(avlArray[ptr].bf > 1) {
                if(avl.isNode(avlArray[avl.leftPtr(ptr)]) && avlArray[avl.leftPtr(ptr)].bf>0){
                    avl.rotateLL (avlArray, ptr)
                    isBalanced = true
                }
                if(avl.isNode(avlArray[avl.leftPtr(ptr)]) && avlArray[avl.leftPtr(ptr)].bf<0){
                    avl.rotateLR (avlArray, ptr)
                    isBalanced = true
                }
            }
            else if(avlArray[ptr].bf < -1){
                if(avl.isNode(avlArray[avl.rightPtr(ptr)]) && avlArray[avl.rightPtr(ptr)].bf<0){
                    avl.rotateRR (avlArray, ptr)
                    isBalanced = true
                }
                if(avl.isNode(avlArray[avl.rightPtr(ptr)]) && avlArray[avl.rightPtr(ptr)].bf>0){
                    avl.rotateRL (avlArray, ptr)
                    isBalanced = true
                }
            }
        }
    },
    rotateLL: (avlArray, ptr) => {
        let avlSnapshot = avl.snapshot(avlArray)
        console.log('ll', avlSnapshot[ptr], ptr)
        let leftPtr = avl.leftPtr(ptr)
        let rightPtr = avl.rightPtr(ptr)
        let leftOfLeftPtr = avl.leftPtr(avl.leftPtr(ptr))
        let rightOfLeftPtr = avl.rightPtr(avl.leftPtr(ptr))
        let leftOfRightPtr = avl.leftPtr(avl.rightPtr(ptr))
        let rightOfRightPtr = avl.rightPtr(avl.rightPtr(ptr))

        avlArray[rightPtr] = avlSnapshot[ptr]
        avlArray[ptr] = avlSnapshot[leftPtr]
        avlArray[leftPtr] = avlSnapshot[leftOfLeftPtr]
        avlArray[leftOfLeftPtr] = null
        avlArray[rightOfRightPtr] = avlSnapshot[rightPtr]
        avlArray[leftOfRightPtr] = avlSnapshot[rightOfLeftPtr]
    },
    rotateRR: (avlArray, ptr) => {
        let avlSnapshot = avl.snapshot(avlArray)
        console.log('rr', avlSnapshot[ptr], ptr)
        let leftPtr = avl.leftPtr(ptr)
        let rightPtr = avl.rightPtr(ptr)
        let leftOfLeftPtr = avl.leftPtr(avl.leftPtr(ptr))
        let rightOfRightPtr = avl.rightPtr(avl.rightPtr(ptr))
        let leftOfRightPtr = avl.leftPtr(avl.rightPtr(ptr))
        let rightOfLeftPtr = avl.rightPtr(avl.leftPtr(ptr))

        avlArray[leftPtr] = avlSnapshot[ptr]
        avlArray[ptr] = avlSnapshot[rightPtr]
        avlArray[rightPtr] = avlSnapshot[rightOfRightPtr]
        avlArray[rightOfRightPtr] = null
        avlArray[leftOfLeftPtr] = avlSnapshot[leftPtr]
        avlArray[rightOfLeftPtr] = avlSnapshot[leftOfRightPtr]
    },
    rotateLR: (avlArray, ptr) => {
        let avlSnapshot = avl.snapshot(avlArray)
        console.log('lr', avlSnapshot[ptr], ptr)
        let leftPtr = avl.leftPtr(ptr)
        let rightPtr = avl.rightPtr(ptr)
        let leftOfLeftPtr = avl.leftPtr(avl.leftPtr(ptr))
        let rightOfRightPtr = avl.rightPtr(avl.rightPtr(ptr))
        let leftOfRightPtr = avl.leftPtr(avl.rightPtr(ptr))
        let rightOfLeftPtr = avl.rightPtr(avl.leftPtr(ptr))
        let leftOfRightOfLeftPtr = avl.leftPtr(avl.rightPtr(avl.leftPtr(ptr)))
        let rightOfRightOfLeftPtr =  avl.rightPtr(avl.rightPtr(avl.leftPtr(ptr)))

        avlArray[rightPtr] = avlSnapshot[ptr]
        avlArray[ptr] = avlSnapshot[rightOfLeftPtr]
        avlArray[leftPtr] = avlSnapshot[leftPtr]
        avlArray[rightOfRightPtr] = avlSnapshot[rightPtr]
        avlArray[rightOfLeftPtr] = avlSnapshot[leftOfRightOfLeftPtr]
        avlArray[leftOfRightPtr] = avlSnapshot[rightOfRightOfLeftPtr]
        avlArray[leftOfRightOfLeftPtr] = null
        avlArray[rightOfRightOfLeftPtr] = null
    },
    rotateRL: (avlArray, ptr) => {
        let avlSnapshot = avl.snapshot(avlArray)
        console.log('rl', avlSnapshot[ptr], ptr)
        let leftPtr = avl.leftPtr(ptr)
        let rightPtr = avl.rightPtr(ptr)
        let leftOfLeftPtr = avl.leftPtr(avl.leftPtr(ptr))
        let rightOfRightPtr = avl.rightPtr(avl.rightPtr(ptr))
        let leftOfRightPtr = avl.leftPtr(avl.rightPtr(ptr))
        let rightOfLeftPtr = avl.rightPtr(avl.leftPtr(ptr))
        let leftOfLeftOfRightPtr = avl.leftPtr(avl.leftPtr(avl.rightPtr(ptr)))
        let rightOfLeftOfRightPtr =  avl.rightPtr(avl.leftPtr(avl.rightPtr(ptr)))

        avlArray[leftPtr] = avlSnapshot[ptr]
        avlArray[ptr] = avlSnapshot[leftOfRightPtr]
        avlArray[rightPtr] = avlSnapshot[rightPtr]
        avlArray[leftOfLeftPtr] = avlSnapshot[leftPtr]
        avlArray[rightOfLeftPtr] = avlSnapshot[leftOfLeftOfRightPtr]
        avlArray[leftOfRightPtr] = avlSnapshot[rightOfLeftOfRightPtr]
        avlArray[leftOfLeftOfRightPtr] = null
        avlArray[rightOfLeftOfRightPtr] = null
    },
    isNode: node => node && Object.keys(node).length > 0
}

export default avl