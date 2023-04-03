const ConfirmModal = ({
    title,
    description,
    isLoading,
    isOpen,
    onOk,
    onClose
}) => {
    return (
        <div className={`modal ${isOpen && "is-active"}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{title}</p>
                    {/* <button className="delete" aria-label="close"></button> */}
                </header>
                <section className="modal-card-body">
                    <p>{description}</p>
                </section>
                <footer className="modal-card-foot">
                    <button
                        className={`button `}
                        disabled={isLoading}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className={`button is-info ${
                            isLoading ? "is-loading" : ""
                        }`}
                        onClick={onOk}
                    >
                        Yes
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default ConfirmModal;
