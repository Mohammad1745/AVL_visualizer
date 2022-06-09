export function generateArray(length = 5, unique = false) {
    let array = []
    for (let i=0; i<length; i++) {
        let n = randomNumber(1, 99)
        while (unique && array.includes(n)){
            n = randomNumber(1, 99)
        }
        array.push(n)
    }
    return [...array]
}
export function isNode (node) {
    return node && Object.keys(node).length > 0
}
export function leftPtr (ptr) {
    return 2*ptr+1
}
export function rightPtr (ptr) {
    return 2*(ptr+1)
}
export function parentPtr (ptr) {
    return Math.ceil(ptr/2)-1
}
export function snapshot (arr) {
    return JSON.parse(JSON.stringify(arr))
}
export function switchElement (array, index1, index2) {
    let temp = array[index1]
    array[index1] = array[index2]
    array[index2] = temp
}

export function getSleepTime (base, min, max, current) {
    let mid = min + (max-min)/2
    return base * (mid/current)
}

export const randomNumber = (min, max, except=null) => {
    let number = Math.round(min+Math.random()*max)
    if (except) {
        while (number===except){
            number = Math.round(min+Math.random()*max)
        }
    }
    return number;
}

export const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}
export function distanceBetweenPoints (p1, p2) {
    let dx = p2.left - p1.left
    let dy = p2.top - p1.top
    return Math.hypot(dx, dy)
}
export function slopAngleOfPoints (p1, p2) {
    let dx = p2.left - p1.left
    let dy = p2.top - p1.top
    return Math.atan2(dy, dx) * 180 / Math.PI;
}
