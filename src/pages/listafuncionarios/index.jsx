'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

import Style from '../../app/globals.css'
import StyleLocal from './StyleLocal.module.css'
import { PaperClipIcon } from '@heroicons/react/20/solid'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import ModalAviso from '../../components/modal/modalaviso/index'
import { useRouter } from 'next/navigation'

export default function ListaFuncionario(){

  const [funcionario, setFuncionario] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [modalaviso, setModalAviso] = useState(false)


  //para o modal de alerta
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null)
  const [modalAberto, setModalAberto] = useState(false)
  const [nomeFuncionario, setNomeFuncionario] = useState('')
  //Barra de aviso Toast
  const [toast, setToast] = useState(false)
  //Editar 
  const router = useRouter()

  const editarFuncionario = (funcionario) => {
    router.push(`funcionario/${funcionario.id}`)
  }

  const abrirModalDelete = (funcionario) => {
    setFuncionarioSelecionado(funcionario)
    setModalAberto(true)
    setNomeFuncionario(funcionario.nome)
  }

  //Listar Funcionario
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/funcionario')
      .then(response => {
        setFuncionario(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error(error)
        setError('Erro ao carregar Funcionario')
        setLoading(false)
      })
  }, [])

  //Deletar Funcionario
  const deletarFuncionario = async () => {
    if (!funcionarioSelecionado) return //Evita erro Caso o Funcionario for null

    try {
      await axios.delete(`http://127.0.0.1:8000/api/funcionario/${funcionarioSelecionado.id}`)
  
      // Atualiza lista removendo Funcionario deletado
      setFuncionario(prev =>
        prev.filter(c => c.id !== funcionarioSelecionado.id)
      )

      setModalAberto(false)
      setFuncionarioSelecionado(null)

      setToast(true)

      setTimeout(() => {
        setToast(false)
      }, 4000)
  
    } catch (error) {
      console.error(error)
    }
  }

  //Editar Funcionario
  



  if (loading) return <p>Carregando Funcionario...</p>
  if (error) return <p>{error}</p>

    return(

            <div>

              <ul role="list" className="divide-y divide-white/5">
                {funcionario.map((funcionario) => (
                  <li key={funcionario.email} className={`${StyleLocal.compClient} relative flex justify-between gap-x-6 py-10 pr-5`}>

                  <div className="absolute top-2 right-2 flex gap-2 ">
                    <button
                      onClick={() => editarFuncionario(funcionario)}
                      className="p-1 rounded-full hover:bg-blue-400 transition"
                    >
                      <PencilIcon className="h-5 w-5 text-blue-600 hover:text-blue-800" />
                    </button>

                    <button
                     onClick={() => abrirModalDelete(funcionario)}
                      className="p-1 rounded-full hover:bg-red-400 transition"
                    >
                      <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-800" />
                    </button>
                  </div>

                    <div className="flex min-w-0 gap-x-4">
                      <img
                        alt=""
                        src={funcionario.imageUrl}
                        className="size-12 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                      />
                      <div className="min-w-0 flex-auto">
                        <p className={`${StyleLocal.clientText} text-sm/6 font-semibold text-gray-800`}>{funcionario.nome}</p>
                        <p className={`${StyleLocal.clientText} mt-1 truncate text-xs/5 text-gray-600`}>{funcionario.email}</p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className={`${StyleLocal.clientText} text-sm/6 text-gray-800`}>
                      Telefone: {funcionario.telefone}
                      </p>
                      {funcionario.data_nascimento ? (
                        <p className={`${StyleLocal.clientText} text-sm/6 text-gray-800`}>
                          Data de Nascimento: {funcionario.data_nascimento ? new Date(funcionario.data_nascimento).toLocaleDateString('pt-BR'): ''}
                        </p>
                        
                      ) : (
                        
                        <div className="mt-1 flex items-center gap-x-1.5">
                          <div className="flex-none rounded-full bg-emerald-500/30 p-1">
                            <div className="size-1.5 rounded-full bg-emerald-500" />
                          </div>
                          <p className="text-xs/5 text-gray-400">Online</p>
                        </div>
                      )}
                       {/* <p className={`${StyleLocal.clientText} text-sm/6 text-gray-800`}>
                      Data de pagamento: {funcionario.data_pagamento}
                      </p> */}
                      <p className={`${StyleLocal.clientText} text-sm/6 text-gray-800`}>
                      Formação: {funcionario.formacao}
                      </p>
                      <p className={`${StyleLocal.clientText} text-sm/6 text-gray-800`}>
                      Cargo: {funcionario.cargo}
                      </p>
                      <p className={`${StyleLocal.clientText} text-sm/6 text-gray-800`}>
                      Salário: {funcionario.salario}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
        {/* Modal de aviso */}
        <ModalAviso
          aberto={modalAberto}
          onClose={() => setModalAberto(false)}
          onConfirm={deletarFuncionario}
          funcionario={funcionarioSelecionado}
        />
        {/* Barra de aviso */}
        {toast && (
          <div className="fixed bottom-5 left-1/2 -translate-x-1/2 
                          bg-emerald-600 text-white 
                          px-6 py-3 rounded-lg shadow-lg
                          animate-fadeInOut transition-opacity duration-500">
            ✅ {nomeFuncionario} deletado com sucesso!
          </div>
        )}


              </div>
         
          
        
    )
}