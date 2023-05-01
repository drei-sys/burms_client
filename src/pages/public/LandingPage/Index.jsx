import { Link } from "react-router-dom";

import Logo from "assets/images/logo.png";
import Blockchain from "assets/images/bc.jpg";
import Transparency from "assets/images/transparency.jpg";
import RaspberryPi from "assets/images/raspberrypi.jpg";

const LandingPage = () => {
    return (
        <>
            {/* Navbar */}
            <nav
                className="navbar"
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-brand">
                    <a className="navbar-item" href="#">
                        {/* <img
                            src="https://bulma.io/images/bulma-logo.png"
                            width="112"
                            height="28"
                        /> */}
                        <img src={Logo} alt="logo" width={40} height={48} />{" "}
                        <span className="ml-2 is-size-5 has-text-weight-bold has-text-black">
                            BURMS
                        </span>
                    </a>

                    <a
                        role="button"
                        className="navbar-burger"
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarBasicExample"
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item">Home</a>

                        <a className="navbar-item">About</a>
                        <a className="navbar-item">Team</a>
                        <a className="navbar-item">Contact</a>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <Link to="/register">
                                    <a className="button is-primary">
                                        <strong>Sign up</strong>
                                    </a>
                                </Link>
                                <Link to="/login">
                                    <a className="button is-light">Log in</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main>
                {/* Hero */}
                <section className="hero is-primary">
                    <div className="hero-body">
                        <p className="title">Hero title</p>
                        <p className="subtitle">Hero subtitle</p>
                    </div>
                </section>

                {/* Content */}
                <div className="container">
                    {/* About */}
                    <section className="section">
                        <h1 className="title mb-6 has-text-centered">About</h1>
                        <div className="columns" style={{ marginBottom: 48 }}>
                            <div className="column is-6">
                                <div
                                    style={{ marginTop: 65 }}
                                    className="is-hidden-mobile"
                                ></div>
                                <h2 className="subtitle is-size-3">
                                    Blockchain
                                </h2>
                                <p className="is-size-5">
                                    Blockchain technology can be used in school
                                    records management to provide a secure and
                                    transparent way of storing, sharing and
                                    verifying academic records. Here are some
                                    potential use cases:
                                </p>
                            </div>
                            <div className="column is-6">
                                {/* <img src="https://placehold.co/600x400" /> */}
                                <img
                                    src={Blockchain}
                                    alt="Blockchain"
                                    style={{ borderRadius: 5 }}
                                />
                            </div>
                        </div>

                        <div className="columns" style={{ marginBottom: 48 }}>
                            <div className="column">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="content">
                                            <h4 className="title is-4">
                                                Secured
                                                <br />
                                                record-keeping
                                            </h4>
                                            <p>
                                                Blockchain technology can be
                                                used to create a tamper-proof
                                                record of a student's academic
                                                history, including transcripts
                                                ...
                                            </p>
                                            <div>
                                                <button className="button is-success">
                                                    Read more
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="content">
                                            <h4 className="title is-4">
                                                Decentralized
                                                <br />
                                                storage
                                            </h4>
                                            <p>
                                                With a blockchain-based system,
                                                student records can be stored in
                                                a decentralized manner, meaning
                                                that multiple copies ...
                                            </p>
                                            <div>
                                                <button className="button is-success">
                                                    Read more
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="content">
                                            <h4 className="title is-4">
                                                Faster & efficient
                                                <br />
                                                verification
                                            </h4>
                                            <p>
                                                Verifying the authenticity of
                                                academic records can be a
                                                time-consuming and laborious
                                                process, especially when...
                                            </p>
                                            <div>
                                                <button className="button is-success">
                                                    Read more
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="content">
                                            <h4 className="title is-4">
                                                Improved
                                                <br />
                                                privacy
                                            </h4>
                                            <p>
                                                Blockchain technology can be
                                                used to give students greater
                                                control over their own data. For
                                                example, they can choose ...
                                            </p>
                                            <div>
                                                <button className="button is-success">
                                                    Read more
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="columns" style={{ marginBottom: 48 }}>
                            <div className="column is-6">
                                {/* <img src="https://placehold.co/600x400" /> */}
                                <img
                                    src={Transparency}
                                    alt="blockchain"
                                    style={{ borderRadius: 5 }}
                                />
                            </div>
                            <div className="column is-6">
                                <div
                                    style={{ marginTop: 65 }}
                                    className="is-hidden-mobile"
                                ></div>
                                <h2 className="subtitle is-size-3">
                                    Transparency, Security, and <br />{" "}
                                    Opportunity
                                </h2>
                                <p className="is-size-5">
                                    Overall, the use of blockchain in school
                                    records management has the potential to
                                    provide a more secure, efficient and
                                    transparent way of storing and sharing
                                    academic records.
                                </p>
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column is-6">
                                <div
                                    style={{ marginTop: 65 }}
                                    className="is-hidden-mobile"
                                ></div>
                                <h2 className="subtitle is-size-3">
                                    Raspberry Pi
                                </h2>
                                <p className="is-size-5">
                                    Will serve as a local server and will be the
                                    gateway to connect to blockchain. It can
                                    also be a medium for the user to input their
                                    data and log in to their accounts.
                                </p>
                            </div>
                            <div className="column is-6">
                                {/* <img src="https://placehold.co/600x400" /> */}
                                <img
                                    src={RaspberryPi}
                                    alt="raspberyy pi"
                                    style={{ borderRadius: 5 }}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Team */}
                    <section className="section">
                        <h1 className="title mb-6 has-text-centered">
                            Our Team
                        </h1>

                        <div className="columns">
                            <div className="column">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="content has-text-centered">
                                            <div>
                                                <span className="icon">
                                                    <i
                                                        className="fa-solid fa-code fa-lg"
                                                        style={{
                                                            color: "#2196F3"
                                                        }}
                                                    ></i>
                                                </span>
                                            </div>
                                            <h4 className="title is-4">
                                                Andrei
                                                <br />
                                                Regulacion
                                            </h4>
                                            <div>
                                                <figure className="image is-128x128 mb-4">
                                                    <img
                                                        className="is-rounded"
                                                        src="https://bulma.io/images/placeholders/128x128.png"
                                                    />
                                                </figure>
                                            </div>
                                            <h4 className="subtitle is-5 ">
                                                Developer
                                            </h4>
                                            <div>
                                                <span className="icon mr-2">
                                                    <i className="fa-brands fa-facebook"></i>
                                                </span>
                                                <span className="icon mr-2">
                                                    <i className="fa-brands fa-instagram"></i>
                                                </span>
                                                <span className="icon mr-2">
                                                    <i className="fa-solid fa-envelope"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="content has-text-centered">
                                            <div>
                                                <span className="icon">
                                                    <i
                                                        className="fa-solid fa-lightbulb fa-lg"
                                                        style={{
                                                            color: "#FFC107"
                                                        }}
                                                    ></i>
                                                </span>
                                            </div>
                                            <h4 className="title is-4">
                                                Andrei
                                                <br />
                                                Labanda
                                            </h4>
                                            <div>
                                                <figure className="image is-128x128 mb-4">
                                                    <img
                                                        className="is-rounded"
                                                        src="https://bulma.io/images/placeholders/128x128.png"
                                                    />
                                                </figure>
                                            </div>
                                            <h4 className="subtitle is-5 ">
                                                Project Manager
                                            </h4>
                                            <div>
                                                <span className="icon mr-2">
                                                    <i className="fa-brands fa-facebook"></i>
                                                </span>
                                                <span className="icon mr-2">
                                                    <i className="fa-brands fa-instagram"></i>
                                                </span>
                                                <span className="icon mr-2">
                                                    <i className="fa-solid fa-envelope"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="content has-text-centered">
                                            <div>
                                                <span className="icon">
                                                    <i
                                                        className="fa-solid fa-pen-to-square fa-lg"
                                                        style={{
                                                            color: "#673AB7"
                                                        }}
                                                    ></i>
                                                </span>
                                            </div>
                                            <h4 className="title is-4">
                                                Carmela
                                                <br />
                                                Ramos
                                            </h4>
                                            <div>
                                                <figure className="image is-128x128 mb-4">
                                                    <img
                                                        className="is-rounded"
                                                        src="https://bulma.io/images/placeholders/128x128.png"
                                                    />
                                                </figure>
                                            </div>
                                            <h4 className="subtitle is-5 ">
                                                Technical Member
                                            </h4>
                                            <div>
                                                <span className="icon mr-2">
                                                    <i className="fa-brands fa-facebook"></i>
                                                </span>
                                                <span className="icon mr-2">
                                                    <i className="fa-brands fa-instagram"></i>
                                                </span>
                                                <span className="icon mr-2">
                                                    <i className="fa-solid fa-envelope"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="content has-text-centered">
                                            <div>
                                                <span className="icon">
                                                    <i
                                                        className="fa-solid fa-pen-to-square fa-lg"
                                                        style={{
                                                            color: "#e91e63"
                                                        }}
                                                    ></i>
                                                </span>
                                            </div>
                                            <h4 className="title is-4">
                                                Ranzel
                                                <br />
                                                Barteran
                                            </h4>
                                            <div>
                                                <figure className="image is-128x128 mb-4">
                                                    <img
                                                        className="is-rounded"
                                                        src="https://bulma.io/images/placeholders/128x128.png"
                                                    />
                                                </figure>
                                            </div>
                                            <h4 className="subtitle is-5 ">
                                                Technical Member
                                            </h4>
                                            <div>
                                                <span className="icon mr-2">
                                                    <i className="fa-brands fa-facebook"></i>
                                                </span>
                                                <span className="icon mr-2">
                                                    <i className="fa-brands fa-instagram"></i>
                                                </span>
                                                <span className="icon mr-2">
                                                    <i className="fa-solid fa-envelope"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Contact */}
                    <section className="section">
                        <h1 className="title mb-6 has-text-centered">
                            Contact
                        </h1>
                    </section>
                </div>
            </main>

            {/* Footer */}

            <footer className="footer" style={{ backgroundColor: "#f0f0f0" }}>
                <div className="content has-text-centered">
                    <p>
                        <strong>BURMS</strong>
                    </p>
                    <p>All rights reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default LandingPage;
