const headerBrand = 'AVL Tree Visualizer'
const visualizerButtonText = 'Visualize'

document.addEventListener('DOMContentLoaded', () => {
    let app = document.getElementById('app')
    app.innerHTML = `
        <div id="header" class="header"></div>
        <div id="subheader" class="subheader"></div>
        <div id="visualizer" class="visualizer"></div>
        <div id="footer" class="footer"></div>
    `
    loadHeaderContents()
})

function loadHeaderContents() {
    let header = document.getElementById('header')
    header.innerHTML = `
        <div id="header_brand" class="header__brand">${headerBrand}</div>
        <button id="header_visualize_btn" class="header__visualize-btn">${visualizerButtonText}</button>
        <div id="header_range_slider" class="header__range-slider"></div>
    `
    loadRangeSlider()
}

function loadRangeSlider() {
    let rangeSlider = document.getElementById('header_range_slider')
    rangeSlider.innerHTML = `
        <div id="slider_title" class="header__range-slider__title">Size & Speed</div>
        <input type="range" min="5" max="30" value="10"  id="slider_input" class="header__range-slider__input">
    `
}