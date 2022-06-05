import config from "./config"
import {generateArray} from "./helper"

export default function handleUiEvents() {
    handleSizeSlider()
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
