window.beyond.phonegap.push = new function () {
    'use strict';

    const events = new Events({'bind': this});

    let plugin, registrationId;
    Object.defineProperty(this, 'registrationId', {'get': () => registrationId});

    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const device = iOS ? 'ios' : 'android';
    Object.defineProperty(this, 'device', {'get': () => device});

    function onRegistration(data) {
        if (!data) return;
        registrationId = data.registrationId;
        events.trigger('ready', registrationId);
    }

    function onNotification(data) {

        // User tapped on notification
        // In case of iOS the notification callback is only called if you tapped
        // on the notification while not in foreground mode, and content av. is not enabled
        const additional = data.additionalData;
        if (additional && additional.navigate_url && !additional.foreground &&
            (additional.dismissed !== undefined || additional.coldstart || iOS)) {

            let url = additional.navigate_url;
            url = url.startsWith('/') ? url : `/${url}`;
            beyond.pushState(url);

        }

        events.trigger('notification', data);
        plugin.finish();

    }

    const onError = exc => console.error('Push notification error', exc.stack);

    const initialise = async function () {

        await beyond.phonegap.ready;

        if (typeof PushNotification !== 'object' ||
            !beyond.params.pushNotifications || !beyond.params.pushNotifications.senderID) return;

        const config = {
            'android': {
                'senderID': beyond.params.pushNotifications.senderID
            },
            'ios': {
                'alert': 'true',
                'badge': 'true',
                'sound': 'true'
                /*
                 "senderID": "...",
                 "gcmSandbox": "true"
                 */
            },
            'windows': {}
        };

        plugin = PushNotification.init(config);

        plugin.on('registration', onRegistration);
        plugin.on('notification', onNotification);
        plugin.on('error', onError);

    };

    initialise().catch(exc => console.error(exc.stack));

};
