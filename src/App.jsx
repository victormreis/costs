import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Home from "./Components/Pages/Home";
import Contact from "./Components/Pages/Contact";
import Company from "./Components/Pages/Company";
import NewProject from "./Components/Pages/NewProject";
import Container from "./Components/layout/Container";
import Navbar from "./Components/layout/Navbar";
import Footer from "./Components/layout/Footer";
import Projects from "./Components/Pages/Projects";
import Project from "./Components/Pages/Project";

function App() {
  return (
    <Router>
     <Navbar />

      <Routes>
        <Route path='/' element={<Container customClass="min-height"><Home /> </Container>} />
        <Route path='/projects' element={<Container ><Projects /> </Container>} />
        <Route path='/contact' element={<Container><Contact /> </Container>} />
        <Route path='/company' element={<Container><Company /> </Container>} />
        <Route path='/newprojects' element={<Container><NewProject /> </Container>} />
        <Route path='/project/:id' element={<Container><Project /> </Container>} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
