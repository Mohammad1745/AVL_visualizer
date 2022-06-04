import config from "./js/config"
import loadUi from "./js/ui"
import bst from "./js/bst"

document.addEventListener('DOMContentLoaded', () => {
    loadUi()
    bst.create(config.keys, config.animation)
    console.log(config.bstRoot, "result")
})