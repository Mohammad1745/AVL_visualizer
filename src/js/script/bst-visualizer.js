import config from "./config";
import {sleep, getOffset, distanceBetweenPoints, slopAngleOfPoints} from "./helper"
import {getSleepTime, leftPtr, rightPtr, parentPtr, isNode} from "./helper"

let bstVisualizer = {
    run:  async (rootNode, treeHeight, maxHeight, animation) =>{
        let visualizerDom = document.getElementById('bst_visualizer')
        visualizerDom.innerHTML = `
            <div id="bst_message" class="visualizer__bst__message">BST Visualizer is under construction</div>
            <div id="bst_plot_area" class="visualizer__bst__plot-area"></div>
            `
        let messageArea = visualizerDom.querySelector('#bst_message')
        let plotArea = visualizerDom.querySelector('#bst_plot_area')
        bstVisualizer.plotNodeLocations(plotArea, maxHeight)
        let keysPlotted = []
        for (let set of animation) {
            if(set.index||set.index===0) keysPlotted.push(config.keys[set.index])
            messageArea.innerHTML = `<p class="message">BST Visualizer | Current Node: ${config.keys[set.index]}</p>`
            bstVisualizer.highLightPlottedKeys(keysPlotted)
            await sleep(getSleepTime(config.sleepBase, config.speedMin, config.speedMax, config.speedValue))
            bstVisualizer.clearCells()
            bstVisualizer.plotTrees(set.tree)
            await sleep(getSleepTime(config.sleepBase, config.speedMin, config.speedMax, config.speedValue))
            messageArea.innerHTML = `<p class="message">BST Visualizer | Plotting Done | Tree Height: ${treeHeight}</p>`
        }
    },
    plotNodeLocations: (visDom, maxHeight) => {
        let levels = ``
        let cellIndex = 0
        for (let i=0; i<=maxHeight; i++) {
            levels += `<div id="bst_row_${i}" class="row">`
            for (let j=0; j<Math.pow(2, i); j++){
                levels += `<div id="bst_cell_${cellIndex}" class="cell"></div>`
                cellIndex++
            }
            levels += `</div>`
        }
        visDom.innerHTML = levels
    },
    plotTrees: (tree, ptr=0, direction='', level=0, parentCellIndex=0) => {
        if(tree.length) {
            let nodeCellIndex = direction && direction ==='r' ? parentCellIndex * 2 + 1 : parentCellIndex * 2
            bstVisualizer.loadCell(tree, ptr, direction)

            if ( isNode(tree[leftPtr(ptr)])) bstVisualizer.plotTrees(tree, leftPtr(ptr), 'l', level+1, nodeCellIndex)
            if ( isNode(tree[rightPtr(ptr)])) bstVisualizer.plotTrees(tree, rightPtr(ptr), 'r', level+1, nodeCellIndex)
        }
    },
    clearCells: () => {
        let cells = document.getElementById('bst_visualizer').querySelectorAll('.cell')
        Object.values(cells).map(cell => cell.innerText = '')
    },
    loadCell: (tree, ptr, direction) => {
        let cell = document.getElementById('bst_cell_'+ptr)
        let balanceFactor = ''//`<span class="node__bf `+ (Math.abs(tree[ptr].bf) > 1 ? 'red' : '') +`">${tree[ptr].bf}</span>`

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
            bstVisualizer.positionNodeLink(ptr, cell, direction)
        }
    },
    highLightPlottedKeys: (keysPlotted) => {
        let keyDoms = document.querySelectorAll('.subheader__keys__item')
        Object.values(keyDoms).map(dom => dom.classList.remove('inserted'))
        keysPlotted.map(key => {
            let index = config.keys.indexOf(key)
            let keyDom = document.getElementById('key_'+index)
            keyDom.classList.add('inserted')
        })
    },
    positionNodeLink: (ptr, cell, direction) => {
        let parentNode = document.getElementById('bst_cell_'+parentPtr(ptr)).querySelector('.node')
        let nodeDom = cell.querySelector('.node')
        let angle = slopAngleOfPoints(getOffset(nodeDom), getOffset(parentNode))
        let distance = distanceBetweenPoints(getOffset(nodeDom), getOffset(parentNode))
        let nodeLink = cell.querySelector('.node-link')
        nodeLink.style.height = (distance*0.5)+'px'
        nodeLink.style.transform = direction==='l' ? 'rotate('+(angle-90)+'deg)' : 'rotate('+(angle-90)+'deg)'
        nodeLink.style.transformOrigin = direction==='l' ? 'right top' : 'left top'
    }
}

export default bstVisualizer