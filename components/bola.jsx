import styles from '../styles/bola.module.css'

export default function Bola(props){
    let cor = props.cor? props.cor : '#f2b337'
    return(
        <div style={{backgroundImage: `radial-gradient(transparent 0%, transparent 30%, ${cor} 30%, ${cor} 100%)`}} className={styles.area}>
            
        </div>
    )
}