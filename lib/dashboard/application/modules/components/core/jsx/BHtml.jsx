export function BHtml({props: children, tag}) {

    return <div dangerouslySetInnerHTML={{__html: {children}}}/>
}