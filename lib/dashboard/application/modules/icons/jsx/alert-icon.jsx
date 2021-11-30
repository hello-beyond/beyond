const AlertIcon = ({ alert, removeAlert }) => {
  return (
    <div ref={alert} className="alert-copy center">
      <div className="icon">
        <BeyondIcon icon="circleCheck" />
      </div>
      <h4 className="title">¡Copiado!</h4>
      <p className="description">El texto se ha copiado en el portapapeles</p>
      <div className="close-btn">
        <BeyondButton onClick={removeAlert}>Cerrar</BeyondButton>
      </div>
    </div>
  );
};
