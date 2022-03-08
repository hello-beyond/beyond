const lib = require('path').join(__dirname, '../../..');
Object.defineProperty(global, 'lib', {get: () => lib});

const platforms = require('./platforms');
Object.defineProperty(global, 'platforms', {get: () => platforms});

const utils = require('../../../utils');
Object.defineProperty(global, 'utils', {get: () => utils});

const bundler = (require('../bundler'));
Object.defineProperty(global, 'bundles', {get: () => bundler.bundles});
Object.defineProperty(global, 'processors', {get: () => bundler.processors});

Object.defineProperty(global, 'Bundle', {get: () => bundler.Bundle});
Object.defineProperty(global, 'Bundles', {get: () => bundler.Bundles});
Object.defineProperty(global, 'BundlesConfig', {get: () => bundler.BundlesConfig});

Object.defineProperty(global, 'TxtBundle', {get: () => bundler.TxtBundle});

Object.defineProperty(global, 'Transversal', {get: () => bundler.Transversal});
Object.defineProperty(global, 'TransversalPackager', {get: () => bundler.TransversalPackager});
Object.defineProperty(global, 'TransversalCodePackager', {get: () => bundler.TransversalCodePackager});

Object.defineProperty(global, 'ProcessorBase', {get: () => bundler.ProcessorBase});
Object.defineProperty(global, 'ProcessorHash', {get: () => bundler.ProcessorHash});
Object.defineProperty(global, 'ProcessorSources', {get: () => bundler.ProcessorSources});
Object.defineProperty(global, 'ProcessorSourcesHash', {get: () => bundler.ProcessorSourcesHash});
Object.defineProperty(global, 'ProcessorSource', {get: () => bundler.ProcessorSource});
Object.defineProperty(global, 'ProcessorCompiledSource', {get: () => bundler.ProcessorCompiledSource});
Object.defineProperty(global, 'ProcessorAnalyzer', {get: () => bundler.ProcessorAnalyzer});
Object.defineProperty(global, 'ProcessorOptions', {get: () => bundler.ProcessorOptions});
Object.defineProperty(global, 'ProcessorPackager', {get: () => bundler.ProcessorPackager});
Object.defineProperty(global, 'ProcessorCompiler', {get: () => bundler.ProcessorCompiler});
Object.defineProperty(global, 'ProcessorSinglyCompiler', {get: () => bundler.ProcessorSinglyCompiler});
Object.defineProperty(global, 'ProcessorCode', {get: () => bundler.ProcessorCode});
Object.defineProperty(global, 'ProcessorSinglyCode', {get: () => bundler.ProcessorSinglyCode});
Object.defineProperty(global, 'ProcessorDeclaration', {get: () => bundler.ProcessorDeclaration});

Object.defineProperty(global, 'ProcessorsExtender', {get: () => bundler.ProcessorsExtender});
Object.defineProperty(global, 'ProcessorsExtenderPreprocessor', {get: () => bundler.ProcessorsExtenderPreprocessor});
Object.defineProperty(global, 'ProcessorsExtenderCompiler', {get: () => bundler.ProcessorsExtenderCompiler});
Object.defineProperty(global, 'ProcessorsExtenderSinglyCompiler', {get: () => bundler.ProcessorsExtenderSinglyCompiler});

Object.defineProperty(global, 'Dependencies', {get: () => bundler.Dependencies});
Object.defineProperty(global, 'Dependency', {get: () => bundler.Dependency});

Object.defineProperty(global, 'SourceMap', {get: () => bundler.SourceMap});

const Resource = require('./resource');
Object.defineProperty(global, 'Resource', {get: () => Resource});

const PathnameParser = (require('./pathname-parser'));
Object.defineProperty(global, 'PathnameParser', {get: () => PathnameParser});

const errors = new (require(`./errors`))();
Object.defineProperty(global, 'errors', {get: () => errors});
