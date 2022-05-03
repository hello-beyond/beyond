# Modules

In BeyondJS, modules are the basic development unit for building application code.

## Packages

The applications and libraries (which are imports of other BeyondJS applications) are always contained in packages that
follow the npm specification (@scope/name where @scope/ is optional). The modules can be contained in packages as well,
or in applications (that are also packages) as it is specified below.

## Containers:

BeyondJS modules can be contained in:

### In an application (or library when the module is imported from another application)

The modules contained in applications are consumed by their own container application, as well as by other applications
importing it as a library.

### In its own package

The BeyondJS modules that are contained in their own package are consumed by the applications as external modules
through the following alternatives:

* They can be physically located in a folder relative to the path of the application with all its source code. This is
  the way to be developed and maintained.
* They can be specified in the package.json file as a dependency and therefore installed in the node_modules folder. In
  this case, it must be configured as an external module in the application in order to be used.
* Can be consumed as a script on any HTML page.

## Module name:

The name of the modules is used to be able to identify them when they are contained in an application, for this reason
it is a property that is not specified when the module is contained in its own package.
\
The name of the module is then used to define its identifier. For example, consider the module that implements the
access code to the customer information of an application. That module can have the name 'customers-model'. Being
contained in the application, its identifier will be:
'@scope/application_name/module_name', in our case:
\
'@scope/application_name/customers-model'.

It will then be imported as:

```javascript
// Name of the module: customers-model
// Contained in an application whose package identifier is: @scope/application_name
import customers from '@scope/application_name/customers-model';
```

This property is also optional, in which case BeyondJS will assign a name internally based on the folder where the
module resides as you can see below.

```javascript
// Where folder is the location of the module relative to the application path. 
name = `unnamed/${folder}`
```

Following the previous example, if a name had not been specified for the customers-model module, and if it has been
located in the 'models/customers' folder, then the import should be done as follows (something that should be avoided):

```javascript
import customers from '@scope/application_name/unnamed/models/customers';
```

\
Naming modules helps future maintenance of your application, as you can move modules around without affecting your code
imports.
\
Normally, you can avoid naming modules in cases like widgets. The widgets are not explicitly imported, since being web
components, they are automatically imported by the BeyondJS engine when they are added to the DOM.
\
The name of the modules can be in a path format, for example: 'models/customers' instead of 'customers-model'

```javascript
import customers from '@scope/application_name/models/customers';
```

## Module identifier:

The module identifier is the one used to import it:

```javascript
import * as mod from 'module-identifier';
```

### When the module is contained in its own package:

If the module is contained in its own package its identifier is the package id that follows the npm naming convention:
@scope/name.

### When the module is contained in an application:

```javascript
const {name, container} = module;
`${container.package.id}/${name}`
```

#### Examples of module identifiers

In the following case, the welcome module is shown as an example, which could contain a page-type "widget" bundle that
might not require to have a name, and where the module is located in the folder ./welcome relative to the application
path:

* Resource: @my-company/application_name/unnamed/welcome
* Pathname: unnamed/welcome

Below is a module that could have a "ts" bundle where the code of the model of the customers' data access resides:

* Resource: @my-company/application_name/customers-model
* Pathname: customers-model

The following case is similar to the previous one, but now the module specifies its own package, where the id of the
package is the id of the module:

* Resource: @my-company/customers-model
* Pathname: packages/@my-company/customers-model

Externals:

* Resource: react
* Pathname: packages/react

## Pathname of the module:

### When the module is contained in its own package:

```javascript
`packages/${module.package.id}`;
```

* **When the module is being consumed from NPM**: In this case its pathname is the URL that follows the unpkg
  specification:

```javascript
const {environment, bundles} = distribution;
const {mode} = bundles;
`https://unpkg.com/${package}@${version}/${mode}/${environment}`
```

### When the module is contained in an application:

In this case the module's pathname is the same as its name, and it is relative to the package identification of its
container:

```javascript
`${module.name}`
```

### When the module is contained in an imported application:

In this case the module's pathname is the same as its name, and it is relative to the package identification of its
container:

```javascript
const {container, name} = module;
`packages/${container.package.id}/${name}`
```
