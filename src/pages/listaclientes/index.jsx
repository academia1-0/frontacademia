import Style from '../../app/globals.css'
import StyleLocal from './StyleLocal.module.css'

export default function ListaClientes(){
    return(
        <div>
            <h1 className={StyleLocal.Corfont}>Lista de clientes</h1>
            <h2>Apresentar todos os clientes</h2>
        </div>
    )
}