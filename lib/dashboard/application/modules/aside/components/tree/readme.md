# Extend a Tree

A object tree must be inherit from BaseTree class. Is required defined the next properties:

- **branchType**: default: source. The default kind of branches to create. Each tree item will be passed to
  branchFactory with this type.

Methods:

-processItem: this method allows to define the logic to create the tree validating what could be added or not.
The baseTree objects calls it after be instanced and returns error if is not defined. Each Tree class **must defined it**


# getter properties that could be overwritten

- **inlineActions {array}**: Defines if the tree has inline options, each inline options is a object with the next
  properties:
  - icon: Icon to show, must exist in the icons library.
  - action: Name of method that executes the action, must be defined in the tree object

- **actions {array}**: Defines if the tree has actions, the actions are showed in a popper menu and each item must have
  the next structure object:
  - icon: Icon to show, must exist in the icons library.
  - action: Name of method that executes the action, must be defined in the tree object

### Add Actions

Branches in the tree can have two types of actions:

- Inline Actions: Represents actions that are rendered as icons in the header block.
- Actions: Represent actions that can be acceded by context-menu

Both of them can be defined by `inlineActions` and `actions` properties in the branch object. These properties are
arrays where each position is an object with the next properties:

- icon {string | object} The icon to be rendered. If is a string it will be find as a icon in beyond-ui library. If it's
  a object then can have two properties: `icon` and `viewBox`. - name: The action name. This action represents the
  method to be executed when the action is fired.

- modal: : {boolean} if exists then the action must be registered as branch action with the same name. 
        
