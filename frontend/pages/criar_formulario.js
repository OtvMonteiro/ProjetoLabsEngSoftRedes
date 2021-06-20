import React from 'react'
import Link from 'next/link'
import LayoutCriarFormulario from '../components/layout/LayoutCriarFormulario'
import { getAppCookies, verifyToken } from '../utilities/util'
import Image from 'next/image'



const CriarFormulario = () => {

  return (
    <LayoutCriarFormulario title="Criar Formulário">
      <div className="container">
        <main>
          <Image
            src='/Screenshot_3.png'
            width='821'
            height='554'
          />
          <br></br><br></br>
        </main>
      </div>
    </LayoutCriarFormulario>
  )
}

export default CriarFormulario
