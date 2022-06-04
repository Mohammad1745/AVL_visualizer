import config from "./js/config"
import loadUi from "./js/ui"
import avl from "./js/avl"

document.addEventListener('DOMContentLoaded', () => {
    loadUi()
    avl.create(config.keys, config.animation)
    console.log(config.avlRoot, "result")
})