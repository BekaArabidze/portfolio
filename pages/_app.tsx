import "../styles/main.scss";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Navigation from "components/Global/Navigation";
import Loading from "components/Loading/Loading";
import HeadAndMeta from "components/Global/headAndMeta/HeadAndMeta";

function MyApp({ Component, pageProps, router }) {
    gsap.registerPlugin(ScrollTrigger);

    useEffect(() => {
        const sections = document.querySelectorAll(".intersact-el") as any;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry: any) => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = "translateY(0px)";
                    } else {
                        entry.target.style.opacity = 0;
                        entry.target.style.transform = "translateY(-20px)";
                    }
                });
            },
            {
                threshold: 0.4,
            }
        );

        sections.forEach((el: any) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        gsap.to(".loading-wrapper", {
            opacity: 0,
            translateY: "-100%",
            delay: 2,
            duration: 1,
            ease: "power1.out",
        });

        if (history.scrollRestoration) {
            history.scrollRestoration = "manual";
        }

        window.addEventListener("load", () => {
            window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
            window.scrollTo(0, 0);
        });
    }, []);

    return (
        <>
            <HeadAndMeta
                title="beqa.dev"
                description="Website is made to present you information 
                about me and my experience in tech"
                favIconImagePath=""
                baseUrl="https://beqa.dev/pics/head_pic.png"
                ogTitle="beqa.dev portfolio website"
                ogDescription="Website is made to present you information 
                about me and my experience in tech"
                ogImagePath="https://beqa.dev/pics/head_pic.png"
                titleBarColor="#009879"
            />
            <Loading />
            <Navigation />
            <Component {...pageProps} key={router.pathname} />
            {/* <Footer /> */}
        </>
    );
}

export default MyApp;
