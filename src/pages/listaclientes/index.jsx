'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

import Style from '../../app/globals.css'
import StyleLocal from './StyleLocal.module.css'
import { PaperClipIcon } from '@heroicons/react/20/solid'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import ModalAviso from '../../components/modal/modalaviso/index'


export default function ListaClientes(){

  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [modalaviso, setModalAviso] = useState(false)


  //para o modal de alerta
  const [clienteSelecionado, setClienteSelecionado] = useState(null)
  const [modalAberto, setModalAberto] = useState(false)
  const [nomeCliente, setNomeCliente] = useState('')
  //Barra de aviso Toast
  const [toast, setToast] = useState(false)


  const abrirModalDelete = (cliente) => {
    setClienteSelecionado(cliente)
    setModalAberto(true)
    setNomeCliente(cliente.nome)
  }

  //Listar clientes
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/clientes')
      .then(response => {
        setClientes(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error(error)
        setError('Erro ao carregar clientes')
        setLoading(false)
      })
  }, [])

  //Deletar cliente
  // const deletarCliente = async (id) => {
  //   setModalAviso(true);
  //   if(modalaviso==true){
  //     try {
  //       await axios.delete(`http://localhost:8000/api/clientes/${id}`)
  //       console.log('Cliente deletado')
  //     } catch (error) {
  //       console.error(error.response?.data)
  //     }
  //   }

    
  // }
  const deletarCliente = async () => {
    if (!clienteSelecionado) return //Evita erro Caso o cliente for null

    try {
      await axios.delete(`http://127.0.0.1:8000/api/clientes/${clienteSelecionado.id}`)
  
      // Atualiza lista removendo cliente deletado
      setClientes(prev =>
        prev.filter(c => c.id !== clienteSelecionado.id)
      )

      setModalAberto(false)
      setClienteSelecionado(null)

      setToast(true)

      setTimeout(() => {
        setToast(false)
      }, 3000)
  
    } catch (error) {
      console.error(error)
    }
  }




  if (loading) return <p>Carregando clientes...</p>
  if (error) return <p>{error}</p>

    return(

            <div>

              <ul role="list" className="divide-y divide-white/5">
                {clientes.map((cliente) => (
                  <li key={cliente.email} className={`${StyleLocal.compClient} relative flex justify-between gap-x-6 py-10 pr-5`}>

                  <div className="absolute top-2 right-2 flex gap-2 ">
                    <button
                      onClick={() => editarCliente(cliente)}
                      className="p-1 rounded-full hover:bg-blue-400 transition"
                    >
                      <PencilIcon className="h-5 w-5 text-blue-600 hover:text-blue-800" />
                    </button>

                    <button
                     onClick={() => abrirModalDelete(cliente)}
                      className="p-1 rounded-full hover:bg-red-400 transition"
                    >
                      <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-800" />
                    </button>
                  </div>

                    <div className="flex min-w-0 gap-x-4">
                      <img
                        alt=""
                        src={cliente.imageUrl}
                        className="size-12 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                      />
                      <div className="min-w-0 flex-auto">
                        <p className={`${StyleLocal.clientText} text-sm/6 font-semibold text-gray-800`}>{cliente.nome}</p>
                        <p className={`${StyleLocal.clientText} mt-1 truncate text-xs/5 text-gray-600`}>{cliente.email}</p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className={`${StyleLocal.clientText} text-sm/6 text-gray-800`}>
                      Telefone: {cliente.telefone}
                      </p>
                      {cliente.data_nascimento ? (
                        <p className={`${StyleLocal.clientText} text-sm/6 text-gray-800`}>
                          Data de Nascimento: {cliente.data_nascimento ? new Date(cliente.data_nascimento).toLocaleDateString('pt-BR'): ''}
                        </p>
                        
                      ) : (
                        
                        <div className="mt-1 flex items-center gap-x-1.5">
                          <div className="flex-none rounded-full bg-emerald-500/30 p-1">
                            <div className="size-1.5 rounded-full bg-emerald-500" />
                          </div>
                          <p className="text-xs/5 text-gray-400">Online</p>
                        </div>
                      )}
                       <p className={`${StyleLocal.clientText} text-sm/6 text-gray-800`}>
                      Data de pagamento: {cliente.data_pagamento}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
        {/* Modal de aviso */}
        <ModalAviso
          aberto={modalAberto}
          onClose={() => setModalAberto(false)}
          onConfirm={deletarCliente}
          cliente={clienteSelecionado}
        />
        {/* Barra de aviso */}
        {toast && (
          <div className="fixed bottom-5 left-1/2 -translate-x-1/2 
                          bg-emerald-600 text-white 
                          px-6 py-3 rounded-lg shadow-lg
                          animate-fadeInOut transition-opacity duration-500">
            ✅ {nomeCliente} deletado com sucesso!
          </div>
        )}


              </div>
         
          
        
    )
}