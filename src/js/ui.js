import config from "./config"

export default function loadUi() {
    let app = document.getElementById('app')
    app.innerHTML = `
        <div id="header" class="header"></div>
        <div id="subheader" class="subheader"></div>
        <div id="visualizer" class="visualizer"></div>
        <div id="footer" class="footer"></div>
    `
    loadHeaderContents()
    loadSubheaderContents()
    loadFooterContents()
}

function loadHeaderContents() {
    let header = document.getElementById('header')
    header.innerHTML = `
        <div id="header_brand" class="header__brand">${config.headerBrand}</div>
        <div id="header_range_slider" class="header__range-slider"></div>
        <button id="header_visualize_btn" class="header__visualize-btn">${config.visualizerButtonText}</button>
    `
    loadRangeSlider()
}

function loadRangeSlider() {
    let rangeSlider = document.getElementById('header_range_slider')
    rangeSlider.innerHTML = `
        <div id="slider_title" class="header__range-slider__title">Size & Speed</div>
        <input type="range" min="${config.sliderMin}" max="${config.sliderMax}" value="${config.sliderValue}"  id="slider_input" class="header__range-slider__input">
    `
}

function loadSubheaderContents() {
    let subheader = document.getElementById('subheader')
    subheader.innerHTML = `        
        <div id="subheader_tree_options" class="subheader__tree-options"></div>
        <div id="subheader_keys" class="subheader_keys"></div>
    `
    loadTreeOptions()
}

function loadTreeOptions() {
    let subheader = document.getElementById('subheader_tree_options')
    config.trees.map(tree => {
        let checkBoxInput = `
            <div class="subheader__checkbox">
                <input type="checkbox" id="checkbox_input_${tree.key}" name="selected_trees" `+ (config.selectedTrees.includes(tree.key) ? "checked" : '') +`  class="subheader__checkbox__input"/>
                <span class="subheader__checkbox__option-title" >${tree.title}</span>
            </div>  
        `
        subheader.insertAdjacentHTML('beforeend', checkBoxInput)
    })
}

function loadFooterContents() {
    let footer = document.getElementById('footer')
    footer.innerHTML = `
            <a class="footer__git-link" href="https://github.com/Mohammad1745/sorting_algorithm_visualizer" target="_blank"><i class="fab fa-github"></i> GitHub</a>
            <div class="footer__dev-info">
                <i class="fas fa-user"> Mohammad Ali</i>
                <i class="fas fa-envelope ml-2"> mdali2016.227@gmail.com</i>
            </div>
    `
}