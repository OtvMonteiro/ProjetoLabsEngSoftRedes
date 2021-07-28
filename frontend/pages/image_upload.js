import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { getAppCookies, verifyToken } from '../utilities/util'
import Cookies from 'js-cookie'
import Router from 'next/router'
import Image from 'next/image'
import Input from '@material-ui/core/Input';


export default function UploadImage() {
    const [stateUploadImage, setstateUploadImage] = useState({
        selectedFile: null
    })
    const [stateStatus, setStateStatus] = useState({
      status: ''
    })
    const [stateMunicipio, setStateMunicipio] = useState({
      municipio: ''
    })

    const onMunicipioChange = event => {
      console.log(event);
      setStateMunicipio({municipio: event.target.value})
  }
    const onSelectFile = event => {
        console.log("corrected inputed image files");
        console.log(event.target.files[0]);
        setstateUploadImage({selectedFile: event.target.files[0]})
        setStateStatus({status: ''})
    }

    const onUploadHandler = async event => {
        
        var formdata = new FormData();
        formdata.append('imagem', stateUploadImage['selectedFile']);
        formdata.append('municipio', stateMunicipio['municipio'])

        console.log(formdata)

        axios.post('/carregar', formdata, {
        headers: {
        "Content-Type": `multipart/form-data; boundary=${formdata._boundary}`,
        }
        }).then(response => {
          console.log(response);
          setStateStatus({status: response.data.status});
          }
          
          );
        
    }

    const redirectToLoginPage = () => {
        Cookies.remove('token')
        Cookies.remove('nomeDoUsuario')
        Router.push('/') //redireciona para a tela de cadastro.
      }
    
    return (
        
        <Layout title="Envio de Imagem">
      <div className="container">
        <main>
          Selecione a imagem do formulário que deseja enviar:
          <br></br><br></br>
        <Image
        id='uploadPreview'
        className="flex"
        src="/upload-document.png"
        alt="Upload logo"
        width="256"
        height="256"
        /> 
        <div>
            <input
                id='file_input'
                className="w-full px-4 py-2 mb-6 font-bold text-white bg-green-700 rounded hover:bg-green-500"
                type="file"
                onChange={onSelectFile} 
                multiple
            ></input>

            <div>            
              <Input id="municipio"  type="text" placeholder="Nome do município"  onChange={onMunicipioChange} />
              <br></br>          
              <br></br>
            </div>

            <button className="w-full h-10 px-0 py-0 mb-6 font-bold text-white bg-green-700 rounded hover:bg-green-500" type="submit" onClick={() => {onUploadHandler(); 
                                                                                                                                                      document.getElementById("file_input").value = '';
                                                                                                                                                      document.getElementById("municipio").value = '';
                                                                                                                                                      }}>Enviar</button>

            <button className="w-full h-10 px-0 py-0 mb-6 font-bold text-white bg-pink-700 rounded hover:bg-pink-500" type="submit" onClick={redirectToLoginPage}>Sair</button>
        </div>
            <div className="flex flex-col">
              <span className="bg-yellow-300">
                {stateStatus.status}
              </span>
            </div>
        </main>
      </div>
    </Layout>
    )
}
        