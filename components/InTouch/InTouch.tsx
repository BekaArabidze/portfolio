const InTouch = () => {
    return (
        <section className="intouch">
            <p
                style={{ color: "var(--yellow_2)" }}
                className="f-size-p5 intersact-el"
            >
                What is next?
            </p>
            <h1
                style={{ color: "var(--black)" }}
                className="f-size-h3 intersact-el"
            >
                Get in Touch
            </h1>
            <p
                className="intersact-el"
                style={{ color: "var(--black)", opacity: "60%" }}
            >
                Although I’m always looking for any new opportunities, my inbox
                is always open. Whether you have a question or just want to say
                hi, I’ll try my best to get back to you!
            </p>

            <button className="hello intersact-el">
                <a
                    style={{ textDecoration: "none" }}
                    target="_blank"
                    rel="noreferrer"
                    href="mailto:https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=bekaarabidzedev@gmail.com"
                >
                    <h1 className="f-size-p4">contact me</h1>
                </a>
            </button>
        </section>
    );
};

export default InTouch;
