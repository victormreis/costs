import {useState} from "react";
import Input from "../../form/Input";
import SubmitButton from "../../form/SubmitButton";
import styles from "../../project/ProjectForm.module.css";
import { toast, ToastContainer } from "react-toastify";

const ServiceForm = ({handleSubmit, btnText, projectData}) => {

	const [service, setService] = useState([]);

	function submit(e) {
		e.preventDefault();
    if(checkFields(service)){
      projectData.services.push(service);
      handleSubmit(projectData);

    } else {
      toast.warning('Preencha todos os campos para cadastrar um novo serviço')
    }
	}

  function checkFields(service) {
    if(!service.name || !service.cost || !service.description){
      return false
    } 
    return true
  }

	function handleChange(e) {
		setService({...service, [e.target.name]: e.target.value});
	}

	return (
		<form
			onSubmit={submit}
			className={styles.form}>
			<Input
				type="text"
				text="Nome do serviço"
				name="name"
				placeholder="Insira o nome do serviço"
				handleOnChange={handleChange}
			/>
			<Input
				type="number"
				text="custo do serviço"
				name="cost"
				placeholder="Insira o valor total"
				handleOnChange={handleChange}
			/>
			<Input
				type="text"
				text="descricao do serviço"
				name="description"
				placeholder="Descreva o serviço"
				handleOnChange={handleChange}
			/>
			<SubmitButton text={btnText} />
      <ToastContainer/>
		</form>
	);
};

export default ServiceForm;
