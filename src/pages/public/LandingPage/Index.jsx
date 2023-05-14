import { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "assets/images/logo.png";

import Video3D from "assets/videos/3dexplode.mp4";

import Blockchain from "assets/images/blockchain.gif";
import Transparency from "assets/images/transparency.jpg";
import RaspberryPi from "assets/images/raspberrypi.jpg";

import Andrei1 from "assets/images/member/Andrei1.jpg";
import Andrei2 from "assets/images/member/Andrei2.jpg";
import Ranzel from "assets/images/member/Ranzel.jpg";
import Mela from "assets/images/member/Mela.jpg";

import ContactImg from "assets/images/email.svg";

import "./style.css";

const LandingPage = () => {
    const [feature1, setFeature1] = useState({
        shortDesc:
            "Blockchain technology can be used to create a tamper-proof record of a student's academic history, including transcripts ...",
        longDesc:
            "Blockchain technology can be used to create a tamper-proof record of a student's academic history, including transcripts, degrees, and certificates. This can prevent fraudulent activity such as falsifying grades or degrees.",
        showShortDesc: true
    });

    const [feature2, setFeature2] = useState({
        shortDesc:
            "With a blockchain-based system, student records can be stored in a decentralized manner, meaning that multiple copies ...",
        longDesc:
            "With a blockchain-based system, student records can be stored in a decentralized manner, meaning that multiple copies of the records are stored across different nodes in the network. This makes it less likely that the records will be lost or destroyed.",
        showShortDesc: true
    });

    const [feature3, setFeature3] = useState({
        shortDesc:
            "Verifying the authenticity of academic records can be a time-consuming and laborious process, especially when...",
        longDesc:
            "Verifying the authenticity of academic records can be a time-consuming and laborious process, especially when dealing with records from multiple institutions. With a blockchain-based system, however, records can be verified instantly and automatically, without the need for manual checks.",
        showShortDesc: true
    });

    const [feature4, setFeature4] = useState({
        shortDesc:
            "Blockchain technology can be used to give students greater control over their own data. For example, they can choose ...",
        longDesc:
            "Blockchain technology can be used to give students greater control over their own data. For example, they can choose to share only specific parts of their records with certain parties, rather than giving access to their entire record.",
        showShortDesc: true
    });

    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

    return (
        <>
            {/* Navbar */}
            <nav
                id="Home"
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
                        onClick={() =>
                            setIsMobileMenuVisible(!isMobileMenuVisible)
                        }
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a href="#Home" className="navbar-item">
                            Home
                        </a>
                        <a href="#About" className="navbar-item">
                            About
                        </a>
                        <a href="#Team" className="navbar-item">
                            Team
                        </a>
                        <a href="#Contact" className="navbar-item">
                            Contact
                        </a>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <Link
                                    to="/register"
                                    className="button is-primary"
                                >
                                    <strong>Sign up</strong>
                                </Link>
                                <Link to="/login" className="button is-light">
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {isMobileMenuVisible && (
                    <div
                        style={{
                            borderTop: "1px solid #dbdbdb",
                            padding: "25px 10px"
                        }}
                    >
                        <div>
                            <a href="#Home" className="navbar-item">
                                Home
                            </a>
                        </div>
                        <div>
                            <a href="#About" className="navbar-item">
                                About
                            </a>
                        </div>
                        <div>
                            <a href="#Team" className="navbar-item">
                                Team
                            </a>
                        </div>
                        <div>
                            <a href="#Contact" className="navbar-item">
                                Contact
                            </a>
                        </div>
                        <div>
                            <div className="buttons">
                                <Link
                                    to="/register"
                                    className="button is-primary"
                                >
                                    <strong>Sign up</strong>
                                </Link>
                                <Link to="/login" className="button is-light">
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            <main>
                {/* Hero */}
                <section className="is-hidden-mobile">
                    <div className="bg-image"></div>
                    <div className="hero-columns-container">
                        <div className="container">
                            <div className="columns">
                                <div className="column is-6">
                                    <div
                                        className="is-flex is-justify-content-center"
                                        style={{ marginTop: 110 }}
                                    >
                                        <div className="bg-text has-text-centered">
                                            <h1 className="title is-3 has-text-white">
                                                Blockchain-based
                                                <br />
                                                University Records Management
                                                System
                                            </h1>
                                            <h5 className="subtitle is-5 has-text-white">
                                                Pamantasan ng Lungsod ng Cabuyao
                                            </h5>
                                            <div className="has-text-centered">
                                                <img
                                                    src={Logo}
                                                    alt="logo"
                                                    width={120}
                                                    height={120}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="column is-6">
                                    <div
                                        className="is-flex is-justify-content-center"
                                        style={{ marginTop: 110 }}
                                    >
                                        <div
                                            style={{
                                                height: 364,
                                                background: "#000",
                                                width: "100%"
                                            }}
                                        >
                                            <video
                                                muted
                                                autoPlay
                                                loop
                                                //style={{ objectFit: "cover" }}
                                                controls
                                            >
                                                <source
                                                    src={Video3D}
                                                    type="video/mp4"
                                                />
                                                Your browser does not support
                                                HTML video.
                                            </video>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            height: 15,
                            background: "#fff",
                            marginTop: 5,
                            // border: "2px solid red",
                            position: "relative"
                        }}
                    ></div>
                </section>

                <section className="hero is-success is-hidden-tablet">
                    <div className="hero-body">
                        <p className="title">
                            Blockchain-based
                            <br />
                            University Records Management System
                        </p>
                        <p className="subtitle">
                            Pamantasan ng Lungsod ng Cabuyao
                        </p>
                    </div>
                </section>

                {/* Content */}
                <div className="container">
                    {/* About */}
                    <section className="section" id="About">
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
                                                {feature1.showShortDesc
                                                    ? feature1.shortDesc
                                                    : feature1.longDesc}
                                            </p>
                                            <div>
                                                <button
                                                    className="button is-success"
                                                    onClick={() =>
                                                        setFeature1({
                                                            ...feature1,
                                                            showShortDesc:
                                                                !feature1.showShortDesc
                                                        })
                                                    }
                                                >
                                                    {feature1.showShortDesc
                                                        ? "Read more"
                                                        : "Read less"}
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
                                                {feature2.showShortDesc
                                                    ? feature2.shortDesc
                                                    : feature2.longDesc}
                                            </p>
                                            <div>
                                                <button
                                                    className="button is-success"
                                                    onClick={() =>
                                                        setFeature2({
                                                            ...feature2,
                                                            showShortDesc:
                                                                !feature2.showShortDesc
                                                        })
                                                    }
                                                >
                                                    {feature2.showShortDesc
                                                        ? "Read more"
                                                        : "Read less"}
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
                                                {feature3.showShortDesc
                                                    ? feature3.shortDesc
                                                    : feature3.longDesc}
                                            </p>
                                            <div>
                                                <button
                                                    className="button is-success"
                                                    onClick={() =>
                                                        setFeature3({
                                                            ...feature3,
                                                            showShortDesc:
                                                                !feature3.showShortDesc
                                                        })
                                                    }
                                                >
                                                    {feature3.showShortDesc
                                                        ? "Read more"
                                                        : "Read less"}
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
                                                {feature4.showShortDesc
                                                    ? feature4.shortDesc
                                                    : feature4.longDesc}
                                            </p>
                                            <div>
                                                <button
                                                    className="button is-success"
                                                    onClick={() =>
                                                        setFeature4({
                                                            ...feature4,
                                                            showShortDesc:
                                                                !feature4.showShortDesc
                                                        })
                                                    }
                                                >
                                                    {feature4.showShortDesc
                                                        ? "Read more"
                                                        : "Read less"}
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
                    <section className="section" id="Team">
                        <h1 className="title mb-6 has-text-centered">
                            Our Team
                        </h1>

                        <div className="columns ">
                            <div className="column is-3">
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
                                                        src={Andrei1}
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
                            <div className="column is-3">
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
                                                        src={Andrei2}
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
                            <div className="column is-3">
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
                                                Camela
                                                <br />
                                                Ramos
                                            </h4>
                                            <div>
                                                <figure className="image is-128x128 mb-4">
                                                    <img
                                                        className="is-rounded"
                                                        //src="https://bulma.io/images/placeholders/128x128.png"
                                                        src={Mela}
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
                            <div className="column is-3">
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
                                                Barberan
                                            </h4>
                                            <div>
                                                <figure className="image is-128x128 mb-4">
                                                    <img
                                                        className="is-rounded"
                                                        src={Ranzel}
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
                    <section className="section" id="Contact">
                        <h1 className="title mb-6 has-text-centered">
                            Contact
                        </h1>
                        <div className="box p-6">
                            <div className="columns">
                                <div
                                    className="column is-6 p-5"
                                    style={{
                                        background: "#3f51b5",
                                        borderRadius: 5
                                    }}
                                >
                                    <form>
                                        <div className="field">
                                            <label className="label has-text-white">
                                                Name
                                            </label>
                                            <div className="control">
                                                <input
                                                    name="name"
                                                    className="input"
                                                    type="text"
                                                    placeholder="Enter  name"
                                                />
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label className="label has-text-white">
                                                Email
                                            </label>
                                            <div className="control">
                                                <input
                                                    name="email"
                                                    className="input"
                                                    type="email"
                                                    placeholder="Enter email"
                                                />
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label className="label has-text-white">
                                                Subject
                                            </label>
                                            <div className="control">
                                                <input
                                                    name="subject"
                                                    className="input"
                                                    type="text"
                                                    placeholder="Enter subject"
                                                />
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label className="label has-text-white">
                                                Message
                                            </label>
                                            <div className="control">
                                                <textarea
                                                    name="message"
                                                    className="textarea"
                                                    type="text"
                                                    placeholder="Enter your message"
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <button className="button">
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className="column is-6">
                                    <div
                                        style={{ textAlign: "center" }}
                                        className="mt-6"
                                    >
                                        <img
                                            src={ContactImg}
                                            alt="email banner"
                                            width={400}
                                            height={400}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="footer" style={{ backgroundColor: "#f0f0f0" }}>
                <div className="content has-text-centered mt-5">
                    <h1 className="is-size-4">BURMS</h1>

                    <p>
                        <a href="#Home" className="mr-2">
                            Home
                        </a>
                        <a href="#About" className="mr-2">
                            About
                        </a>
                        <a href="#Team" className="mr-2">
                            Team
                        </a>
                        <a href="#Contact" className="mr-2">
                            Contact
                        </a>
                    </p>
                    <p>&copy; 2023 BURMS. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default LandingPage;
