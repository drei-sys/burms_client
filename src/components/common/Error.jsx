const Error = ({ error }) => {
    return (
        <div className="is-flex is-justify-content-center is-align-items-center mt-6">
            <div className="has-text-centered">
                {error?.response?.data?.message || "Something went wrong!"}
            </div>
        </div>
    );
};

export default Error;
