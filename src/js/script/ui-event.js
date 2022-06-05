import config from "./config"
import {generateArray} from "./helper"

export default function handleUiEvents() {
    handleSizeSlider()
}
function handleSizeSlider () {
    let sizeSlider = document.getElementById('slider_input')
    sizeSlider.addEventListener('input', event => {
        config.sliderValue = sizeSlider.value
        config.keys = generateArray(config.sliderValue)
        updateKeyList()
    })
}
function updateKeyList() {
    let keys = document.getElementById('subheader_keys')
    let keyList = `<div><span>Keys(${config.sliderValue}): </span>`
    for (let i=0; i<config.keys.length; i++) keyList += `<span id="key_${i}" class="subheader__keys__item inserted">${config.keys[i]}</span>`
    keyList += `</div>`
    keys.innerHTML = keyList
}