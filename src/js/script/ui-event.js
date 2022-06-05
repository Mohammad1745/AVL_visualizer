import config from "./config"
import {generateArray} from "./helper"

export default function handleUiEvents() {
    handleSizeSlider()
    handleTreeCheckbox()
    handleVisualizeButton()
    handleResetButton()
}
function handleSizeSlider () {
    let sizeSlider = document.getElementById('slider_input')
    sizeSlider.addEventListener('input', event => {
        if (config.mode===config.modes.initial||config.mode===config.modes.done){
            config.sliderValue = sizeSlider.value
            config.keys = generateArray(config.sliderValue, true)
            updateKeyList()
        }
    })
}
function updateKeyList() {
    let keys = document.getElementById('subheader_keys')
    let keyList = `<div><span>Keys(${config.sliderValue}): </span>`
    for (let i=0; i<config.keys.length; i++) keyList += `<span id="key_${i}" class="subheader__keys__item inserted">${config.keys[i]}</span>`
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
    visualizeButton.addEventListener('click', () => {
        if (config.mode===config.modes.initial||config.mode===config.modes.done){
            alert('Visualize')
        }
    })
}
function handleResetButton() {
    let resetButton = document.getElementById('reset_btn')
    resetButton.addEventListener('click', () => {
        if (config.mode===config.modes.initial||config.mode===config.modes.done){
            alert('Reset')
        }
    })
}
