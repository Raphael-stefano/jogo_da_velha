import Xis from "@/components/xis"
import styles from "../styles/jogo.module.css"
import Bola from "@/components/bola"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

export default function multyplayer(){
    let [quadradoA0, setQuadradoA0] = useState('')
    let [quadradoA1, setQuadradoA1] = useState('')
    let [quadradoA2, setQuadradoA2] = useState('')
    let [quadradoB0, setQuadradoB0] = useState('')
    let [quadradoB1, setQuadradoB1] = useState('')
    let [quadradoB2, setQuadradoB2] = useState('')
    let [quadradoC0, setQuadradoC0] = useState('')
    let [quadradoC1, setQuadradoC1] = useState('')
    let [quadradoC2, setQuadradoC2] = useState('')
    let router = useRouter()
    let p1 = router.query.p1 ? router.query.p1 : 'xis'
    let p2
    let simboloInicial
    if(p1 == 'xis'){
        p2 = 'bola'
        simboloInicial = 'xis'
    } else if(p1 == 'bola'){
        p2 = 'xis'
        simboloInicial = 'bola'
    }
    let renderizarSimboloInicial = simboloInicial == 'xis' ? <Xis cor="#a8bec9"/> : <Bola cor="#a8bec9"/>
    let [simboloTopo, setSimboloTopo] = useState(renderizarSimboloInicial)
    let [vez, setVez] = useState(p1)
    function jogada([quadrado, setQuadrado]){
        if(quadrado == ''){
            if(p1 == 'xis' && p2 == 'bola'){
                if(vez == p1){
                    setQuadrado('xis')
                    mudarVez()
                    setSimboloTopo(<Bola cor="#a8bec9"/>)                   
                } else if(vez == p2){
                    setQuadrado('bola')
                    mudarVez()
                    setSimboloTopo(<Xis cor="#a8bec9"/>)
                }
            } else if(p1 == 'bola' && p2 == 'xis'){
                if(vez == p2){
                    setQuadrado('xis')
                    mudarVez()
                    setSimboloTopo(<Bola cor="#a8bec9"/>)
                } else if(vez == p1){
                    setQuadrado('bola')
                    mudarVez()
                    setSimboloTopo(<Xis cor="#a8bec9"/>)
                }
            }
        }
    }
    function mudarVez(){
        if(vez == p1){
            setVez(p2)
        } else{
            setVez(p1)
        }
    }
    let linha1 = [quadradoA0, quadradoA1, quadradoA2]
    let linha2 = [quadradoB0, quadradoB1, quadradoB2]
    let linha3 = [quadradoC0, quadradoC1, quadradoC2]
    let coluna1 = [quadradoA0, quadradoB0, quadradoC0]
    let coluna2 = [quadradoA1, quadradoB1, quadradoC1]
    let coluna3 = [quadradoA2, quadradoB2, quadradoC2]
    let diagonal1 = [quadradoA0, quadradoB1, quadradoC2]
    let diagonal2 = [quadradoA2, quadradoB1, quadradoC0]
    let possibilidadesDeVitoria = [linha1, linha2, linha3, coluna1, coluna2, coluna3, diagonal1, diagonal2]
    let [faixa, setFaixa] = useState(false)
    let [vitoriasP1, setVitoriasP1] = useState(0)
    let [vitoriasP2, setVitoriasP2] = useState(0)
    let [empates, setEmpates] = useState(0)
    let [playerVencedor, setPlayerVencedor] = useState(false)
    let [simboloVencedor, setSimboloVencedor] = useState(false)
    let vencedor = {
        player: playerVencedor,
        simbolo: simboloVencedor
    }
    function verificarVitoria(){
        if(p1 == 'xis'){
            possibilidadesDeVitoria.forEach(array => {
                if(array[0] == 'xis' && array[1] == 'xis' && array[2] == 'xis'){
                    setPlayerVencedor(p1)
                    setSimboloVencedor('xis')
                    setFaixa(true)
                } else if(array[0] == 'bola' && array[1] == 'bola' && array[2] == 'bola'){
                    setPlayerVencedor(p2)
                    setSimboloVencedor('bola')
                    setFaixa(true)
                }
            })
        } else if(p1 == 'bola'){
            possibilidadesDeVitoria.forEach(array => {
                if(array[0] == 'bola' && array[1] == 'bola' && array[2] == 'bola'){
                    setPlayerVencedor(p1)
                    setSimboloVencedor('bola')
                    setFaixa(true)
                } else if(array[0] == 'xis' && array[1] == 'xis' && array[2] == 'xis'){
                    setPlayerVencedor(p2)
                    setSimboloVencedor('xis')
                    setFaixa(true)
                }
            })
        } 
    }
    function renderizarQuadrado(quadrado){
        if(quadrado == 'xis'){
            return <Xis/>
        } else if(quadrado == 'bola'){
            return <Bola/>
        } else{
            return ''
        }
    }
    function maisUmaRodada(){
        setFaixa(false)
        if(vencedor.player == p1){
            setVitoriasP1(vitoriasP1 + 1)
        } else if(vencedor.player == p2){
            setVitoriasP2(vitoriasP2 + 1)
        } else{
            setEmpates(empates + 1)
        }
        setPlayerVencedor(false)
        setSimboloVencedor(false)
        setQuadradoA0('')
        setQuadradoA1('')
        setQuadradoA2('')
        setQuadradoB0('')
        setQuadradoB1('')
        setQuadradoB2('')
        setQuadradoC0('')
        setQuadradoC1('')
        setQuadradoC2('')
    }
    useEffect(verificarVitoria)
    return(
        <div className={styles.page}>
            <div className={styles.body}>
                <div className={styles.topo}>
                    <div className={styles.simbolos}>
                        <Xis/>
                        <Bola/>
                    </div>
                    <div className={styles.turno}>
                        <div className={styles.divMaior}><div>{simboloTopo}</div> <p>Turn</p></div>
                    </div>
                    <div className={styles.teclaReiniciar}>
                        <div onClick={maisUmaRodada} className={styles.reiniciar}></div>
                    </div>
                </div>

                <div onClick={verificarVitoria} className={styles.jogo}>
                    <div className={styles.linha}>
                        <div onClick={() => jogada([quadradoA0, setQuadradoA0])} className={styles.quadrado}>{renderizarQuadrado(quadradoA0)}</div>
                        <div onClick={() => jogada([quadradoA1, setQuadradoA1])} className={styles.quadrado}>{renderizarQuadrado(quadradoA1)}</div>
                        <div onClick={() => jogada([quadradoA2, setQuadradoA2])} className={styles.quadrado}>{renderizarQuadrado(quadradoA2)}</div>
                    </div>
                    <div className={styles.linha}>
                        <div onClick={() => jogada([quadradoB0, setQuadradoB0])} className={styles.quadrado}>{renderizarQuadrado(quadradoB0)}</div>
                        <div onClick={() => jogada([quadradoB1, setQuadradoB1])} className={styles.quadrado}>{renderizarQuadrado(quadradoB1)}</div>
                        <div onClick={() => jogada([quadradoB2, setQuadradoB2])} className={styles.quadrado}>{renderizarQuadrado(quadradoB2)}</div>
                        </div>
                    <div className={styles.linha}>
                        <div onClick={() => jogada([quadradoC0, setQuadradoC0])} className={styles.quadrado}>{renderizarQuadrado(quadradoC0)}</div>
                        <div onClick={() => jogada([quadradoC1, setQuadradoC1])} className={styles.quadrado}>{renderizarQuadrado(quadradoC1)}</div>
                        <div onClick={() => jogada([quadradoC2, setQuadradoC2])} className={styles.quadrado}>{renderizarQuadrado(quadradoC2)}</div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.footerDiv}>
                        <div>Jogador 1:</div>
                        <div>{vitoriasP1}</div>
                    </div>
                    <div className={styles.footerDiv}>
                        <div>Empates:</div>
                        <div>{empates}</div>
                    </div>
                    <div className={styles.footerDiv}>
                        <div>Jogador 2:</div>
                        <div>{vitoriasP2}</div>
                    </div>
                </div>
            </div>
            <div style={{display: faixa ? 'flex' : 'none'}} className={styles.vitoria}>
                    <div style={{color: '#a8bec9'}}>Vencedor: {vencedor.player == p1 ? 'Jogador 1' : 'Jogador 2'}</div>
                    <div className={styles.vencedor} style={{color: vencedor.simbolo == 'xis' ? '#31c4be' : '#f2b337'}}><span>{vencedor.simbolo == 'xis' ? <Xis/> : <Bola/>}</span><span>é o vencedor!</span></div>
                    <div className={styles.base}>
                        <div><Link className={styles.link} href='/'>Quit</Link></div>
                        <div onClick={maisUmaRodada}>Next round</div>
                    </div>
            </div>
        </div>
    )
}