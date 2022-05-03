const {ipc} = global.utils;

module.exports = actions => async (params, session) => {
    const apps = [], output = [], requests = [];

    for (const [requestId, request] of params) {
        const id = parseInt(request.fields.id);
        apps.push(id);
        requests.push([requestId, id]);
    }

    const action = 'applications/get';
    const monitor = `${session.monitor}-client`;
    let applications = await ipc.exec(monitor, action, apps);
    applications = await actions.backends(applications, 'application');

    for (const [requestId, value] of requests) {
        const response = applications.hasOwnProperty(value) ?
            {tu: Date.now(), data: applications[value]} : undefined;
        output.push([requestId, response]);
    }
    return output;
}