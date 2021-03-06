import Layout from '../components/layout/Layout'
import LoginForm from '../components/form/LoginForm'
// import CreateAccountBtn from '../components/form/CreateAccountBtn'
import { FORM_LOGIN_DATA } from '../components/schemas/forms'
import { useState } from 'react'
import Cookies from 'js-cookie'
import Router from 'next/router'
import Image from 'next/image'


export default function LoginPage() {
  const [stateFormData, setStateFormData] = useState(FORM_LOGIN_DATA) // estado com os dados do formulário
  const [stateFormError, setStateFormError] = useState([]) // estado para armezar os erros
  const [stateFormValid, setStateFormValid] = useState(false) // o estado inicial da validez do formulário é false
  const [loading, setLoading] = useState(false) // inicializa com false o estado da variável loading
  const [stateFormMessage, setStateFormMessage] = useState({}) // inicializa com vazia o objeto mensagem (que é apresentado embaixo do botão "enviar")
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  function onChangeHandler(e) {
    const { name, value } = e.currentTarget // recupera os valores

    setStateFormData({
      ...stateFormData,
      [name]: {
        ...stateFormData[name],
        value,
      },
    })
  }
  async function onSubmitHandler(e) {
    e.preventDefault() // esta linha impede que o formulário seja enviado sem
    let data = { ...stateFormData }

    /* Aqui filtramos o conteúdo do stateFormData para que apenas os atributos username e 
    password sejam passados para o endpoint 
    */
    data = { ...data, username: data.username.value || '' }
    /* password */
    data = { ...data, password: data.password.value || '' }
    /* tipo */
    data = { ...data, tipo: data.tipo.value || '' }

    const isValid = true // por agora, será considerado que o formulário sempre é válido
    if (isValid) {
      // Call an external API endpoint to get posts.
      // You can use any data fetching library
      setLoading(!loading)
      // não esquecer de configurar o CORS no backend!
      // a seguinte linha acessa a api 'login' do front-end
      const registerApi = await fetch(BASE_URL + '/api/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).catch((error) => {
        console.error('Error:', error)
      })
      let result = await registerApi.json()
      if (result.success && result.token) {
        Cookies.set('token', result.token)
        Cookies.set('nomeDoUsuario', result.username)
        
        if (result.tipo == 1) {
          Cookies.set('existeFormulario', result.existeFormulario)
          Cookies.set('camposObrigatorios', result.camposObrigatorios)
          Router.push('/criar_formulario') //redireciona para a tela de criação de formulário
        }
        else if (result.tipo == 2) {
          Router.push('/image_upload') //redireciona para a tela de uplado de imagem
        }
        else {
          Router.push('/digitacao') //redireciona para a tela de digitação
        }        
      } else {
        setStateFormMessage(result)
      }
      setLoading(false)
    }
  }

  return (
    <Layout title={'Login'}>
      <Image className="flex"
        src="/logoVivaForms.png"
        alt="Logo VivaForms"
        width="300"
        height="76"
      ></Image>
      <br></br>
      <br></br>
      <br></br>
      <div className="flex flex-col">
        <LoginForm
          props={{
            onSubmitHandler,
            onChangeHandler,
            loading,
            stateFormData,
            stateFormError,
            stateFormMessage,
          }}
        />
      </div>
    </Layout>
  )
}
