const SPECS = {
    tree: {
        properties: {
            static: true,
            bee: true,
            deployment: {
                properties: {distributions: true}
            },
            template: {
                properties: {
                    application: {
                        properties: {
                            sources: true
                        }
                    },
                    processors: {
                        properties: {
                            sources: true
                        }
                    },
                    global: {
                        properties: {
                            sources: true
                        }
                    }
                }
            },
            libraries: {
                properties: {
                    library: true,
                    application: true
                }
            },
            am: {
                properties: {
                    module: true,
                    bundles: {
                        properties: {processors: true}
                    }
                }
            }
        }
    }
}
