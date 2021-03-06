import config from "./config"
import {generateArray} from "./helper"
import bst from "../data_structure/bst";
import bstVisualizer from "./bst-visualizer";
import avl from "../data_structure/avl";
import avlVisualizer from "./avl-visualizer";

export default function handleUiEvents() {
    handleSizeSlider()
    handleSpeedSlider()
    handleTreeCheckbox()
    handleVisualizeButton()
    handleResetButton()
}
function handleSizeSlider () {
    let sizeSlider = document.getElementById('slider_size_input')
    sizeSlider.addEventListener('input', event => {
        if (config.mode===config.modes.initial||config.mode===config.modes.done){
            config.sizeValue = sizeSlider.value
            config.keys = generateArray(config.sizeValue, true)
            updateKeyList()
        }
    })
}
function handleSpeedSlider () {
    let speedSlider = document.getElementById('slider_speed_input')
    speedSlider.addEventListener('input', event => {
        config.speedValue = speedSlider.value
    })
}
function updateKeyList() {
    let keys = document.getElementById('subheader_keys')
    let keyList = `<div><span>Keys(${config.sizeValue}): </span>`
    for (let i=0; i<config.keys.length; i++) keyList += `<span id="key_${i}" class="subheader__keys__item">${config.keys[i]}</span>`
    keyList += `</div>`
    keys.innerHTML = keyList
}
function handleTreeCheckbox() {
    let bstCheckbox = document.getElementById('checkbox_input_bst')
    let avlCheckbox = document.getElementById('checkbox_input_avl')
    bstCheckbox.addEventListener('change', () => {
        if (config.mode===config.modes.initial||config.mode===config.modes.done){
            if (config.selectedTrees.length>1) config.selectedTrees = ['avl']
            else config.selectedTrees = ['bst', 'avl']
            updateTreeOptions()
            handleTreeCheckbox()
        }
    })
    avlCheckbox.addEventListener('change', () => {
        if (config.mode===config.modes.initial||config.mode===config.modes.done){
            if (config.selectedTrees.length>1) config.selectedTrees = ['bst']
            else config.selectedTrees = ['bst', 'avl']
            updateTreeOptions()
            handleTreeCheckbox()
        }
    })
}
function updateTreeOptions() {
    let treeOptions = document.getElementById('subheader_tree_options')
    treeOptions.innerText = ``
    config.trees.map(tree => {
        let checkBoxInput = `
            <div class="subheader__checkbox">
                <input type="checkbox" id="checkbox_input_${tree.key}" name="selected_trees" `+ (config.selectedTrees.includes(tree.key) ? "checked" : '') +`  class="subheader__checkbox__input"/>
                <span class="subheader__checkbox__option-title" >${tree.title}</span>
            </div>  
        `
        treeOptions.insertAdjacentHTML('beforeend', checkBoxInput)
    })
}
function handleVisualizeButton() {
    let visualizeButton = document.getElementById('visualize_btn')
    visualizeButton.addEventListener('click', async () => {
        if (config.mode===config.modes.initial||config.mode===config.modes.done){
            config.mode = config.modes.running
            if (config.selectedTrees.includes('bst')){
                let bstOutput = bst.create(config.keys)
                config.bstArray = bstOutput.node
                config.bstAnimation = bstOutput.animation
                config.bstHeight = bstOutput.height
                await bstVisualizer.run(config.bstArray, config.bstHeight, bstOutput.maxHeight, config.bstAnimation)
            }
            if (config.selectedTrees.includes('avl')){
                let avlOutput = avl.create(config.keys)
                config.avlArray = avlOutput.node
                config.avlAnimation = avlOutput.animation
                config.avlHeight = avlOutput.height
                await avlVisualizer.run(config.avlArray, config.avlHeight, avlOutput.maxHeight, config.avlAnimation)
            }
            config.mode = config.modes.done
        }
    })
}
function handleResetButton() {
    let resetButton = document.getElementById('reset_btn')
    resetButton.addEventListener('click', () => {
        if (config.mode===config.modes.initial||config.mode===config.modes.done){
            config.keys = generateArray(config.sizeValue, true)
            updateKeyList()
            bstVisualizer.clearCells()
            avlVisualizer.clearCells()
        }
    })
}
