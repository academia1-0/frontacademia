'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

import Style from '../../app/globals.css'
import StyleLocal from './StyleLocal.module.css'
import { PaperClipIcon } from '@heroicons/react/20/solid'

// const people = [
//     {
//       name: 'Leslie Alexander',
//       email: 'leslie.alexander@example.com',
//       role: 'Co-Founder / CEO',
//       imageUrl:
//         'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//       lastSeen: '3h ago',
//       lastSeenDateTime: '2023-01-23T13:23Z',
//     },
//     {
//       name: 'Michael Foster',
//       email: 'michael.foster@example.com',
//       role: 'Co-Founder / CTO',
//       imageUrl:
//         'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//       lastSeen: '3h ago',
//       lastSeenDateTime: '2023-01-23T13:23Z',
//     },
//     {
//       name: 'Dries Vincent',
//       email: 'dries.vincent@example.com',
//       role: 'Business Relations',
//       imageUrl:
//         'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//       lastSeen: null,
//     },
//     {
//       name: 'Lindsay Walton',
//       email: 'lindsay.walton@example.com',
//       role: 'Front-end Developer',
//       imageUrl:
//         'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//       lastSeen: '3h ago',
//       lastSeenDateTime: '2023-01-23T13:23Z',
//     },
//     {
//       name: 'Courtney Henry',
//       email: 'courtney.henry@example.com',
//       role: 'Designer',
//       imageUrl:
//         'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//       lastSeen: '3h ago',
//       lastSeenDateTime: '2023-01-23T13:23Z',
//     },
//     {
//       name: 'Tom Cook',
//       email: 'tom.cook@example.com',
//       role: 'Director of Product',
//       imageUrl:
//         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//       lastSeen: null,
//     },
//   ]

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

<div style={{ padding: '20px' }}>
      <h1>Lista de Clientes</h1>

      <table border="2" cellPadding="25" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Nascimento</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
             
              <td>{cliente.nome}</td>
            
              <td>{cliente.email}</td>
             
              <td>{cliente.telefone}</td>
             
              <td> {cliente.data_nascimento
        ? new Date(cliente.data_nascimento).toLocaleDateString('pt-BR')
        : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  







              {/* <ul role="list" className="divide-y divide-white/5">
                {people.map((person) => (
                  <li key={person.email} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                      <img
                        alt=""
                        src={person.imageUrl}
                        className="size-12 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm/6 font-semibold text-white">{person.name}</p>
                        <p className="mt-1 truncate text-xs/5 text-gray-400">{person.email}</p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm/6 text-white">{person.role}</p>
                      {person.lastSeen ? (
                        <p className="mt-1 text-xs/5 text-gray-400">
                          Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                        </p>
                      ) : (
                        <div className="mt-1 flex items-center gap-x-1.5">
                          <div className="flex-none rounded-full bg-emerald-500/30 p-1">
                            <div className="size-1.5 rounded-full bg-emerald-500" />
                          </div>
                          <p className="text-xs/5 text-gray-400">Online</p>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul> */}
              </div>
         
          
        
    )
}