export function DSContextMenu({specs, unmount, children}) {
    return (
        <BeyondTooltip specs={specs} unmount={unmount} className="ds-context-menu item-actions">
            {children}
        </BeyondTooltip>
    )

}
