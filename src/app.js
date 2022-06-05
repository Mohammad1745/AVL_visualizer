import config from "./js/script/config"
import loadUi from "./js/script/ui"
import handleUiEvents from "./js/script/ui-event";
import bst from "./js/data_structure/bst"
import avl from "./js/data_structure/avl"

document.addEventListener('DOMContentLoaded', () => {
    loadUi()
    let bstOutput = bst.create(config.keys)
    config.bstRoot = bstOutput.node
    config.bstAnimation = bstOutput.animation
    console.log(config.bstRoot, "BST result")
    console.log(config.bstAnimation, "BST Animation")
    // config.avlRoot = avl.create(config.keys, config.avlAnimation)
    // console.log(config.avlRoot, "AVL result")
    handleUiEvents()
})