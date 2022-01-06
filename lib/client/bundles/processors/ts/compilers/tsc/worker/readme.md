# Typescript compiler workflow

* index.js: Is the entry point and runs in the main thread and is responsible to create the working thread
* index.js: Sends the compilation request to the working thread

* compiler/: Is the working thread that receives the compilation request from the index.js
