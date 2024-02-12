import { BsTrashFill } from "react-icons/bs";
import styles from '../../project/ProjectCard.module.css'

const ServiceCard = ({id, name, cost, description, handleRemoveService}) => {
  function remove(e) {
    e.preventDefault()
    handleRemoveService(id, cost)
  }
  return ( 
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Custo Total: </span> R${cost}
      </p>
      <p>Descricao: {description}</p>
      <div className={styles.project_card_actions}>
        <button onClick={remove}>
          <BsTrashFill />
          excluir
        </button>
      </div>
    </div>
   );
}
 
export default ServiceCard;