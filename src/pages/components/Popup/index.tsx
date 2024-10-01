import { useState } from "react"
import { School } from "../../../data/schools"
import styles from './styles.module.css'

interface props {
  listaDePontos: School[];
  closePopup: React.Dispatch<React.SetStateAction<boolean>>
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
    <button className={styles.closeButton} onClick={() => closePopup( prev => !prev)}>X</button>
    <span className={styles.titleContainer}>
      <h1 className={styles.textAspas}>"</h1>
      <h1 className={styles.textDepo}>{listaDePontos[index].depo}</h1>
    </span>
    <span className={styles.textContainer}>
      <span className={styles.buttonsContainer}>
        <button className={styles.buttons} onClick={antes}>{'<'}</button>
        <button className={styles.buttons} onClick={depois}>{'>'}</button>
      </span>
      <p className={styles.textName}>{listaDePontos[index].name}</p>
    </span>
  </div>
}
