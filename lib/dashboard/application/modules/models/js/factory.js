class ProjectsFactory {
    _applications = new Map();
    get applications() {
        return this._applications;
    }

    constructor() {
    }

    get(id, moduleId, element) {
        if (this.applications.has(id)) return this.applications.get(id);
        const application = new ApplicationModel(id, moduleId, element);
        this.applications.set(id, application)
        return application;
    }
}

export const projectsFactory = new ProjectsFactory();
