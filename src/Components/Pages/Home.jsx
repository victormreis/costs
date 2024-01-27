import styles from "./Home.module.css";
import savings from "../../img/savings.svg";
import LinkButton from "../layout/LinkButton";

const Home = () => {
  return (
    <section className={styles.home_container}>
      <h1>
        Bem-vindo ao <span>Costs</span>
      </h1>
      <p>Comece a gerenciar os seus projestos agora mesmo!</p>
      <LinkButton to='/newprojects' text='Criar Projetos' />
      <img src={savings} alt='Savings imagem' />
    </section>
  );
};

export default Home;
