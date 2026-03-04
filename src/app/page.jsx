'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import HEADER from '../components/header/index'
//import  equipe  from '../pages/equipe/index'




export default function Example() {
 
 

  return (
    <div className="bg-gray-800">
      <HEADER>

      </HEADER>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-red-400 ring-1 ring-white/10 hover:ring-white/20">
              Planos disponíveis{' '}
              <Link href="/listaplanos" className="font-semibold text-indigo-400">
                <span aria-hidden="true" className="absolute inset-0" />
                Verificar <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
              Academia ProEvolution
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
           Mais Organização + Controle e Resultados 
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/dashboard"
                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Dashboard
              </Link>
              <Link href="/" className="text-sm/6 font-semibold text-white">
                Sobre <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  )
}
