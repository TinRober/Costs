import { useState } from 'react'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import styles from '../project/ProjectForm.module.css'

function ServiceForm({ handleSubmit, textBtn }) {
  const [service, setService] = useState({
    name: '',
    cost: '',
    description: '',
  })

  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value })
  }

  function submit(e) {
    e.preventDefault()

    if (!service.name || !service.cost) {
      alert('Preencha o nome e o valor do serviço')
      return
    }

    handleSubmit(service) // envia o serviço para o Project.js
    setService({ name: '', cost: '', description: '' }) // limpa o form
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do serviço"
        name="name"
        placeholder="Insira o nome do serviço"
        handleOnChange={handleChange}
        value={service.name}
      />
      <Input
        type="number"
        text="Custo do serviço"
        name="cost"
        placeholder="Insira o valor total"
        handleOnChange={handleChange}
        value={service.cost}
      />
      <Input
        type="text"
        text="Descrição"
        name="description"
        placeholder="Descreva o serviço"
        handleOnChange={handleChange}
        value={service.description}
      />
      <SubmitButton text={textBtn} />
    </form>
  )
}

export default ServiceForm
