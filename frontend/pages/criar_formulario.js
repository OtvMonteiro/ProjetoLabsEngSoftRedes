import React, { useState } from 'react'
//import Link from 'next/link'
//import LayoutCriarFormulario from '../components/layout/LayoutCriarFormulario'
//import { getAppCookies, verifyToken } from '../utilities/util'
//import Image from 'next/image'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
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
    { id: uuidv4(), nomeCampo: '' },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);
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

  // const handleAddFields = () => {
  //   setInputFields([...inputFields, { id: uuidv4(), nomeCampo: '' }])
  // }

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
      <h1 fontSize="large">Criar Formulário</h1>
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
            <IconButton disabled={inputFields.length === 4} onClick={() => handleRemoveFields(inputField.id)}>
              <RemoveIcon />
            </IconButton>
            <IconButton disabled={inputFields.length === 5}
              onClick={handleAddFields}
            >
              <AddIcon />
            </IconButton>
          </div>
        )) }
        <Button
          className={classes.button}
          variant="contained" 
          color="Primary"
          type="submit" 
          startIcon={<PictureAsPdfIcon></PictureAsPdfIcon>}
          onClick={handleSubmit}
        >Gerar PDF</Button>
      </form>
    </Container>
  );
}

export default App;