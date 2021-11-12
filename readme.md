# Welcome to `BeyondJS`

Beyond JS is a modular framework for creating general purpose applications.

> A web technologies development environment for cross platform projects, over a community-scale modular basis design.

> Easy development of integrated state-of-the-art technologies, with boosted performance.
> `BeyondJS` integrates out-of-the-box:
> `typescript`, `react`, `vue`, `svelte`, `socket.io`, `require.js`, `scss`, `less`, and more.

# Request early access

> `BeyondJS` is being launched gradually. \
> We are actually offering early access for those who are interested to try `BeyondJS`.
> If you are a tech enthusiast who wants to help us with your appreciated feedback, just contact us.

> Get in touch at [hello@beyondjs.com](mailto:hello@beyondjs.com).
> Please note that you will need an access code to use `BeyondJS` after downloading.

## One framework for universal solutions

With `BeyondJS` it is possible to create:

**From** just a npm package: like a code library or a widget.
\
**To** websites (to distribute over a JAMStack architecture with SSR server side rendering support), cordova mobile
applications, Node.js applications or backends that can intercommunicate among them with realtime support under
websockets communication.

## Development environment

`BeyondJS` comes with a dashboard that has IDE features for a frictionless getting started, and higher productivity.

## Web technologies in an all-in-one solution

It is a powerful all-in-one environment, where it is easier than ever to jump-start multipurpose, interconnected
applications.

# Install

Install `BeyondJS` and start programming with zero configuration.

> npm install -g beyond

```shell
# Once BeyondJS is installed in your computer...
# Run BeyondJS in an empty folder to start developing applications
mkdir your_application
cd your_application
beyond
```

# `BeyondJS` dashboard

Welcome to the `BeyondJS` dashboard! A tool that makes things even easier.

__screenshots dashboard__

## Create your first application

Once `BeyondJS` is running, you can create your first application:

__screenshot create app__

**`BeyondJS` applications are multi-purpose**:

* **Web application**: You can build both client code as well as backend code in a web application.
* **Node.js application**: Application that will be compiled to be executed in a Node.js environment.
* **Backend**: Node.js application that exposes backend communication interfaces that can be consumed by both web
  clients, as well as by other backends or node applications.
* **Library**: Modules that will be consumed by other applications.

# It's all about modules

Once `BeyondJS` was installed, and you have created your application, then now it is only a matter of developing
modules.

Building applications in `BeyondJS` is completely geared towards module development. In that way, applications are
divided into small programs (modules) that package typescript, sass, less, text code with multi-language support.
Modules can additionally have static files.

`BeyondJS` modules are designed not only to be easily shared among applications, but also to be customized thanks to a
template scheme that allows overwriting styles, texts and static files such as module images.

## Productivity

The `BeyondJS` dashboard supports multi-app development, module creation, overwrites customization, source code editing
with fully out-of-the-box real-time update support, all with no configuration required.

### Fast transpiled module replacement / type checking in parallel processing

`BeyondJS` is optimized with internal cache, and also performs parallel type checking processing, so you can have a
quick view of the code changes in terms of milliseconds, and type error validation running in parallel that you can see
in the dashboard for a few moments later.

## Template support, modules customization

The style sheets, texts and static files can be overwritten individually in every application without modifying the code
of the original module.

## About bundles

In `BeyondJS` each module can implement one or more **bundles**, in addition to exposing **static files**:

`BeyondJS` bundles are code packaged from various sources of code files. The native processors that are included
out-of-the-box in `BeyondJS` are: "ts", "less", "scss", "txt".

Bundles are loaded on demand when required.

A module can implement the following bundles:

* **widget**: Web components that encapsulate code (react, vue, or svelte). They are consumed simply by just adding them
  to the DOM. `BeyondJS` takes care of loading web components dynamically and on demand. Widgets can be general purpose
  web components, pages, or layouts.
* **ts**: For source code development as data access models.
* **bridge**: It is a special kind of backend code where communication interfaces are automatically created. They work
  both for client-server communication, as well as server-server communication.
* **start**: It is a bundle of mixed source code that is injected at the beginning of the application.

### Static files

In addition to the bundles that each module can specify, it can include static files that are distributed along with it.

### Syntax

The typescript code is implemented with es6 import / export syntax typing.

The exports are encapsulated for bundle internal use by default, but they can additionally be defined to be exported by
the bundle by adding a ```/*bundle*/``` comment, so they can be externally consumed.

### Example

**Application**: @company/application
\
**Module**: message

\
*File*: message.ts

```javascript
import {user} from 'user';

export /*bundle*/ const message = `Hello ${user}`;
```

*File*: user.ts

```javascript
export default `User name`;
```

**Module**: consumer

```javascript
// Another bundle importing the 'message' bundle
import {message} from '@company/application/message';

console.log(message);
```

# `BeyondJS` outstanding features:

Take a look at a summary list of the most [outstanding features](docs/features/features.md) on `BeyondJS`.
