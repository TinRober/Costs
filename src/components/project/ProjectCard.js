import { BsPencil, BsFillTrashFill } from 'react-icons/bs'
import {Link} from 'react-router-dom'
import styles from './ProjectCard.module.css'

function ProjectCard({ id, name, budget, category, handleRemove }) {
  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Orçamento:</span> R${budget}
      </p>
      <p className={styles.category_text}>
        <span className={styles.category_text_span + ' ' + styles[category?.name?.toLowerCase()]}></span>
        {category?.name}
      </p>
      <div className={styles.project_card_actions}>
        <Link to={`/project/${id}`}>
          <BsPencil /> Editar
        </Link>
        <button onClick={() => handleRemove(id)}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  )
}

export default ProjectCard
