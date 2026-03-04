'Use client'
import Style from '../../app/globals.css'
import StyleLocal from './StyleLocal.module.css'
import HEADER from '../../components/header/index'


export default function Planos(){
    return (
    <div className="bg-white-800">
        <HEADER/>
        <div className={StyleLocal.div}>
        <h1>Plano Oferecidos</h1>
        </div>
        
    </div>
    )
}