import Image from "next/image";

const About = () => {
    return (
        <section className="about-section" id="about">
            <h1 className="about-me f-weight-600 f-size-h3 intersact-el">
                About me
            </h1>
            <div className="container intersact-el">
                <div className="text">
                    <p className="about-text f-size-p5 f-weight-600">
                        Hello! My name is Beka and I create things for web. My
                        interest in development started right before the collage
                        and I had zero idea about it. First couple of years were
                        hard, but now, It is getting better - Thanks to
                        stackoverflow.
                    </p>
                    <br />
                    <p className="about-text f-size-p5 f-weight-600">
                        Nowadays, Me and my friend created a small development
                        studio -
                        <a
                            href="https://oxeni.dev/"
                            rel="noreferrer"
                            target="_blank"
                            style={{ textDecoration: "none" }}
                        >
                            <span style={{ color: "var(--yellow)" }}>
                                {" "}
                                Oxeni{" "}
                            </span>
                        </a>
                        - to create something on our own and to be bosses of
                        ourselves. We created several websites - more about that
                        in - &nbsp;
                        <a
                            href="#projects"
                            style={{
                                color: "var(--yellow)",
                                cursor: "pointer",
                                textDecoration: "none",
                            }}
                        >
                            projects
                        </a>
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
                            <p>Vue</p>
                        </li>
                        <li className="skill">
                            <p>Javacript</p>
                        </li>
                        <li className="skill">
                            <p>TypeScript</p>
                        </li>
                        <li className="skill">
                            <p>Redux</p>
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
