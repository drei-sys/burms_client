const Drawer = ({ title, content, isLoading, isOpen, onOk, onClose }) => {
    return (
        <div className={`modal ${isOpen && "is-active"}`}>
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    position: "relative"
                }}
            >
                <div className="modal-background" style={{ zIndex: 5 }}></div>
                <div
                    className="box is-hidden-mobile"
                    style={{
                        position: "fixed",
                        top: 0,
                        right: 0,
                        width: 700,
                        zIndex: 6,
                        height: "100%",
                        overflow: "auto",
                        borderRadius: 0
                    }}
                >
                    <div className="is-flex is-justify-content-space-between">
                        <div>
                            <h1 className="is-size-5">{title}</h1>
                        </div>
                        <div>
                            <button
                                className="button is-light is-small"
                                title="close"
                                onClick={onClose}
                            >
                                <span className="icon">
                                    <i className="fa-solid fa-circle-xmark"></i>
                                </span>
                            </button>
                        </div>
                    </div>

                    <hr />

                    {content}
                </div>

                <div
                    className="box is-hidden-tablet"
                    style={{
                        position: "fixed",
                        top: 0,
                        right: 0,
                        width: "100%",
                        zIndex: 6,
                        height: "100%",
                        overflow: "auto",
                        borderRadius: 0
                    }}
                >
                    <div className="is-flex is-justify-content-space-between">
                        <div>
                            <h1 className="is-size-5">{title}</h1>
                        </div>
                        <div>
                            <button
                                className="button is-light is-small"
                                title="close"
                                onClick={onClose}
                            >
                                <span className="icon">
                                    <i className="fa-solid fa-circle-xmark"></i>
                                </span>
                            </button>
                        </div>
                    </div>

                    <hr />

                    {content}
                </div>
            </div>
        </div>
    );
};

export default Drawer;
