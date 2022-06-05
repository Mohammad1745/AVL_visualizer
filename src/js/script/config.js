let config = {
    headerBrand: 'AVL Tree Visualizer',
    visualizerButtonText: 'Visualize',
    trees: [
        {key: 'bst', title: "BST"},
        {key: 'avl', title: "AVL"},
    ],
    selectedTrees: ['bst', 'avl'],
    sliderMin: 3,
    sliderMax: 30,
    sliderValue: 10,
    keys: [],
    bstAnimation: [],
    avlAnimation: [],
    bstRoot: {},
    avlRoot: {},
    modes: {initial: 1, sorting: 2, done:3},
}
config.mode = config.modes.initial

export default config