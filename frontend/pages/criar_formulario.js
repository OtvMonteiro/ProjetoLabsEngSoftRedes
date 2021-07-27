import React, { useState } from 'react'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import SaveAlt from '@material-ui/icons/SaveAlt'
import { v4 as uuidv4 } from 'uuid'
import { makeStyles } from '@material-ui/core/styles'
import Cookies from 'js-cookie'
import Router from 'next/router'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
    width: 150,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  buttonLogout: {
    margin: theme.spacing(1),
    width: 100,
    backgroundColor: theme.palette.secondary.main,
  },
  table: {
    maxWidth: 400,
  },
  firstRow: {
    backgroundColor: theme.palette.success.main,
  },
  cell: {
    color: theme.palette.common.white,
  },
}))

function App() {
  const classes = useStyles()
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), nomeCampo: '' },
  ]);

  const [recuperarButton, setRecuperarButton] = useState(Number(Cookies.get('existeFormulario')));

  // Criar o formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Imprime os campos desejados pelo usuário
    // for (let i=0; i<inputFields.length; i++){
    //   console.log(inputFields[i].nomeCampo);
    // }

    let camposJSON = JSON.stringify(inputFields);
    axios.post("http://localhost:5000/api/create_form", {
      'camposJSON': camposJSON,
      'nomeMunicipio': Cookies.get('nomeDoUsuario')
    }).then(response => {
      if (Number(Cookies.get('existeFormulario')) != 0) {
        setRecuperarButton(Number(Cookies.set('existeFormulario', 0)))
      }
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

  const handleSubmitRecuperar = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/api/recover_form", {
      'nomeMunicipio': Cookies.get('nomeDoUsuario')
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
  }

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

  const redirectToLoginPage = () => {
    Cookies.remove('token')
    Cookies.remove('nomeDoUsuario')
    Cookies.remove('existeFormulario')
    Cookies.remove('camposObrigatorios')
    Router.push('/') //redireciona para a tela de cadastro.
  }

  // Funções para criação da tabela
  function createData(nomeCampoObrigatorio) {
    return { nomeCampoObrigatorio };
  }

  // Dados Obrigatórios
  let dadosObrigatorios
  if (Cookies.get('camposObrigatorios') == undefined) {
    dadosObrigatorios = ["Nome","CPF","RG","Lote","Data de Aplicação"]
  }
  else {
    dadosObrigatorios = JSON.parse(Cookies.get('camposObrigatorios'))
  } 

  const rows = [];

  for (let i = 0; i < dadosObrigatorios.length; i++) {
    rows.push(createData(dadosObrigatorios[i]))
  }

  let numeroCampoAdicionais = 11 - dadosObrigatorios.length

  return (
    <Container>
      <center>
        <br></br>
        <Typography variant="h4" component="h2" className="text-green-500">
          <b>Criar formulário</b>
        </Typography>
        <Typography component="h2">
          <br></br>
          Abaixo estão presentes as informações obrigatórias exigidas pela Secretaria Estadual de Saúde. 
          Elas serão automaticamente incorporadas ao seu formulários.
          <br></br><br></br>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow className={classes.firstRow}>
                <TableCell className={classes.cell} align="center"><b>Nome do Campo Obrigatório</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.nomeCampoObrigatorio}>
                  <TableCell component="th" scope="row" align="center">
                    {row.nomeCampoObrigatorio}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <br></br>
          Sinta-se a vontade para adicionar campos da maneira que desejar, são permitidos no máximo <b>{numeroCampoAdicionais} campos adicionais</b> de dados em um formulário.
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
              <IconButton disabled={inputFields.length === numeroCampoAdicionais}
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
        </form>
        <Button
          className={classes.button}
          disabled={Boolean(recuperarButton)}
          variant="contained" 
          color="primary"
          type="submit" 
          startIcon={<SaveAlt></SaveAlt>}
          onClick={handleSubmitRecuperar}
        >Recuperar</Button>
        <br></br>
        <Button
          className={classes.buttonLogout}
          variant="contained" 
          color="secondary"
          type="submit"
          startIcon={<ExitToAppIcon></ExitToAppIcon>}
          onClick={redirectToLoginPage}
        >Sair</Button>
      </center>
    </Container>
  );
}

export default App;