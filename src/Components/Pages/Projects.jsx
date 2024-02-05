import {useLocation} from "react-router-dom";
import styles from "./Projects.module.css";

import Message from "../layout/Message";
import Container from "./../layout/Container";
import LinkButton from "./../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";

import {useState, useEffect} from "react";
import Loading from "../layout/Loading";
import { toast, ToastContainer, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] =useState(false)


  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  const notify = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
      transition: Slide
      });
  }

  useEffect(() => {
   setTimeout(() => {
       fetch("http://localhost:5000/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(resp => resp.json())
      .then(data => {
        setProjects(data);
        setRemoveLoading(true)
      })
      .catch(err => console.log(err));
   }, 500);
  }, []);

  const handleRemove = (id) => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
    .then(data => {
      setProjects(projects.filter(project => project.id !== id))
      notify('Projeto Deletado!')
    })
    .catch(err => console.log(err))
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton
          to="/newprojects"
          text="Criar Projetos"
        />
      </div>
      {message && (
        <Message
          type="success"
          msg={message}
        />
      )}
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map(project => (
            <ProjectCard
              name={project.name}
              id={project.id}
              budget={project.budget}
              category={project.category.name}
              key={project.id}
              handleRemove={handleRemove}
            />
          ))}
          {!removeLoading && <Loading />}
          {removeLoading && projects.length === 0 &&(
            <p>Não há projetos cadastrados!</p>
          ) }
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Projects;
