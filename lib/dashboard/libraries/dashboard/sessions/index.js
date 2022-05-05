module.exports = function () {
    this.connect = function (session) {
        let monitor = session.socket.handshake.query.monitor;
        monitor = ['main', 'dashboard'].includes(monitor) ? monitor : 'main';
        Object.defineProperty(session, 'monitor', {'get': () => monitor});
    }
}
