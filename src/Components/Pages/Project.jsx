import {useParams} from "react-router-dom";
import styles from "./Project.module.css";
import {useEffect, useState} from "react";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import { ToastContainer, toast } from "react-toastify";

const Project = () => {
	const {id} = useParams();

	const [project, setProject] = useState([]);
	const [showProjectForm, setShowProjectForm] =
		useState(false);

	useEffect(() => {
		fetch(`http://localhost:5000/projects/${id}`, {
			method: "GET",
			headers: {
				"Contet-Type": "application/json",
			},
		})
			.then((resp) => resp.json())
			.then((data) => {
				setProject(data);
			})
			.catch((err) => console.log(err));
	}, [id]);

	function togleProjectForm() {
		setShowProjectForm(!showProjectForm);
	}
  
  function editPost(project) {
    console.log(project);
    if(project.budget < project.cost){
      console.log('alo alo teresinha');
      toast.warning('O Valor do budget nao pode ser menor que o custo do projeto')
      return
    }
		fetch(`http://localhost:5000/projects/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(project),
    })
    .then(response => response.json())
    .then((data) => {
      setProject(data)
      setShowProjectForm(false)
      toast.success('Projeto alterado com sucesso!')
    })
    .catch((err) => console.log(err))
  }

	return (
		<>
			{project.name ? (
				<div className={styles.project_details}>
					<Container customClass="column">
						<div className={styles.details_container}>
							<h1>Projeto: {project.name}</h1>
							<button
								className={styles.btn}
								onClick={togleProjectForm}>
								{!showProjectForm ? "Editar " : "Fechar "}
								projeto
							</button>
							{!showProjectForm ? (
								<div className={styles.project_info}>
									<p>
										<span>Categoria: </span>{" "}
										{project.category.name}
									</p>
									<p>
										<span>Orçamento: </span> R${" "}
										{project.budget}
									</p>
									<p>
										<span>Total Utilizado: </span> R${" "}
										{project.cost}
									</p>
								</div>
							) : (
								<div className={styles.project_info}>
									<ProjectForm
										handleSubmit={editPost}
										btnText={"Concluir edição"}
										projectData={project}
									/>
								</div>
							)}
						</div>
					</Container>
				</div>
			) : (
				<Loading />
			)}
      <ToastContainer />
		</>
	);
};
export default Project;
