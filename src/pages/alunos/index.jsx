import Style from '../../app/globals.css'
import StyleLocal from './style.module.css'
import HEADER from '../../components/header/index'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import {useState} from 'react'


export default function Alunos(){

  const [ativo, setAtivo] = useState(false)
  const [valor, setValor] = useState('')

    return(
        <div className="bg-gray-900">
            <HEADER/>
            <div className="relative isolate px-6 pt-14 lg:px-8">
   

    <div className="isolate bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-40rem)] sm:w-288.75"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">Dados do Aluno</h2>
        <p className="mt-2 text-lg/8 text-gray-400">Preencha os dados corretamente</p>
      </div>
      <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm/6 font-semibold text-white">
              Nome completo
            </label>
            <div className="mt-2.5">
              <input
                id="first-name"
                name="first-name"
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 ">
          <label className="block text-sm/6 font-semibold text-white">
            Sexo
          </label>
          <div className="mt-1.5">
          <select className="block w-full rounded-md bg-white/5 px-3.5 py-2.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500">
            <option>Outro</option>
            <option>Feminino</option>
            <option>Masculino</option>
          </select>
          </div>
        </div>
          <div className="sm:col-span-2">
            <label htmlFor="company" className="block text-sm/6 font-semibold text-white">
              Endereço
            </label>
            <div className="mt-2.5">
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm/6 font-semibold text-white">
              Email
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="block text-sm/6 font-semibold text-white">
              Número do telefone
            </label>
            <div className="mt-2.5">
              <div className="flex rounded-md bg-white/5 outline-1 -outline-offset-1 outline-white/10 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500">
                {/* <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country"
                    aria-label="Country"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-transparent py-2 pr-7 pl-3.5 text-base text-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  >
                    <option>US</option>
                    <option>CA</option>
                    <option>EU</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                  />
                </div> */}
                <input
                  id="phone-number"
                  name="phone-number"
                  type="text"
                  placeholder="(xx)xxxxx-xxxx"
                  className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                />
              </div>
            </div>
            

          </div>
          {/* <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm/6 font-semibold text-white">
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                rows={4}
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                defaultValue={''}
              />
            </div>
          </div> */}
        <div className="sm:col-span-2">
            <label htmlFor="data_nascimento" className="block text-sm/6 font-semibold text-white">
              Data de nascimento
            </label>
            <div className="mt-2.5">
              <input
                id="data_nascimento"
                name="data_nascimento"
                type="data_nascimento"
                autoComplete="data_nascimento"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
            </div>
          </div>

          {/* <label className="flex items-center cursor-pointer gap-3">
              <span className="text-sm">Pagamento</span>

              <div className={`${StyleLocal.btnPagamento} relative`} >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={ativo}
                  onChange={() => setAtivo(!ativo)}
                />

                <div className={`block w-12 h-6 rounded-full transition 
                  ${ativo ? 'bg-green-500' : 'bg-gray-300'}`}
                />

                <div className={`absolute left-1 top-1 w-4 h-4 bg-black rounded-full transition
                  ${ativo ? 'translate-x-6' : ''}`}
                />
              </div>

      
            </label>

            <div className="sm:col-span-2">
            <label htmlFor="data_pagamento" className="block text-sm/6 font-semibold text-white">
              Data de pagamento
            </label>
            <div className="mt-2.5">
              <input
                id="data_pagamento"
                name="data_pagamento"
                type="data_pagamento"
                autoComplete="data_pagamento"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
            </div>
          </div> */}

         
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>


            </div>
            
        </div>
    )
}