import config from "./js/script/config"
import loadUi from "./js/script/ui"
import handleUiEvents from "./js/script/ui-event";
import bst from "./js/data_structure/bst"
import avl from "./js/data_structure/avl"

document.addEventListener('DOMContentLoaded', () => {
    loadUi()
    config.bstRoot = bst.create(config.keys, config.bstAnimation)
    console.log(config.bstRoot, "BST result")
    config.avlRoot = avl.create(config.keys, config.avlAnimation)
    console.log(config.avlRoot, "AVL result")
    handleUiEvents()
})