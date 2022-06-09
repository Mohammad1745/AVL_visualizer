let config = {
    headerBrand: 'AVL Tree Visualizer',
    visualizerButtonText: 'Visualize',
    trees: [
        {key: 'bst', title: "BST"},
        {key: 'avl', title: "AVL"},
    ],
    selectedTrees: ['avl'],
    sleepBase: 500,//ms
    sizeMin: 3,
    sizeMax: 15,
    sizeValue: 9,
    speedMin: 1,
    speedMax: 9,
    speedValue: 5,
    keys: [],
    keysPlotted: [],
    bstAnimation: [],
    avlAnimation: [],
    bstHeight: 0,
    avlHeight: 0,
    bstArray: [],
    avlArray: [],
    modes: {initial: 1, running: 2, done:3},
}
config.mode = config.modes.initial

export default config