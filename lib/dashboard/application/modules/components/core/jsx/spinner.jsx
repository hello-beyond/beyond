export class DsSpinner extends React.Component {

    render() {

        const {fetching, type} = this.props;
        const finalType = type ?? 'primary';
        let cls = fetching ? 'ds-element-spinner show' : 'beyond-element-spinner';
        if (this.props.className) cls += ` ${this.props.className}`;

        return (
            <div className="ds-spinner__container">
                <BeyondSpinner className={cls} active type={finalType}/>
            </div>
        );
    }

}

export const DSSpinner = DsSpinner;
