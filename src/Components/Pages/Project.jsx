import {useParams} from "react-router-dom";
import styles from "./Project.module.css";
import {useEffect, useState} from "react";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import {ToastContainer, toast} from "react-toastify";
import ServiceCard from "./service/serviceCard";
import ServiceForm from "./service/serviceForm";
import {parse, v4 as uuidv4} from "uuid";

const Project = () => {
	const {id} = useParams();

	const [project, setProject] = useState([]);
	const [showProjectForm, setShowProjectForm] = useState(false);
	const [showServiceForm, setShowServiceForm] = useState(false);
	const [services, setServices] = useState([]);

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
				setServices(data.services);
			})
			.catch((err) => console.log(err));
	}, [id]);

	function togleProjectForm() {
		setShowProjectForm(!showProjectForm);
	}

	function togleServiceForm() {
		setShowServiceForm(!showServiceForm);
	}

	function removeService(id, cost) {
		const servicesUpdated = project.services.filter((service) => service.id !== id);

		const projectUpdated = project;

		projectUpdated.services = servicesUpdated;
		projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

		fetch(`http://localhost:5000/projects/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(projectUpdated),
		})
			.then(( response)=> response.json())
			.then((data) => {
        setProject(projectUpdated)
        setServices(servicesUpdated)
        toast.success('Serviço removido com sucesso!')
      })
			.catch((err) => console.log(err));
	}

	function editPost(project) {
		if (project.budget < project.cost) {
			toast.warning("O Valor do budget nao pode ser menor que o custo do projeto");
			return;
		}
		fetch(`http://localhost:5000/projects/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(project),
		})
			.then((response) => response.json())
			.then((data) => {
				setProject(data);
				setShowProjectForm(false);
				toast.success("Projeto alterado com sucesso!");
			})
			.catch((err) => console.log(err));
	}

	function createService(project) {
		const lastService = project.services[project.services.length - 1];
		lastService.id = uuidv4();
		const lastServiceCost = lastService.cost;
		const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

		if (newCost > parseFloat(project.budget)) {
			toast.warning("Valor de serviço excede o orçamento, verifique o valor do serviço");
			project.services.pop();
			return;
		}

		project.cost = newCost;

		// atualizar projeto

		fetch(`http://localhost:5000/projects/${project.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(project),
		})
			.then((response) => response.json())
			.then((data) => {
				setProject(data);
				toast.success("Serviço adicionado com sucesso!");
				setShowServiceForm(false);
			})
			.catch((err) => console.log(err));
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
										<span>Categoria: </span> {project.category.name}
									</p>
									<p>
										<span>Orçamento: </span> R$ {project.budget}
									</p>
									<p>
										<span>Total Utilizado: </span> R$ {project.cost}
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
						<div className={styles.service_form_container}>
							<h2>Adicione um serviço:</h2>
							<button
								className={styles.btn}
								onClick={togleServiceForm}>
								{!showServiceForm ? "Adicionar serviço" : "Fechar"}
							</button>
							<div className={styles.project_info}>
								{showServiceForm && (
									<ServiceForm
										handleSubmit={createService}
										btnText="Adicionar Serviço"
										projectData={project}
									/>
								)}
							</div>
						</div>
						<h2>Serviços</h2>
						<Container customClass="start">
							{services.length > 0 ? (
								services.map((service) => (
									<ServiceCard
										key={service.id}
										id={service.id}
										name={service.name}
										cost={service.cost}
										description={service.description}
										handleRemoveService={removeService}
									/>
								))
							) : (
								<p>Não há serviços cadastrados</p>
							)}
						</Container>
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
