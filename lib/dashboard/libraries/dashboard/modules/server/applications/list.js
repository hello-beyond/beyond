module.exports = actions => async (params, session) => {
    const calls = [], output = [];
    const requests = new Map(params);
    const action = 'applications/list';
    const monitor = `${session.monitor}-client`;

    let applications = {};
    for (const [requestId] of requests) {
        applications = {...applications, ...await global.utils.ipc.exec(monitor, action, params)};
        calls.push([requestId, Object.keys(applications)]);
    }

    applications = await actions.backends(applications, 'application');

    for (const [requestId, entries] of calls) {
        const response = [];
        for (const entry of entries) {
            if (!applications.hasOwnProperty(entry)) continue;
            response.push({tu: Date.now(), data: applications[entry]});
        }
        output.push([requestId, response.length ? response : []]);
    }

    return output;
}
