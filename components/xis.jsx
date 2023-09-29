import styles from '../styles/xis.module.css'

export default function Xis(props){
    let cor = props.cor? props.cor : '#31c4be'
    return(
        <div style={{backgroundImage: `linear-gradient(to right, transparent 35%, ${cor} 35%, ${cor}  65%, transparent 65%, transparent 100%), linear-gradient(to top, transparent 35%, ${cor}  35%, ${cor}  65%, transparent 65%, transparent 100%)`}} className={styles.area}>
            
        </div>
    )
}