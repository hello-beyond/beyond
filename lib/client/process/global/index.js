const lib = require('path').join(__dirname, '../../..');
Object.defineProperty(global, 'lib', {get: () => lib});

const utils = require('../../../utils');
Object.defineProperty(global, 'utils', {get: () => utils});

const bundler = (require('../bundler'));
Object.defineProperty(global, 'bundles', {get: () => bundler.bundles});
Object.defineProperty(global, 'processors', {get: () => bundler.processors});
Object.defineProperty(global, 'Bundle', {get: () => bundler.Bundle});
Object.defineProperty(global, 'Bundles', {get: () => bundler.Bundles});
Object.defineProperty(global, 'TxtBundle', {get: () => bundler.TxtBundle});
Object.defineProperty(global, 'Transversal', {get: () => bundler.Transversal});
Object.defineProperty(global, 'TransversalPackager', {get: () => bundler.TransversalPackager});
Object.defineProperty(global, 'TransversalCodePackager', {get: () => bundler.TransversalCodePackager});
Object.defineProperty(global, 'ProcessorPackager', {get: () => bundler.ProcessorPackager});
Object.defineProperty(global, 'ProcessorSources', {get: () => bundler.ProcessorSources});
Object.defineProperty(global, 'Dependencies', {get: () => bundler.Dependencies});
Object.defineProperty(global, 'Dependency', {get: () => bundler.Dependency});

const Resource = require('./resource');
Object.defineProperty(global, 'Resource', {get: () => Resource});

const PathnameParser = (require('./pathname-parser'));
Object.defineProperty(global, 'PathnameParser', {get: () => PathnameParser});

const errors = new (require(`./errors`))();
Object.defineProperty(global, 'errors', {get: () => errors});
