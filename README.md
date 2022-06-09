# AVL Tree Visualizer

#### How AVL tree balance height itself with rotations in comparison with BST.

[Live Site](https://avlvisualizer.netlify.app/)

#### Setup
```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run build

# open dist/index.html on browser
```
The app is built with VanillaJS with the power of webpack and SCSS.
For detailed explanation on how Webpack work, check out the [documentation](https://webpack.js.org/).

#### Applied
`VanillaJS` `Webpack` `AVL Tree` `BST Tree` `Rotation` `SCSS`


#### Directory Structure
```
.
|--- public
|     |--- images
|
|--- src
|     |--- js                        
|     |     |--- data_structure
|     |     |--- script
|     |     ...
|     |   
|     |--- scss        
|
...
```

#### Data Structures
#### `Binary Search Tree - BST`
- Binary Search Tree is a node-based binary tree data structure which has the following properties:
  - The left subtree of a node contains only nodes with keys lesser than the node’s key.
  - The right subtree of a node contains only nodes with keys greater than the node’s key.
  - The left and right subtree each must also be a binary search tree.
#### `Adelson-Velskii and Landis - AVL`
- AVL tree is a self-balancing Binary Search Tree (BST) where the difference between heights of left and right subtrees cannot be more than one for all nodes.
