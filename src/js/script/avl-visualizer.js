import config from "./config";
import {sleep, getOffset, distanceBetweenPoints, slopAngleOfPoints} from "./helper"
import {leftPtr, rightPtr, parentPtr, snapshot} from "./helper"

let avlVisualizer = {
    run:  async (rootNode, treeHeight, maxHeight, animation) =>{
        let visualizerDom = document.getElementById('avl_visualizer')
        visualizerDom.innerHTML = `
            <div id="avl_message" class="visualizer__avl__message">AVL Visualizer is under construction</div>
            <div id="avl_plot_area" class="visualizer__avl__plot-area"></div>
            `
        let messageArea = visualizerDom.querySelector('#avl_message')
        let plotArea = visualizerDom.querySelector('#avl_plot_area')
        avlVisualizer.plotNodeLocations(plotArea, maxHeight)
        let keysPlotted = []
        for (let set of animation) {
            if(set.index||set.index===0) keysPlotted.push(config.keys[set.index])
            messageArea.innerHTML = `<p class="message">AVL Visualizer | Current Node: ${config.keys[set.index]}</p>`
            avlVisualizer.highLightPlottedKeys(keysPlotted)
            await sleep(500)
            avlVisualizer.clearCells()
            avlVisualizer.plotTrees(set.tree)
            await sleep(500)
            messageArea.innerHTML = `<p class="message">AVL Visualizer | Plotting Done | Tree Height: ${treeHeight}</p>`
        }
    },
    plotNodeLocations: (visDom, maxHeight) => {
        let levels = ``
        let cellIndex = 0
        for (let i=0; i<=maxHeight; i++) {
            levels += `<div id="avl_row_${i}" class="row">`
            for (let j=0; j<Math.pow(2, i); j++){
                levels += `<div id="avl_cell_${cellIndex}" class="cell"></div>`
                cellIndex++
            }
            levels += `</div>`
        }
        visDom.innerHTML = levels
    },
    plotTrees: (tree, ptr=0, direction='', level=0, parentCellIndex=0) => {
        if(tree.length) {
            let nodeCellIndex = direction && direction ==='r' ? parentCellIndex * 2 + 1 : parentCellIndex * 2
            avlVisualizer.loadCell(tree, ptr, direction)

            if ( avlVisualizer.isNode(tree[leftPtr(ptr)])) avlVisualizer.plotTrees(tree, leftPtr(ptr), 'l', level+1, nodeCellIndex)
            if ( avlVisualizer.isNode(tree[rightPtr(ptr)])) avlVisualizer.plotTrees(tree, rightPtr(ptr), 'r', level+1, nodeCellIndex)
        }
    },
    clearCells: () => {
        let cells = document.getElementById('avl_visualizer').querySelectorAll('.cell')
        Object.values(cells).map(cell => cell.innerText = '')
    },
    loadCell: (tree, ptr, direction) => {
        let cell = document.getElementById('avl_cell_'+ptr)
        let balanceFactor = `<span class="node__bf `+ (Math.abs(tree[ptr].bf) > 1 ? 'red' : '') +`">${tree[ptr].bf}</span>`

        if (ptr===0) cell.innerHTML =`<div id="node" class="node">${tree[ptr].data}`+balanceFactor+`</div>`
        else if (direction && direction ==='l')
            cell.innerHTML =`
                    <div id="node" class="node">${tree[ptr].data}`+balanceFactor+`</div>
                    <div id="node_link" class="node-link"></div>
                `
        else
            cell.innerHTML = `
                    <div id="node_link" class="node-link"></div>
                    <div id="node" class="node">${tree[ptr].data}`+balanceFactor+`</div>
                `
        if (ptr>0) {
            let parentNode = document.getElementById('avl_cell_'+parentPtr(ptr)).querySelector('.node')
            let nodeDom = cell.querySelector('.node')
            let angle = slopAngleOfPoints(getOffset(nodeDom), getOffset(parentNode))
            let distance = distanceBetweenPoints(getOffset(nodeDom), getOffset(parentNode))
            let nodeLink = cell.querySelector('.node-link')
            nodeLink.style.height = (distance*0.5)+'px'
            nodeLink.style.transform = direction==='l' ? 'rotate('+(angle-90)+'deg)' : 'rotate('+(angle-90)+'deg)'
            nodeLink.style.transformOrigin = direction==='l' ? 'right top' : 'left top'
        }
    },
    highLightPlottedKeys: (keysPlotted) => {
        keysPlotted.map(key => {
            let index = config.keys.indexOf(key)
            let keyDom = document.getElementById('key_'+index)
            keyDom.classList.add('inserted')
        })
    },
    isNode: node => node && Object.keys(node).length > 0
}

export default avlVisualizer