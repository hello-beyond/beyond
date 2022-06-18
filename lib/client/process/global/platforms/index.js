const platforms = {
    ssr: ['ssr'],
    web: ['web'],
    mobile: ['android', 'ios'],
    nodeExceptSSR: ['backend', 'node']
};
platforms.node = [].concat(platforms.ssr).concat(platforms.nodeExceptSSR);
platforms.all = [].concat(platforms.ssr).concat(platforms.web).concat(platforms.mobile).concat(platforms.node);
platforms.webAndMobile = [].concat(platforms.web).concat(platforms.mobile);
platforms.webAndMobileAndSSR = [].concat(platforms.webAndMobile).concat(platforms.ssr);

module.exports = platforms;
