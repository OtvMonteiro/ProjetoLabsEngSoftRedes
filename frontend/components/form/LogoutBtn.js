import Cookies from 'js-cookie'
import Router from 'next/router'
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const LogoutBtn = () => {
  const redirectToLoginPage = () => {
    Cookies.remove('token')
    Cookies.remove('nomeDoUsuario')
    Cookies.remove('existeFormulario')
    Router.push('/') //redireciona para a tela de cadastro.
  }
  return (
    <Button
      // className={classes.button}
      variant="contained" 
      color="secondary"
      type="submit"
      startIcon={<ExitToAppIcon></ExitToAppIcon>}
      onClick={redirectToLoginPage}
    >Sair</Button>
  )
}

export default LogoutBtn
