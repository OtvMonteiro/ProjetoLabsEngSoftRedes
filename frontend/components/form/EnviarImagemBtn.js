import Cookies from 'js-cookie'
import Router from 'next/router'

const EnviarImagemBtn = () => {
  const redirectToEnviarImagemPage = () => {
    Router.push('/enviar_imagem') //redireciona para a tela de enviar imagem.
  }
  return (
    <button
      onClick={redirectToEnviarImagemPage}
      className="w-full h-10 px-0 py-0 mb-6 font-bold text-white bg-blue-700 rounded hover:bg-blue-500"
    >
      Enviar Imagem
    </button>
  )
}

export default EnviarImagemBtn
