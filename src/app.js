import config from "./js/script/config"
import loadUi from "./js/script/ui"
import avl from "./js/data_structure/avl"

document.addEventListener('DOMContentLoaded', () => {
    loadUi()
    config.avlRoot = avl.create(config.keys, config.animation)
    console.log(config.avlRoot, "result")
})