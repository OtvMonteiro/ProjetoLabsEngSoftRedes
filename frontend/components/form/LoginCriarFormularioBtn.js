import Cookies from 'js-cookie'
import Router from 'next/router'

const LoginCriarFormularioBtn = () => {
  const redirectToCriarFormularioPage = () => {
    Router.push('/criar_formulario') //redireciona para a tela de Criar Formulário.
  }
  return (
    <button
      onClick={redirectToCriarFormularioPage}
      className="w-full h-10 px-0 py-0 mb-6 font-bold text-white bg-green-700 rounded hover:bg-green-500"
    >
      Login - Criar Formulário
    </button>
  )
}

export default LoginCriarFormularioBtn
