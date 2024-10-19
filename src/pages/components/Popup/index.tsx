import { useState } from "react"
import { School } from "../../../data/schools"
import styles from './styles.module.css'

interface props {
  listaDePontos: School[];
  closePopup: React.Dispatch<React.SetStateAction<boolean>>
  wordTarget: {text:string, value:number, x:number, y:number} | null
}

export const PopupContent = ({listaDePontos, closePopup, wordTarget}:props) => {
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
    <span className={styles.titleContainer}>
      <h1>A palavra "{wordTarget?.text}" apareceu {wordTarget?.value} vezes!</h1>  
      <button className={styles.closeButton} onClick={() => closePopup( prev => !prev)}>X</button>
    </span>
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
