import { useState } from 'react'
import axios from 'axios'

export default function UploadImage() {
    const [stateUploadImage,setstateUploadImage] = useState({
        selectedFile: null
    })

    let formdata = new FormData()
    
    var imagefile

    const onSelectFile = event => {
        console.log("corrected inputed image files");
        console.log(event.target.files);
        setstateUploadImage({selectedFile: event.target.files})
        formdata.append('imagem', event.target.files)
        imagefile = event.target.files
    }

    const onUploadHandler = async event => {
        console.log("upload image files");

        // let formdata = new FormData()
        // formdata.append('imagem', stateUploadImage)

        // axios({
        //     url: '/upload',
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     data: 'hello world'
        // })
        
        axios.post('http://localhost:5000/api/upload', {
            // data: formdata
            imagem: imagefile
        }).then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });

    }
    
    return (
        <div>
            <input type="file" onChange={onSelectFile} multiple></input>
            <button type="submit" onClick={onUploadHandler}>Enviar</button>
        </div>
        
        // <form onSubmit={onUploadHandler} method="POST">
        //     <label htmlFor="imageFiles"></label>            
        //     <input type="file" onChange={onSelectFile} multiple></input>
        //     <button type="submit" onClick={onUploadHandler}>Enviar</button>
        // </form>
    )
}
