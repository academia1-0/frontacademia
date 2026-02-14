'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

import Style from '../../app/globals.css'
import StyleLocal from './StyleLocal.module.css'
import { PaperClipIcon } from '@heroicons/react/20/solid'


export default function ListaClientes(){

  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


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

  if (loading) return <p>Carregando clientes...</p>
  if (error) return <p>{error}</p>

    return(

            <div>

              <ul role="list" className="divide-y divide-white/5">
                {clientes.map((cliente) => (
                  <li key={cliente.email} className={`${StyleLocal.compClient} flex justify-between gap-x-6 py-5`}>
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
              </div>
         
          
        
    )
}