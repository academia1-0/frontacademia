'use client'
import Style from '../../app/globals.css'
import StyleLocal from './StyleLocal.module.css'
import HEADER from '../../components/header/index'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import banner1 from '../../assets/banner1.jpg'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import ModalAviso  from '../../components/modal/modalaviso/index'
  
  export default function ListaPlanos() {
      const [planos, setPlanos] = useState([])
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState(null)
      const [menuAberto, setMenuAberto] = useState(null)
      const router = useRouter()

      //modal delete
        //para o modal de alerta
      const [clienteSelecionado, setClienteSelecionado] = useState(null)
      const [modalAberto, setModalAberto] = useState(false)
      const [nomeCliente, setNomeCliente] = useState('')
        //Barra de aviso Toast
      const [toast, setToast] = useState(false)
  //Listar Funcionario
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/plano')
      .then(response => {
        setPlanos(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error(error)
        setError('Erro ao carregar Funcionario')
        setLoading(false)
      })
  }, [])

  //Função para editar
  const handleEditar = (plano) => {
    router.push(`planos/${plano.id}`)
  }

  //modal delete
  const abrirModalDelete = (cliente) => {
    setClienteSelecionado(cliente)
    setModalAberto(true)
    setNomeCliente(cliente.nome)
  }

  //Função para deletar

  const deletarCliente = async () => {
    if (!clienteSelecionado) return //Evita erro Caso o cliente for null

    try {
      await axios.delete(`http://127.0.0.1:8000/api/plano/${clienteSelecionado.id}`)
  
      // Atualiza lista removendo cliente deletado
      setPlanos(prev =>
        prev.filter(c => c.id !== clienteSelecionado.id)
      )

      setModalAberto(false)
      setClienteSelecionado(null)

      setToast(true)

      setTimeout(() => {
        setToast(false)
      }, 4000)
  
    } catch (error) {
      console.error(error)
    }
  }

  // const handleDeletar = async (id) => {
  //   try {
  //     await axios.delete(`http://127.0.0.1:8000/api/plano/${id}`)
  //     setPlanos(planos.filter(p => p.id !== id))
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  if (loading) return <p>Carregando Planos...</p>
  if (error) return <p>{error}</p>

    return (
      <div className="bg-gray-800">
         <HEADER/>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-gray-100">Planos Disponíveis</h2>
  
            <div className="mt-6 space-y-12  lg:grid lg:grid-cols-3 lg:space-y-2 lg:gap-x-6">
              {planos.map((plano) => (
               <div key={plano.id} className="group relative bg-white p-2 rounded-lg">

               {/* BOTÃO 3 PONTINHOS */}
               <button
                 onClick={() => setMenuAberto(menuAberto === plano.id ? null : plano.id)}
                 className="absolute top-2 right-2 z-10 p-1 rounded-full hover:bg-gray-200"
               >
                 <EllipsisVerticalIcon className="w-5 h-5 text-gray-700" />
               </button>
             
               {/* MENU DROPDOWN */}
               {menuAberto === plano.id && (
                 <div className="absolute top-10 right-2 bg-white shadow-lg rounded-md w-32 z-20">
                   <button
                     onClick={() => handleEditar(plano)}
                     className="block w-full text-left px-4 py-2 hover:bg-blue-400 text-black"
                   >
                     ✏️ Editar
                   </button>
                   <button
                    //  onClick={() => handleDeletar(plano.id)}
                     onClick={() => abrirModalDelete(plano)}
                     className="block w-full text-left px-4 py-2 hover:bg-red-400 text-black"
                   >
                     🗑️ Deletar
                   </button>
                 </div>
               )}
             
               {/* IMAGEM */}
               <img
                 src={`http://127.0.0.1:8000/storage/${plano.imagem_plano}`}
                 className="w-full rounded-lg object-cover"
               />
             
               {/* TEXTO */}
               <h3 className={`${StyleLocal.fontTitulo} mt-6 text-sm text-gray-500`}>
                 {plano.nome_plano}
                 <p />
                 R$ {plano.valor_plano}
               </h3>
             
               <p className="text-base font-semibold text-gray-900">
                 {plano.beneficios_plano}
               </p>
             
             </div>
             
              ))}
            
            </div>

                    {/* Modal de aviso */}
                    <ModalAviso
                      aberto={modalAberto}
                      onClose={() => setModalAberto(false)}
                      onConfirm={deletarCliente}
                      cliente={clienteSelecionado}
                    />
                    {/* Barra de aviso */}
        
          </div>
        </div>
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
  