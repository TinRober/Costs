import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Company from './components/pages/Company';
import NewProject from './components/pages/NewProject';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';

import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

function App() {
  return (
    <Router>
      <Navbar>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Projects">Projetos</Link></li>
          <li><Link to="/contact">Contato</Link></li>
          <li><Link to="/company">Sobre</Link></li>
          <li><Link to="/newproject">Novo projeto</Link></li>
        </ul>
      </Navbar>

      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/company" element={<Company />} />
          <Route path="/newproject" element={<NewProject />} />
          <Route path="/project/:id" element={<Project />} />
        </Routes>
      </Container>

      <Footer/>
    </Router>
  );
}

export default App;
