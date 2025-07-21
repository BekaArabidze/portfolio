import dynamic from "next/dynamic";

const Noise = dynamic(() => import("../components/Noise/Noise"), {
    ssr: false,
});

import About from "components/About/About";
import Projects from "components/Projects/Projects";
import InTouch from "components/InTouch/InTouch";

const Index = () => {
    return (
        <>
            <Noise />
            <About />
            <Projects />
            <InTouch />
        </>
    );
};

export default Index;
