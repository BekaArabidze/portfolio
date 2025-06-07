import Image from "next/image";

const About = () => {
    return (
        <section className="about-section" id="about">
            <h1 className="about-me f-weight-600 f-size-h3 intersact-el">
                About me
            </h1>
            <div className="container intersact-el">
                <div className="text">
                    <p className="about-text f-size-p6 f-weight-600">
                        Hello! My name is Beka, and I build things for the web.
                        I'm a Full Stack Developer with 4+ years of experience
                        in software engineering, working with technologies like
                        JavaScript, TypeScript, React, Next.js, Node.js, and
                        MongoDB. At{" "}
                        <a
                            href="https://www.theneo.io/"
                            rel="noreferrer"
                            target="_blank"
                            style={{ textDecoration: "none" }}
                        >
                            <span style={{ color: "var(--yellow)" }}>
                                {" "}
                                Theneo{" "}
                            </span>
                        </a>
                        , I’ve contributed to developer tools by building a VS
                        Code extension and improving API documentation
                        workflows. Previously, I co-founded{" "}
                        <a
                            href="https://oxeni.dev/"
                            rel="noreferrer"
                            target="_blank"
                            style={{ textDecoration: "none" }}
                        >
                            <span style={{ color: "var(--yellow)" }}>
                                {" "}
                                Oxeni(co-founder){" "}
                            </span>
                        </a>{" "}
                        , where I led full-cycle development, optimized
                        performance, and integrated 3D experiences using
                        Three.js.
                    </p>
                    <br />
                    <p className="about-text f-size-p5 f-weight-600">
                        Here are a few technologies I have been working with
                        recently:
                    </p>

                    <ul className="skills">
                        <li className="skill">
                            <p>React</p>
                        </li>
                        <li className="skill">
                            <p>Mongo</p>
                        </li>
                        <li className="skill">
                            <p>Javacript</p>
                        </li>
                        <li className="skill">
                            <p>TypeScript</p>
                        </li>
                        <li className="skill">
                            <p>Next</p>
                        </li>
                        <li className="skill">
                            <p>Node.js</p>
                        </li>
                    </ul>
                </div>

                <div className="pic">
                    <picture>
                        <source
                            src="/pics/profile.webp"
                            type="image/webp"
                            className="profile"
                        />
                        <source
                            srcSet="/pics/new_profile.jpg"
                            type="image/jpeg"
                        />
                        <img
                            src="/pics/new_profile.webp"
                            alt="profile-pic"
                            className="profile"
                        />
                    </picture>
                </div>
            </div>
        </section>
    );
};

export default About;
