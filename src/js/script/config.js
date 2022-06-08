let config = {
    headerBrand: 'AVL Tree Visualizer',
    visualizerButtonText: 'Visualize',
    trees: [
        {key: 'bst', title: "BST"},
        {key: 'avl', title: "AVL"},
    ],
    selectedTrees: ['bst', 'avl'],
    sleepBase: 500,//ms
    sliderMin: 3,
    sliderMax: 15,
    sliderValue: 5,
    keys: [],
    keysPlotted: [],
    bstAnimation: [],
    avlAnimation: [],
    bstHeight: 0,
    avlHeight: 0,
    bstRoot: {},
    avlArray: [],
    modes: {initial: 1, running: 2, done:3},
}
config.mode = config.modes.initial

export default config