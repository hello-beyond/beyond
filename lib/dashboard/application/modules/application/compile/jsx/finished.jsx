export function Finished() {
    const {setFinished} = useCompilerContext();
    return (
        <div className="pd-base">
            <BeyondAlert>
                <h3>La compilación se ha realizado exitosamente.</h3>
                <strong>Directorio donde se encuentra</strong>
                <span className="pathname">C://users/julio</span>
            </BeyondAlert>
            <span className="action__end" onClick={() => setFinished(false)}>
                Crear una nueva compilación
            </span>
        </div>

    );
}
