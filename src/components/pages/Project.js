import { v4 as uuidv4 } from 'uuid'
import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'
import Message from '../layout/Message'

function Project() {
  const { id } = useParams()
  const [project, setProject] = useState({})
  const [services, setServices] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')

  // Busca o projeto
  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (!data.services) data.services = []
          setProject(data)
          setServices(data.services)
        })
        .catch((err) => console.log(err))
    }, 500)
  }, [id])

  // Edita o projeto
  function editPost(updatedProject) {
    if (updatedProject._error) {
      setMessage(updatedProject._error)
      setType('error')
      return
    }

    if (parseFloat(updatedProject.budget) < parseFloat(updatedProject.cost || 0)) {
      setMessage('O orçamento não pode ser menor que o custo do projeto.')
      setType('error')
      return
    }

    setProject(updatedProject)
    setServices(updatedProject.services || [])
    setShowProjectForm(false)
    setMessage('Projeto atualizado com sucesso!')
    setType('success')
    setTimeout(() => setMessage(''), 3000)

    // Atualiza backend
    fetch(`http://localhost:5000/projects/${updatedProject.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProject),
    })
      .then((resp) => resp.json())
      .then((data) => console.log('Projeto atualizado no backend:', data))
      .catch((err) => console.log(err))
  }

  // Adiciona um serviço
  function createService(newService) {
    if (!newService.name || !newService.cost) {
      setMessage('Preencha o nome e o valor do serviço')
      setType('error')
      return
    }

    const newCost = parseFloat(project.cost || 0) + parseFloat(newService.cost)
    if (newCost > parseFloat(project.budget)) {
      setMessage('Orçamento ultrapassado, verifique o valor do serviço')
      setType('error')
      return
    }

    newService.id = uuidv4()
    const updatedServices = [...services, newService]
    const updatedProject = {
      ...project,
      services: updatedServices,
      cost: newCost,
    }

    setProject(updatedProject)
    setServices(updatedServices)
    setMessage('Serviço adicionado com sucesso!')
    setType('success')
    setTimeout(() => setMessage(''), 3000)

    // Atualiza backend
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProject),
    })
      .then((resp) => resp.json())
      .then((data) => console.log('Serviço salvo no backend:', data))
      .catch((err) => console.log(err))
  }

  // Remove serviço
  function removeService(serviceId, serviceCost) {
    const updatedServices = services.filter((s) => s.id !== serviceId)
    const updatedCost = parseFloat(project.cost || 0) - parseFloat(serviceCost)

    const updatedProject = {
      ...project,
      services: updatedServices,
      cost: updatedCost,
    }

    setProject(updatedProject)
    setServices(updatedServices)
    setMessage('Serviço removido com sucesso!')
    setType('success')
    setTimeout(() => setMessage(''), 3000)

    // Atualiza backend
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProject),
    })
      .then((resp) => resp.json())
      .then((data) => console.log('Serviço removido no backend:', data))
      .catch((err) => console.log(err))
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm)
  }

  return (
    <>
      {message && <Message type={type} msg={message} setMessage={setMessage} />}

      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>

              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
              </button>

              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria:</span> {project.category?.name}
                  </p>
                  <p>
                    <span>Total de Orçamento:</span> R${project.budget}
                  </p>
                  <p>
                    <span>Total Utilizado:</span> R${project.cost || 0}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>

            <div className={styles.service_form_container}>
              <h2>Adicione um serviço:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
              </button>

              {showServiceForm && (
                <div className={styles.project_info}>
                  <ServiceForm handleSubmit={createService} textBtn="Adicionar Serviço" />
                </div>
              )}
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
                    handleRemove={removeService}
                  />
                ))
              ) : (
                <p>Nenhum serviço adicionado</p>
              )}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Project
