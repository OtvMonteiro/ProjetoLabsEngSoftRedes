import { useState } from 'react'
import axios from 'axios'

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
