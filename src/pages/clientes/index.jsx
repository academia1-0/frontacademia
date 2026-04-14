'use client'

import Style from '../../app/globals.css'
import StyleLocal from './style.module.css'
import HEADER from '../../components/header/index'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import {useState, useEffect} from 'react'
import axios from 'axios' //UTILIZAR QUANDO O PROJETO FOR USAR TOKEN, AUTENTUCAÇÃO JWT, REUTILIZAR baseURL, Headers.
import ModalSucesso from '../../components/modal/modalsucesso/index'
import ModalError from '../../components/modal/modalerror/index'

export default function Clientes(){

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    data_nascimento: '',
    endereco: '',
    sexo: 'Outros',
    pagamento: 1,
    data_pagamento: '31/03/2026',
    plano: ''
});

  const [ativo, setAtivo] = useState(false)
  const [valor, setValor] = useState('')

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [modalSucess, setModalSucess] = useState(false);
  const [modalError] = useState(true);

  const [planos, setPlanos] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
//Usando para buscar planos

useEffect(() => {
  axios.get('http://127.0.0.1:8000/api/plano')
    .then(response => {
      setPlanos(response.data)
      setLoading(false)
    })
    .catch(error => {
      console.error(error)
      setError('Erro ao carregar Planos')
      setLoading(false)
    })
}, [])





const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData(prev => ({
    ...prev,
    [name]: value
  }));

  // Remove erro daquele campo específico
  if (errors[name]) {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }
};


  //-------------usando axios
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    try {
        // Fazendo a requisição com axios
        const response = await axios.post('http://127.0.0.1:8000/api/clientes', formData);

        // Verifica se a requisição foi bem-sucedida
        if (response.status === 200 || response.status === 201) {
            setMessage(response.data.message); // Configura a mensagem de sucesso
            setErrors({}); // Limpa os erros
            setModalSucess(true) // Configura o estado de sucesso para aparecer o modal
        }
    } catch (error) {
        // Trata os erros

        if (error.response) {
          // Loga tudo que veio do backend
          console.error('Status:', error.response.status);
          console.error('Data:', error.response.data);
  
          // Caso específico de validação Laravel (422)
          if (error.response.status === 422) {
              setErrors(error.response.data.erros ?? {}); // <-- correto
          } else {
              setMessage(error.response.data.message || 'Erro inesperado.');
          }
      } else {
          // Erro de rede ou Axios
          console.error('Erro Axios:', error);
          setMessage('Erro de conexão com o servidor.');
      }

    }
};


    return(
        <div className="bg-white-800">
            <HEADER/>
            <div className="relative isolate px-6 pt-14 lg:px-8">
   

    <div className="isolate bg-gray-800 px-6 py-24 sm:py-32 lg:px-8">
      {/* <div
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
      </div> */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">Dados do Aluno</h2>
        <p className="mt-2 text-lg/8 text-gray-400">Preencha os dados corretamente</p>
      </div>
      <form  onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20" >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm/6 font-semibold text-white">
              Nome completo
            </label>
            <div className="mt-2.5">
              <input
                id="first-name"
                type="text"
                autoComplete="given-name"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className={`block w-full rounded-md px-3.5 py-2 text-base text-white
                  bg-white/5 placeholder:text-gray-500
                  ${
                    errors.nome
                      ? "ring-2 ring-red-500"
                      : "ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500"
                  }`}
              />
            </div>

            {errors.nome && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nome[0]}
              </p>
            )}

          </div>
          <div className="flex flex-col gap-1 ">
          <label className="block text-sm/6 font-semibold text-white">
            Sexo
          </label>
          <div className="mt-1.5">
          <select 
          className={`${StyleLocal.selecaoSexo} block w-full rounded-md bg-white/5 px-3.5 py-2.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500`}
          name="sexo"
         
          value={formData.sexo}
          onChange={handleChange}
          >
            <option value="Outros" className={StyleLocal.selecaoOpSexo} >Outros</option>
            <option value="Feminino" className={StyleLocal.selecaoOpSexo}>Feminino</option>
            <option value="Masculino" className={StyleLocal.selecaoOpSexo}>Masculino</option>
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
                type="text"
                autoComplete="organization"              
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                className={`block w-full rounded-md px-3.5 py-2 text-base text-white
                  bg-white/5 placeholder:text-gray-500
                  ${
                    errors.endereco
                      ? "ring-2 ring-red-500"
                      : "ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500"
                  }`}
              />
            </div>
            {errors.endereco && (
              <p className="text-red-500 text-sm mt-1">
                {errors.endereco[0]}
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm/6 font-semibold text-white">
              Email
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="block text-sm/6 font-semibold text-white">
              Número do telefone
            </label>
            <div className="mt-2.5">
              <div className="flex rounded-md bg-white/5 outline-1 -outline-offset-1 outline-white/10 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500">
                <input
                  id="phone-number"
                  type="text"
                  placeholder="(xx)xxxxx-xxxx"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className={`block w-full rounded-md px-3.5 py-2 text-base text-white
                    bg-white/5 placeholder:text-gray-500
                    ${
                      errors.telefone
                        ? "ring-2 ring-red-500"
                        : "ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500"
                    }`}
                />
              </div>
              {errors.telefone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.telefone[0]}
              </p>
            )}
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
                type="date"
                autoComplete="data_nascimento"
                name="data_nascimento"
                value={formData.data_nascimento}
                onChange={handleChange}
                className={`block w-full rounded-md px-3.5 py-2 text-base text-white
                  bg-white/5 placeholder:text-gray-500
                  ${
                    errors.data_nascimento
                      ? "ring-2 ring-red-500"
                      : "ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500"
                  }`}
              />
            </div>
            {errors.data_nascimento && (
              <p className="text-red-500 text-sm mt-1">
                {errors.data_nascimento[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1 ">
          <label className="block text-sm/6 font-semibold text-white">
            Plano
          </label>
          <div className="mt-1.5">
         
          <select
          className={`${StyleLocal.selecaoSexo} block w-full rounded-md bg-white/5 px-3.5 py-2.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500`}
          name="plano"
         
          // value={formData.sexo}
          onChange={handleChange}
          >
             {planos.map((plano) => (
            <option value={plano.nome_plano}  key={plano.id} className={StyleLocal.selecaoOpSexo} >{plano.nome_plano}</option>
            
          ))}
            </select>
        
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

    {modalSucess == true &&
        <ModalSucesso/>
        }

            </div>
            
        </div>
    )
}