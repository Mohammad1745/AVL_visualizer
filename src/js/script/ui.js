import config from "./config"
import {generateArray} from "./helper";

export default function loadUi() {
    let app = document.getElementById('app')
    app.innerHTML = `
        <div id="header" class="header"></div>
        <div id="subheader" class="subheader"></div>
        <div id="visualizer" class="visualizer"></div>
        <div id="footer" class="footer"></div>
        <div id="overlay" class="overlay"></div>
    `
    loadHeaderContents()
    loadSubheaderContents()
    loadVisualizerContents()
    loadFooterContents()
    loadOverlayContents()
}

function loadHeaderContents() {
    let header = document.getElementById('header')
    header.innerHTML = `
        <div id="header_brand" class="header__brand">${config.headerBrand}</div>
        <div id="header_range_slider" class="header__sliders"></div>
        <div id="header_buttons" class="header__buttons"></div>
    `
    loadRangeSlider()
    loadHeaderButtons()
}

function loadRangeSlider() {
    let rangeSlider = document.getElementById('header_range_slider')
    rangeSlider.innerHTML = `
        <div class="header__sliders__size">
            <div id="slider_title_size" class="header__sliders__size__title">Size</div>
            <input type="range" min="${config.sizeMin}" max="${config.sizeMax}" value="${config.sizeValue}"  id="slider_input_size" class="header__sliders__size__input">
        </div>
        <div class="header__sliders__speed">
            <div id="slider_title_speed" class="header__sliders__speed__title">Speed</div>
            <input type="range" min="${config.speedMin}" max="${config.speedMax}" value="${config.speedValue}"  id="slider_input_speed" class="header__sliders__speed__input">
        </div>
        
    `
}

function loadHeaderButtons() {
    let headerButtons = document.getElementById('header_buttons')
    headerButtons.innerHTML = `
        <button id="visualize_btn" class="header__buttons__visualize-btn">${config.visualizerButtonText}</button>
        <button id="reset_btn" class="header__buttons__reset-btn"><i class="fas fa-redo"></i></button>
    `
}

function loadSubheaderContents() {
    let subheader = document.getElementById('subheader')
    subheader.innerHTML = `        
        <div id="subheader_tree_options" class="subheader__tree-options"></div>
        <div id="subheader_keys" class="subheader__keys"></div>
    `
    loadTreeOptions()
    loadKeyList()
}

function loadTreeOptions() {
    let treeOptions = document.getElementById('subheader_tree_options')
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
function loadKeyList() {
    config.keys = generateArray(config.sliderValue, true)
    let keys = document.getElementById('subheader_keys')
    let keyList = `<div><span>Keys(${config.sliderValue}): </span>`
    for (let i=0; i<config.keys.length; i++) keyList += `<span id="key_${i}" class="subheader__keys__item">${config.keys[i]}</span>`
    keyList += `</div>`
    keys.innerHTML = keyList
}

function loadVisualizerContents() {
    let visualizer = document.getElementById('visualizer')
    visualizer.innerHTML = `        
        <div id="bst_visualizer" class="visualizer__bst"></div>
        <div id="avl_visualizer" class="visualizer__avl"></div>
    `
}

function loadFooterContents() {
    let footer = document.getElementById('footer')
    footer.innerHTML = `
        <a class="footer__git-link" href="https://github.com/Mohammad1745/AVL_visualizer" target="_blank"><i class="fab fa-github"></i> GitHub</a>
        <div class="footer__dev-info">
            <i class="fas fa-user"> Mohammad Ali</i>
            <i class="fas fa-envelope ml-2"> mdali2016.227@gmail.com</i>
        </div>
    `
}

function loadOverlayContents() {
    let overlay = document.getElementById('overlay')
    overlay.innerHTML = `        
        <div id="overlay_header" class="overlay__header"></div>
        <div id="overlay_body" class="overlay__body"></div>
    `
}