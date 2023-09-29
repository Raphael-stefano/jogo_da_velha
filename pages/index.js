import styles from '../styles/Home.module.css'
import Xis from '../components/xis'
import Bola from '../components/bola'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home(){
  let [selecionada, setSelecionada] = useState(false)
  let selected2 = selecionada ? styles.selecionada : styles.naoSelecionada
  let selected1 = selecionada ? styles.naoSelecionada : styles.selecionada
  let selecaoBola = selecionada ? '#1a2b33' : '#a9bec8'
  let selecaoX = selecionada ? '#a9bec8' : '#1a2b33'
  let simbolo = selecionada ? 'bola' : 'xis'
  const modo = useRouter()
  function iniciarJogoMultiplayer(_p1){
    modo.push({
        pathname: '/jogo',
        query: {
            p1: _p1
        }
    })
  }
 return(
    <div className={styles.layoutPrincipal}>
      <div className={styles.topo}>
        <Xis/>
        <Bola/>
      </div>
      <div className={styles.selecionarJogador}>
        <p>Selecione com qual quer jogar: </p>
        <div className={styles.selecao}>
          <div onClick={() => setSelecionada(false)} className={selected1}><Xis cor={selecaoX}/></div>
          <div onClick={() => setSelecionada(true)} className={selected2}><Bola cor={selecaoBola}/></div>
        </div>
      </div>
      <div onClick={() => iniciarJogoMultiplayer(simbolo)} className={`${styles.play} ${styles.vsOther}`}>
        <p>Novo jogo</p>
      </div>
    </div>
  )
}