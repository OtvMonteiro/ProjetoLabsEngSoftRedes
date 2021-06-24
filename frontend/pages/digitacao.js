import React from 'react'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { getAppCookies, verifyToken } from '../utilities/util'
import Image from 'next/image'



const Digitacao = () => {

  return (
    <Layout title="Digitação">
      <div className="container">
        <main>
          Digite o texto da imagem:
          <Image
            src='/Screenshot_2.png'
            width='770'
            height='246'
          />
          <br></br><br></br>
        <input
          className="w-full p-2 mb-6 text-red-700 border-b-2 border-red-500 outline-none focus:bg-gray-100"
          type="text"
          name="email"
          value='Lorem Ipsum'
        ></input>
        </main>
      </div>
    </Layout>
  )
}

export default Digitacao
