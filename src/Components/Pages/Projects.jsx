import { useLocation } from "react-router-dom";
import Message from "../layout/Message";

const Projects = () => {
  const location = useLocation()
  console.log(location)
  let message = ''
  if(location.state) {
    message = location.state.message
  }
  return (
    <div>
      <h1>Meus Projetos</h1>
      {message && <Message type="success" msg={message} />}
    </div>
   );
}
 
export default Projects;