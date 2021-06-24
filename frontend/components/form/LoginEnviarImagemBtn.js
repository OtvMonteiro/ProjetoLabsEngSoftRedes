import Cookies from 'js-cookie'
import Router from 'next/router'

const LoginEnviarImagemBtn = () => {
  const redirectToEnviarImagemPage = () => {
    Router.push('/image_upload') //redireciona para a tela de Enviar Imagem.
  }
  return (
    <button
      onClick={redirectToEnviarImagemPage}
      className="w-full h-10 px-0 py-0 mb-6 font-bold text-white bg-blue-700 rounded hover:bg-blue-500"
    >
      Login - Enviar Imagem
    </button>
  )
}

export default LoginEnviarImagemBtn
