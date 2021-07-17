import React, { useState } from 'react'
import axios from 'axios'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import SaveAlt from '@material-ui/icons/SaveAlt';
import { v4 as uuidv4 } from 'uuid';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  }
}))

function App() {
  const classes = useStyles()
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), nomeCampo: 'Nome' },
    { id: uuidv4(), nomeCampo: 'CPF' },
    { id: uuidv4(), nomeCampo: 'RG' },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // for (let i=0; i<inputFields.length; i++){
    //   console.log(inputFields[i].nomeCampo);
    // }

    let camposJSON = JSON.stringify(inputFields);

    // axios.post("http://localhost:5000/api/create_form", {
    axios.post('/campos', {
      camposJSON
    }).then(response => {
      //Create a Blob from the PDF Stream
          const file = new Blob(
            [response.data], 
            {type: 'application/pdf'});
      //Build a URL from the file
          const fileURL = URL.createObjectURL(file);
      //Open the URL on new Window
          window.open(fileURL);
      })
      .catch(error => {
          console.log(error);
      });

  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    
    setInputFields(newInputFields);
  }

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(), nomeCampo: '' }])
  }

  const handleRemoveFields = id => {
    const values  = [...inputFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFields(values);
  }

  return (
    <Container>
      <center>
        <br></br>
        <Typography variant="h4" component="h2">
          <b>Criar formulário</b>
        </Typography>
        <Typography variant="h7" component="h2">
          <br></br>
          Abaixo estão presentes algumas informações importantes para a Secretaria Estadual de Saúde.
          <br></br>
          Sinta-se a vontade para adicionar ou excluir campos da maneira que desejar, são permitidos no máximo <b>11 campos</b> de dados em um formulário.
          <br></br><br></br>
        </Typography>
        <form className={classes.root} onSubmit={handleSubmit}>
          { inputFields.map(inputField => (
            <div key={inputField.id}>
              <TextField
                name="nomeCampo"
                label="Nome do Campo"
                variant="filled"
                value={inputField.nomeCampo}
                onChange={event => handleChangeInput(inputField.id, event)}
              />
              <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                <RemoveIcon />
              </IconButton>
              <IconButton disabled={inputFields.length === 11}
                onClick={handleAddFields}
              >
                <AddIcon />
              </IconButton>
            </div>
          )) }
          <Button
            className={classes.button}
            variant="contained" 
            color="primary"
            type="submit" 
            startIcon={<PictureAsPdfIcon></PictureAsPdfIcon>}
            onClick={handleSubmit}
          >Gerar PDF</Button>
          <Button
            className={classes.button}
            disabled={1} // TODO botão de recuparar formulário existente
            variant="contained" 
            color="primary"
            type="submit" 
            startIcon={<SaveAlt></SaveAlt>}
            //onClick={}
          >Recuperar</Button>
        </form>
      </center>
    </Container>
  );
}

export default App;