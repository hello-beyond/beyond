const PreloadWelcome = ({texts, applications, setReady}) => {

    const ref = React.useRef();

    const onChange = () => {
        const container = ref.current;
        if (!texts.ready && applications.fetched) return;
        window.setTimeout(() => {
            container.classList.add('finishing');
            window.setTimeout(() => setReady(true), 800);
        }, 1500);

    };

    useBinder([applications, texts], onChange);
    React.useEffect(() => document.querySelector('body').classList.add('no-scroll'), []);

    return (

        <div ref={ref} className="preload-container">
            <BeyondImage src='/images/logo.png'/>
            <div className="animation-container">
                <div className="circle">
                    <span style={{'--i': 1}}/>
                    <span style={{'--i': 2}}/>
                    <span style={{'--i': 3}}/>
                    <span style={{'--i': 4}}/>
                    <span style={{'--i': 5}}/>
                </div>
                <div className="animate-svg__container">
                    <BeyondIcon/>
                    <div className="line line-one"/>
                    <div className="line line-one-two"/>
                    <div className="line line-two"/>
                    <div className="line line-two-two"/>
                </div>
            </div>
            <div className="overlay"/>
            <div className="overlay-2"/>
        </div>
    )
}
