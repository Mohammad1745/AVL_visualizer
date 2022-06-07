import config from "./config";
import {sleep, getOffset, distanceBetweenPoints, slopAngleOfPoints} from "./helper"

let avlVisualizer = {
    run:  async (rootNode, treeHeight, keys, animation) =>{
        let visualizerDom = document.getElementById('avl_visualizer')
        visualizerDom.innerHTML = `
            <div id="avl_message" class="visualizer__avl__message">AVL Visualizer is under construction</div>
            <div id="avl_plot_area" class="visualizer__avl__plot-area"></div>
            `
        // let messageArea = visualizerDom.querySelector('#avl_message')
        // let plotArea = visualizerDom.querySelector('#avl_plot_area')
        // avlVisualizer.plotNodeLocations(plotArea, treeHeight)
        // let keysPlotted = []
        // for (let set of animation) {
        //     keysPlotted.push(config.keys[set.index])
        //     messageArea.innerHTML = `<p class="message">AVL Visualizer | Current Node: ${config.keys[set.index]}</p>`
        //     avlVisualizer.highLightPlottedKeys(keysPlotted)
        //     await sleep(500)
        //     avlVisualizer.plotTrees(rootNode, keysPlotted)
        //     await sleep(500)
        //     messageArea.innerHTML = `<p class="message">AVL Visualizer | Plotting Done | Tree Height: ${treeHeight}</p>`
        // }
    },
    plotNodeLocations: (visDom, treeHeight) => {
        let levels = ``
        for (let i=0; i<=treeHeight; i++) {
            levels += `<div id="avl_row_${i}" class="row">`
            for (let j=0; j<Math.pow(2, i); j++){
                levels += `<div id="avl_cell_${i}_${j}" class="cell"></div>`
            }
            levels += `</div>`
        }
        visDom.innerHTML = levels
    },
    plotTrees: (node, keysPlotted, direction='', level=0, parentCellIndex=0) => {
        if(node) {
            if (!keysPlotted.includes(node.data)) return
            let nodeCellIndex = direction && direction ==='r' ? parentCellIndex * 2 + 1 : parentCellIndex * 2
            let row = document.getElementById('avl_row_'+level)
            let cell = document.getElementById('avl_cell_'+level+'_'+nodeCellIndex)
            avlVisualizer.loadCell(cell, node, direction, level, parentCellIndex)

            if ( avlVisualizer.isNode(node.left)) avlVisualizer.plotTrees(node.left, keysPlotted, 'l', level+1, nodeCellIndex)
            if ( avlVisualizer.isNode(node.right)) avlVisualizer.plotTrees(node.right, keysPlotted, 'r', level+1, nodeCellIndex)
        }
    },
    loadCell: (cell, node, direction, level, parentCellIndex) => {
        if (level===0) cell.innerHTML =`<div id="node" class="node">${node.data}</div>`
        else if (direction && direction ==='l')
            cell.innerHTML =`
                    <div id="node" class="node">${node.data}</div>
                    <div id="node_link" class="node-link"></div>
                `
        else
            cell.innerHTML = `
                    <div id="node_link" class="node-link"></div>
                    <div id="node" class="node">${node.data}</div>
                `
        if (level>0) {
            let parentNode = document.getElementById('cell_'+(level-1)+'_'+parentCellIndex).querySelector('.node')
            let nodeDom = cell.querySelector('.node')
            let angle = slopAngleOfPoints(getOffset(nodeDom), getOffset(parentNode))
            let distance = distanceBetweenPoints(getOffset(nodeDom), getOffset(parentNode))
            let nodeLink = cell.querySelector('.node-link')
            nodeLink.style.height = (distance*0.5)+'px'
            nodeLink.style.transform = direction==='l' ? 'rotate('+(angle-90)+'deg)' : 'rotate('+(angle-90)+'deg)'
            nodeLink.style.transformOrigin = direction==='l' ? 'right top' : 'left top'
            console.log(angle, distance)
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