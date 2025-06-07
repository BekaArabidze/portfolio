import projects from "components/json/projects.json"


const Projects = () => {




    return (
        <section className="projects" id="projects">
            <h1 className="main-title f-size-h1 intersact-el">Projects</h1>

            <div className="container">
                {projects.map((project, i) => (
                    <a href={project.link}
                        target="_target"
                        rel="noreferrer"
                        key={i}
                    >
                        <div className="project intersact-el" >
                            <div className="project-img" >
                                <div className="project_name" >
                                    <p className="f-size-h3">{project.title}</p>
                                </div>
                                <img
                                    className="img"
                                    src={`/pics/${i + 1}.png`}
                                    alt={project.title}
                                />
                            </div>

                        </div>
                    </a>
                ))}
            </div>
        </section>
    )
}


export default Projects
