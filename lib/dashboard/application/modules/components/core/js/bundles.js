const styles = 'style="fill:#E36152"';
const defaultIcon = {
    viewBox: '0 0 70 70',
    icon: `
          <path style="fill:#4c4c4c;"
          d="M27,30.62l0-2.2A5.9,5.9,0,0,1,30.41,23l22.85-10.5,0-2.84a3.51,3.51,0,0,0-3.47-3.46,3.45,3.45,0,0,0-1.46.33L18.77,20.12a3.5,3.5,0,0,0-2,3.2l0,2.29Z"/>
    <path style="fill:#9b9898;"
          d="M66.9,14.77a2.73,2.73,0,0,0-1.29-2.31A2.77,2.77,0,0,0,64.13,12a2.88,2.88,0,0,0-1.17.26L32,26.5a2.79,2.79,0,0,0-1.62,2.55l0,3.75,5.39,2.63,31.1-15.55Z"/>
    <path style="fill:#9b9898;"
          d="M36.94,3.79A2.79,2.79,0,0,0,33,1.29L5,14.18a2.78,2.78,0,0,0-1.62,2.55v2.78l9.8,4.79v-.75a6.59,6.59,0,0,1,3.83-6L37,8.32Z"/>
    <path style="fill:#4c4c4c;" d="M37.67,38.8,37.7,70,68.83,53.54a.73.73,0,0,0,.4-.63V23Z"/>
    <polygon class="cls-3" points="1.71 22.41 1.67 53.09 34.5 70 34.47 38.41 1.71 22.41"/>`
};
const BUNDLES_ICONS = {
    default: defaultIcon,
    ts: defaultIcon,
    layout: defaultIcon,
    widget: defaultIcon,
    backend: {
        viewBox: `0 0 60.004 60.00`,
        icon: `<g ${styles}>
\t<path d="M58.991,44.417l-7.777-1.089l-3.472-6.78c-0.342-0.668-1.438-0.668-1.779,0l-3.472,6.78l-7.777,1.089
\t\tc-0.381,0.054-0.698,0.32-0.814,0.688s-0.012,0.768,0.269,1.031l5.605,5.267l-1.322,7.427c-0.066,0.373,0.084,0.751,0.388,0.978
\t\tc0.305,0.227,0.712,0.262,1.049,0.089l6.965-3.528l6.964,3.528c0.143,0.073,0.298,0.108,0.452,0.108
\t\tc0.211,0,0.421-0.066,0.597-0.197c0.304-0.226,0.454-0.604,0.388-0.978l-1.321-7.427l5.605-5.267
\t\tc0.28-0.264,0.385-0.664,0.269-1.031S59.371,44.471,58.991,44.417z M52.167,50.315c-0.246,0.231-0.359,0.571-0.3,0.903l1.064,5.987
\t\tl-5.628-2.852c-0.285-0.145-0.619-0.145-0.904,0l-5.629,2.852l1.065-5.987c0.06-0.332-0.054-0.672-0.3-0.903l-4.479-4.207
\t\tl6.225-0.872c0.322-0.045,0.603-0.244,0.751-0.534l2.818-5.504l2.818,5.504c0.148,0.29,0.429,0.489,0.751,0.534l6.225,0.872
\t\tL52.167,50.315z"/>
    <path d="M0.838,21c-0.521,0.74-0.835,1.635-0.835,2.608v11.783c0,0.974,0.314,1.868,0.835,2.608h41.01l4.114-8.035
\t\tc0.342-0.668,1.438-0.668,1.779,0L51.856,38h7.311c0.521-0.74,0.835-1.635,0.835-2.608V23.608c0-0.974-0.314-1.868-0.835-2.608
\t\tH0.838z M10.502,34c-2.481,0-4.5-2.019-4.5-4.5s2.019-4.5,4.5-4.5s4.5,2.019,4.5,4.5S12.984,34,10.502,34z M34.002,29
\t\tc-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S34.555,29,34.002,29z M38.002,29c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1
\t\tS38.555,29,38.002,29z M42.002,29c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S42.555,29,42.002,29z M46.002,29
\t\tc-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S46.555,29,46.002,29z M50.002,29c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1
\t\tS50.555,29,50.002,29z"/>
    <path d="M55.394,0H4.611C2.07,0,0.002,2.067,0.002,4.608v11.783c0,0.974,0.314,1.868,0.835,2.608h58.329
\t\tc0.521-0.74,0.835-1.635,0.835-2.608V4.608C60.002,2.067,57.935,0,55.394,0z M10.502,15c-2.481,0-4.5-2.019-4.5-4.5
\t\tS8.021,6,10.502,6s4.5,2.019,4.5,4.5S12.984,15,10.502,15z M34.002,10c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1
\t\tS34.555,10,34.002,10z M36.002,13c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S36.555,13,36.002,13z M38.002,10
\t\tc-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S38.555,10,38.002,10z M40.002,13c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1
\t\tS40.555,13,40.002,13z M42.002,10c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S42.555,10,42.002,10z M44.002,13
\t\tc-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S44.555,13,44.002,13z M46.002,10c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1
\t\tS46.555,10,46.002,10z M48.002,13c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S48.555,13,48.002,13z M50.002,10
\t\tc-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S50.555,10,50.002,10z M52.002,13c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1
\t\tS52.555,13,52.002,13z"/>
    <path d="M27.28,43.002c0.116-0.367,0.434-0.634,0.814-0.688l12.437-1.741L40.824,40H0.838c-0.521,0.74-0.835,1.635-0.835,2.608
\t\tv11.783C0.002,56.933,2.07,59,4.611,59h30.763l1.161-6.523l-8.986-8.443C27.268,43.77,27.163,43.369,27.28,43.002z M10.502,53
\t\tc-2.481,0-4.5-2.019-4.5-4.5s2.019-4.5,4.5-4.5s4.5,2.019,4.5,4.5S12.984,53,10.502,53z"/>
</g>`
    },
    txt: {
        viewBox: '0 0 24 24',
        icon: `<g ${styles}><path d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z"></path></g>`
    },
    page: {
        viewBox: '0 0 30 30',
        icon: `<g ${styles}>
\t<path fill-rule="evenodd" clip-rule="evenodd" d="M14.999,3.173c3.851,0,7.703-0.002,11.554,0.001
\t\tc1.416,0.001,2.633,0.915,3.02,2.277c0.076,0.268,0.123,0.554,0.123,0.832c0.006,6.331,0.008,12.661,0.004,18.992
\t\tc-0.002,1.678-1.416,3.089-3.098,3.09c-7.732,0.004-15.466,0.003-23.2,0c-1.452-0.001-2.735-1.058-3.023-2.476
\t\tc-0.047-0.229-0.076-0.469-0.076-0.702C0.298,18.926,0.298,12.663,0.299,6.402C0.3,5.153,0.843,4.207,1.917,3.573
\t\tC2.362,3.31,2.852,3.174,3.374,3.174C7.25,3.173,11.124,3.173,14.999,3.173L14.999,3.173z M2.415,11.579
\t\tc-0.004,0.086-0.011,0.161-0.011,0.234c-0.001,4.431-0.001,8.862,0,13.292c0,0.748,0.425,1.164,1.182,1.164
\t\tc7.603,0,15.207,0,22.809,0c0.787,0,1.203-0.411,1.203-1.189c0-4.409,0-8.816,0-13.225c0-0.089,0-0.178,0-0.276
\t\tC19.186,11.579,10.81,11.579,2.415,11.579z M27.598,9.455c0-0.104,0-0.179,0-0.255c0-0.923,0.002-1.846,0-2.768
\t\tc-0.002-0.74-0.424-1.162-1.164-1.163c-7.617,0-15.232,0-22.85,0c-0.758,0-1.179,0.417-1.18,1.167c-0.003,0.93-0.001,1.86,0,2.791
\t\tc0,0.073,0.008,0.146,0.012,0.228C10.814,9.455,19.189,9.455,27.598,9.455z"/>
\t<path fill-rule="evenodd" clip-rule="evenodd" d="M13.039,24.165c-0.816,0.01-1.412-0.778-1.018-1.554
\t\tc0.701-1.376,1.382-2.763,2.071-4.144c0.679-1.359,1.364-2.715,2.037-4.079c0.201-0.405,0.488-0.685,0.953-0.717
\t\tc0.816-0.057,1.354,0.805,0.979,1.558c-0.998,2-1.996,4-2.998,5.999c-0.387,0.775-0.773,1.551-1.163,2.323
\t\tC13.701,23.944,13.38,24.156,13.039,24.165z"/>
\t<path fill-rule="evenodd" clip-rule="evenodd" d="M20.244,23.158c-0.436-0.014-0.762-0.219-0.941-0.609
\t\tc-0.191-0.413-0.131-0.817,0.186-1.144c0.732-0.755,1.482-1.491,2.225-2.235c0.236-0.238,0.238-0.235-0.006-0.475
\t\tc-0.721-0.7-1.445-1.399-2.158-2.107c-0.418-0.415-0.461-0.966-0.129-1.408c0.367-0.495,1.066-0.572,1.529-0.139
\t\tc0.74,0.692,1.461,1.405,2.188,2.11c0.322,0.313,0.645,0.628,0.965,0.942c0.523,0.517,0.527,1.122,0.008,1.645
\t\tc-1.014,1.014-2.029,2.025-3.039,3.041C20.84,23.009,20.582,23.165,20.244,23.158z"/>
\t<path fill-rule="evenodd" clip-rule="evenodd" d="M10.795,15.826c-0.004,0.316-0.144,0.567-0.363,0.786
\t\tc-0.707,0.704-1.406,1.415-2.121,2.11c-0.167,0.162-0.161,0.254-0.001,0.415c0.734,0.74,1.46,1.489,2.182,2.243
\t\tc0.339,0.356,0.398,0.829,0.181,1.223c-0.343,0.619-1.139,0.759-1.65,0.255c-0.742-0.73-1.462-1.487-2.19-2.232
\t\tc-0.303-0.311-0.605-0.622-0.906-0.936c-0.447-0.461-0.458-1.07-0.007-1.527c1.017-1.029,2.04-2.051,3.066-3.071
\t\tc0.349-0.345,0.78-0.419,1.196-0.233C10.552,15.023,10.797,15.411,10.795,15.826z"/>
\t<path fill-rule="evenodd" clip-rule="evenodd" d="M5.555,6.313c0.44-0.074,1.075,0.54,1.045,1.051
\t\tC6.569,7.934,6.124,8.41,5.554,8.413C4.972,8.415,4.526,7.938,4.498,7.35C4.475,6.856,5.094,6.233,5.555,6.313z"/>
\t<path fill-rule="evenodd" clip-rule="evenodd" d="M8.695,8.412c-0.58-0.002-1.052-0.479-1.041-1.071
\t\tc0.008-0.476,0.43-1.015,1.051-1.025c0.538-0.009,1.043,0.496,1.04,1.033C9.741,7.942,9.275,8.414,8.695,8.412z"/>
\t<path fill-rule="evenodd" clip-rule="evenodd" d="M12.899,7.376c-0.002,0.563-0.5,1.036-1.087,1.04
\t\tc-0.419,0.003-1.045-0.485-1.021-1.066c0.018-0.413,0.46-1.044,1.063-1.028C12.42,6.335,12.9,6.811,12.899,7.376z"/>
</g>`
    },
    code: {
        viewBox: '0  0 24 24',
        icon: `<g  ${styles}>
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path>
    </g>`
    },
    start: {
        viewBox: '0  0 30 30',
        icon: `<g  ${styles}>
\t<path fill-rule="evenodd" clip-rule="evenodd" d="M17.826,22.567c-0.891-0.892-1.768-1.769-2.645-2.646
\t\tc-2.54-2.54-5.079-5.08-7.622-7.618c-0.106-0.105-0.12-0.177-0.048-0.311c1.324-2.465,3.064-4.598,5.152-6.451
\t\tc1.258-1.116,2.606-2.104,4.112-2.866c1.813-0.918,3.729-1.523,5.727-1.881c1.716-0.308,3.441-0.429,5.18-0.377
\t\tc0.307,0.01,0.633,0.031,0.918,0.135c0.573,0.208,0.913,0.657,0.943,1.267c0.04,0.81,0.074,1.627,0.019,2.434
\t\tc-0.075,1.086-0.206,2.171-0.369,3.249c-0.193,1.278-0.559,2.517-1.002,3.733c-0.889,2.443-2.302,4.553-4.053,6.452
\t\tc-1.781,1.931-3.804,3.553-6.127,4.788C17.954,22.505,17.896,22.533,17.826,22.567z M16.136,9.594
\t\tc-0.016,2.351,1.882,4.253,4.253,4.265s4.271-1.887,4.286-4.282c0.014-2.319-1.911-4.246-4.262-4.249
\t\tC17.968,5.323,16.12,7.308,16.136,9.594z"/>
\t<path fill-rule="evenodd" clip-rule="evenodd" d="M16.134,23.369c-0.569,0.187-1.135,0.395-1.714,0.555
\t\tc-0.555,0.153-1.122,0.271-1.687,0.383c-0.531,0.103-0.986-0.071-1.366-0.451c-1.143-1.143-2.286-2.286-3.43-3.429
\t\tc-0.55-0.552-1.087-1.119-1.657-1.648c-0.525-0.49-0.709-1.054-0.56-1.755c0.22-1.038,0.492-2.056,0.883-3.042
\t\tc0.016-0.041,0.037-0.079,0.044-0.097C9.802,17.039,12.954,20.189,16.134,23.369z"/>
\t<path fill-rule="evenodd" clip-rule="evenodd" d="M7.818,8.312c-1.839,2.532-3.16,5.267-3.76,8.345
\t\tc-0.325-0.048-0.632-0.09-0.938-0.139c-0.519-0.084-1.046-0.139-1.553-0.267c-0.994-0.251-1.459-1.38-0.931-2.263
\t\tc0.403-0.673,0.855-1.318,1.288-1.973c0.533-0.808,1.075-1.608,1.597-2.423C4.019,8.818,4.74,8.49,5.634,8.445
\t\tc0.694-0.035,1.386-0.1,2.079-0.15C7.731,8.292,7.751,8.3,7.818,8.312z"/>
\t<path fill-rule="evenodd" clip-rule="evenodd" d="M21.618,22.192c-2.533,1.839-5.267,3.16-8.345,3.76
\t\tc0.046,0.326,0.088,0.632,0.138,0.938c0.084,0.52,0.138,1.043,0.266,1.552c0.252,0.996,1.38,1.461,2.263,0.931
\t\tc0.674-0.401,1.318-0.855,1.974-1.288c0.807-0.531,1.607-1.073,2.422-1.596c0.775-0.498,1.104-1.219,1.149-2.112
\t\tc0.033-0.693,0.1-1.387,0.15-2.079C21.637,22.279,21.63,22.26,21.618,22.192z"/>
\t<path fill-rule="evenodd" clip-rule="evenodd" d="M6.63,22.508c0.357,0.005,0.626,0.166,0.776,0.488
\t\tc0.158,0.338,0.112,0.669-0.147,0.938c-0.476,0.498-0.968,0.98-1.454,1.468c-1.262,1.262-2.527,2.524-3.789,3.789
\t\tc-0.206,0.206-0.419,0.391-0.734,0.384c-0.358-0.009-0.619-0.176-0.776-0.493c-0.158-0.318-0.123-0.634,0.11-0.89
\t\tc0.385-0.42,0.795-0.819,1.199-1.223c1.349-1.352,2.7-2.701,4.05-4.05C6.079,22.705,6.294,22.497,6.63,22.508z"/>
\t<path fill-rule="evenodd" clip-rule="evenodd" d="M1.253,24.443c-0.305-0.017-0.566-0.168-0.725-0.48
\t\tc-0.161-0.319-0.122-0.626,0.099-0.893c0.176-0.216,0.383-0.406,0.581-0.604c0.738-0.74,1.477-1.48,2.219-2.218
\t\tc0.35-0.347,0.767-0.399,1.129-0.158c0.447,0.299,0.51,0.919,0.118,1.323c-0.461,0.475-0.935,0.938-1.403,1.406
\t\tc-0.441,0.441-0.882,0.882-1.321,1.324C1.767,24.327,1.557,24.438,1.253,24.443z"/>
\t<path fill-rule="evenodd" clip-rule="evenodd" d="M10.051,25.888c-0.005,0.263-0.092,0.469-0.259,0.635
\t\tc-0.922,0.926-1.842,1.852-2.771,2.769c-0.375,0.37-0.867,0.361-1.217,0.013c-0.34-0.342-0.342-0.853,0.02-1.221
\t\tc0.913-0.924,1.833-1.841,2.753-2.756c0.278-0.277,0.614-0.341,0.969-0.186C9.872,25.282,10.028,25.559,10.051,25.888z"/>
\t<path fill-rule="evenodd" clip-rule="evenodd" d="M17.845,9.606c-0.004-1.424,1.133-2.572,2.551-2.574
\t\tc1.415-0.002,2.566,1.146,2.57,2.561c0.003,1.406-1.139,2.552-2.548,2.558C18.988,12.159,17.848,11.03,17.845,9.606z"/>
</g>`
    },

};