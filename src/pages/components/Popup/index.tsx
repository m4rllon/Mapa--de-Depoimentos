import { useState } from "react"
import { School } from "../../../data/schools"
import styles from './styles.module.css'

interface props {
  listaDePontos: School[]
}

export const PopupContent = ({listaDePontos, closePopup}:props) => {
  const [index, setIndex] = useState(0)

  const antes = () => {
    if(index - 1 >= 0) {
      const newIndex = index - 1
      setIndex(newIndex)
    }
  }
  const depois = () => {
    if(index+1 < listaDePontos.length){
      const newIndex = index + 1
      setIndex(newIndex)
    }
  }

  return <div className={styles.contianer}>
    <button onClick={() => closePopup( prev => !prev)}>Fechar</button>
    <h1>{listaDePontos[index].name}</h1>
    <p>{listaDePontos[index].depo}</p>
    <button onClick={antes}>Antes</button>
    <button onClick={depois}>Depois</button>
  </div>
}
