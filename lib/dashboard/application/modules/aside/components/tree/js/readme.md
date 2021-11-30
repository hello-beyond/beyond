# treeFactory

```js
    const tree = TreeFactory.get(type, [application, items]
);
```

- type: Type of tree to create
- array: The array must be have 4 positions:
    - application: The application object
    - object : The object that represents the tree
    - items: branches of the tree
    - others: could receive more elements.
    -

# branchFactory

 ```js
  const item = branchFactory.get(type,
        item,
        this.application, specs);
 ```

- type: The branch type to create
- item: the branch object itself.
- application: The active application object.
- specs: Object where can be passed specific parameters for a type of branch

# Branch Objects

Represents each branch item in a Tree structure.

# getters to be overwritten

- **inlineActions {array}**: Defines if the tree has inline options, each inline options is a object with the next
  properties:
  - icon: Icon to show, must exist in the icons library.
  - action: Name of method that executes the action, must be defined in the tree object

- **actions {array}**: Defines if the tree has actions, the actions are showed in a popper menu and each item must have
  the next structure object:
  - icon: Icon to show, must exist in the icons library.
  - action: Name of method that executes the action, must be defined in the tree object
