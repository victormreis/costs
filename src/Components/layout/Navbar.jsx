import {Link} from "react-router-dom";
import styles from "./Navbar.module.css";
import Container from "./Container";
import logo from "../../img/costs_logo.png";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Container>
        <Link to='/'>
          <img src={logo} alt='Costs' />
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to='/'>Home</Link>
          </li>
          <li className={styles.item}>
            <Link to='/projects'>Projetos</Link>
          </li>
          <li className={styles.item}>
            <Link to='/company'>Sobre</Link>
          </li>
          <li className={styles.item}>
            <Link to='/newprojects'>Novo Projeto</Link>
          </li>
          <li className={styles.item}>
            <Link to='/contact'>Contato</Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
