import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { getAppCookies, verifyToken } from '../utilities/util'
import Image from 'next/image'

export default function UploadImage() {
    const [stateUploadImage,setstateUploadImage] = useState({
        selectedFile: null
    })

    // let formdata = new FormData()
    

    const onSelectFile = event => {
        console.log("corrected inputed image files");
        console.log(event.target.files[0]);
        setstateUploadImage({selectedFile: event.target.files[0]})
        // formdata.append('imagem', event.target.files)
    }

    const onUploadHandler = async event => {
        console.log("upload image files");
        console.log(stateUploadImage['selectedFile'])

        var formdata = new FormData();
        formdata.append('imagem', stateUploadImage['selectedFile']);
        // formdata.append('cris', 'gistavo');
        // console.log('asdasd')
        console.log(formdata);

        // axios({
        //     url: '/upload',
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     data: 'hello world'
        // })
        
        // formdata.append("fileimage", imagefile.files[0]);

        axios.post("http://localhost:5000/api/upload", formdata, {
        headers: {
        "Content-Type": `multipart/form-data; boundary=${formdata._boundary}`,
        }
        }).then(response => console.log(response));

    }
    
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
        <div>
            <input className="w-full h-10 px-0 py-0 mb-6 font-bold text-white bg-blue-700 rounded hover:bg-blue-500" type="file" onChange={onSelectFile} multiple></input>
            <button className="w-full h-10 px-0 py-0 mb-6 font-bold text-white bg-blue-700 rounded hover:bg-blue-500" type="submit" onClick={onUploadHandler}>Enviar</button>
        </div>

        </main>
      </div>
    </Layout>
        // <form onSubmit={onUploadHandler} method="POST">
        //     <label htmlFor="imageFiles"></label>            
        //     <input type="file" onChange={onSelectFile} multiple></input>
        //     <button type="submit" onClick={onUploadHandler}>Enviar</button>
        // </form>
    )
}