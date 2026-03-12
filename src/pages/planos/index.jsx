'use client'

import Style from '../../app/globals.css'
import StyleLocal from './style.module.css'
import HEADER from '../../components/header/index'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import {useState, useEffect} from 'react'
import axios from 'axios' //UTILIZAR QUANDO O PROJETO FOR USAR TOKEN, AUTENTUCAÇÃO JWT, REUTILIZAR baseURL, Headers.
import ModalSucesso from '../../components/modal/modalsucesso/index'
import ModalError from '../../components/modal/modalerror/index'

export default function Planos(){

  const [formData, setFormData] = useState({
    nome_plano: '',
    valor_plano: '',
    beneficios_plano: '',
    qtd_alunos_plano: '10'
});
  const [imagem, setImagem] = useState(null);

  const [ativo, setAtivo] = useState(false)
  const [valor, setValor] = useState('')

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [modalSucess, setModalSucess] = useState(false);
  const [modalError] = useState(true);



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


const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const data = new FormData();

    data.append('nome_plano', formData.nome_plano);
    data.append('valor_plano', formData.valor_plano);
    data.append('beneficios_plano', formData.beneficios_plano);
    data.append('qtd_alunos_plano', formData.qtd_alunos_plano);

    if (imagem) {
      data.append('imagem_plano', imagem);
    }

    const response = await axios.post(
      'http://127.0.0.1:8000/api/plano',
      data,
      // {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // }
    );

    if (response.status === 200 || response.status === 201) {
      setMessage(response.data.message);
      setErrors({});
      setModalSucess(true);
    }

  } catch (error) {

    if (error.response) {

      if (error.response.status === 422) {
        setErrors(error.response.data.errors ?? {});
      } else {
        setMessage(error.response.data.message || 'Erro inesperado.');
      }

    } else {
      setMessage('Erro de conexão com o servidor.');
    }
  }
};


    return(
        <div className="bg-white-800">
            <HEADER/>
            <div className="relative isolate px-6 pt-14 lg:px-8">
   

    <div className="isolate bg-gray-800 px-6 py-24 sm:py-32 lg:px-8">
      
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">Dados do Plano</h2>
        <p className="mt-2 text-lg/8 text-gray-400">Preencha os dados corretamente</p>
      </div>
      <form  onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20" >
        <div className="grid grid-cols-1 gap-x-1 gap-y-6 ">
        <div>
          <label className="block text-sm font-semibold text-white">
            Banner do Plano
          </label>

          <input
            type="file"
            accept="image/*"
             name="imagem_plano"
            onChange={(e) => setImagem(e.target.files[0])}
            className="mt-2 block w-full text-white"
          />
          
        </div>

          <div>
            <label htmlFor="nome_plano" className="block text-sm/6 font-semibold text-white">
              Nome do plano
            </label>
            <div className="mt-2.5">
              <input
                id="nome_plano"
                type="text"
                autoComplete="given-name"
                name="nome_plano"
                value={formData.nome_plano}
                onChange={handleChange}
                className={`block w-full rounded-md px-3.5 py-2 text-base text-white
                  bg-white/5 placeholder:text-gray-500
                  ${
                    errors.nome_plano
                      ? "ring-2 ring-red-500"
                      : "ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500"
                  }`}
              />
            </div>

            {errors.nome_plano && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nome_plano[0]}
              </p>
            )}

          </div>
          
          {/* <div className="flex flex-col gap-1 ">
          <label className="block text-sm/6 font-semibold text-white">
            Benefícios
          </label>
          <div className="mt-1.5">
          <select 
          className={`${StyleLocal.selecaoSexo} block w-full rounded-md bg-white/5 px-3.5 py-2.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500`}
          name="beneficios_plano"
         
          value={formData.beneficios_plano}
          onChange={handleChange}
          >
            <option value="Musculacao" className={StyleLocal.selecaoOpSexo} >Musculação</option>
            <option value="Natacao" className={StyleLocal.selecaoOpSexo}>Natação</option>
            <option value="Personal" className={StyleLocal.selecaoOpSexo}>Personal</option>
          </select>
          </div>
        </div> */}

          <div className="sm:col-span-2">
            <label htmlFor="beneficios_plano" className="block text-sm/6 font-semibold text-white">
              Benefícios
            </label>
            <div className="mt-2.5">
              <textarea
                id="beneficios_plano"
                type="beneficios_plano"
                autoComplete="beneficios_plano"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                name="beneficios_plano"
                value={formData.beneficios_plano}
                onChange={handleChange}
              />
            </div>
          </div>
         
          <div className="sm:col-span-2">
            <label htmlFor="valor_plano" className="block text-sm/6 font-semibold text-white">
              Valor
            </label>
            <div className="mt-2.5">
              <input
                id="valor_plano"
                type="valor_plano"
                autoComplete="valor_plano"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                name="valor_plano"
                value={formData.valor_plano}
                onChange={handleChange}
              />
            </div>
          </div>

         
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