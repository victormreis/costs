import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.css'
import { useNavigate } from 'react-router-dom';

const NewProject = () => {

  const history = useNavigate();

  function createPost(project) {
    //  initialize cost and services
    project.cost = 0
    project.services = []

    fetch("http://localhost:5000/projects", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project),
    })
    .then((response) => response.json())
    .then((data) => {
      // redirect
      history('/projects', {state: {message: 'projeto criado com Sucesso!'}})
    })
    .catch((err) => console.log(err))
  }
 

  return ( 
  <div className={styles.newproject_container}>
    <h1>Criar Projeto</h1>
    <p>Crie seu projeto para depois adicionar serviços</p>
    <ProjectForm handleSubmit={createPost} btnText='Criar Projeto'/>
  </div>
  );
}
 
export default NewProject;