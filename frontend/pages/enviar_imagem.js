import React from 'react'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { getAppCookies, verifyToken } from '../utilities/util'
import Image from 'next/image'

function PreviewImage() {
  var oFReader = new FileReader();
  if (document.getElementById("uploadImage").files[0]){
  oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);
  
  oFReader.onload = function (oFREvent) {
      document.getElementById("uploadPreview").src = oFREvent.target.result;
  };}
};



const EnviarImagem = () => {

  return (
    <Layout title="Envio de Imagem">
      <div className="container">
        <main>
          Selecione a imagem do formulário que deseja enviar:
          <br></br><br></br>
        {/* <img id="uploadPreview" style="width: 100px; height: 100px;" src="/logo.jpg"/> */}
        <Image
        id='uploadPreview'
        className="flex"
        src="/upload-document.png"
        alt="Upload logo"
        width="256"
        height="256"
        /> 
        {/* <input id="uploadImage" type="file" name="myPhoto" /> */}
        <input
          id='uploadImage'
          className="w-full p-2 mb-6 text-red-700 border-b-2 border-red-500 outline-none focus:bg-gray-100"
          type="file"
          onChange={PreviewImage}
        ></input>
        </main>
      </div>
    </Layout>
  )
}

export default EnviarImagem
