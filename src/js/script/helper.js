export function generateArray(length = 5) {
    let array = []
    for (let i=0; i<length; i++) {
        array.push(randomNumber(1, 99))
    }
    return array
}

export function switchElement (array, index1, index2) {
    let temp = array[index1]
    array[index1] = array[index2]
    array[index2] = temp
}

export function shiftElement (array, index1, index2) {
    if (index2>index1){
        let temp = array[index2]
        for (let i = index2; i > index1; i--) {
            array[i] = array[i - 1]
        }
        array[index1] = temp
    }
    else if(index1>index2+1) {
        let temp = array[index1]
        for (let i = index1; i > index2; i--) {
            array[i] = array[i - 1]
        }
        array[index2] = temp
    }
}

Array.prototype.equals = function(arr2) {
    return (
        this.length === arr2.length &&
        this.every((value, index) => value === arr2[index])
    )
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
