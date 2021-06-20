import Cookies from 'js-cookie'
import Router from 'next/router'

const LoginDigitarBtn = () => {
  const redirectToDigitacaoPage = () => {
    Router.push('/digitacao') //redireciona para a tela de Digitação.
  }
  return (
    <button
      onClick={redirectToDigitacaoPage}
      className="w-full h-10 px-0 py-0 mb-6 font-bold text-white bg-red-700 rounded hover:bg-red-500"
    >
      Login - Digitação
    </button>
  )
}

export default LoginDigitarBtn
