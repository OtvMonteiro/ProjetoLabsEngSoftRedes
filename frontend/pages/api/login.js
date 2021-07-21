import axios from 'axios'

const urlApi = process.env.URL_API_BACKEND

const login = async (req, res) => {
  const { method } = req
  console.log(urlApi, 'api da url?')
  switch (method) {
    case 'POST':
      const { username, password, tipo } = req.body
      if (!username || !password) {
        return res.status(400).json({
          success: 'false',
          message: 'Faltou enviar o usuário ou a senha',
        })
      }
      try {
        const resposta = await axios.post(`${urlApi}/login`, {
          username: username,
          password: password,
          tipo: tipo,
        })

        const token = resposta.data.access_token
        return res.status(200).json({
          success: true,
          token: token,
          tipo: resposta.data.tipo,
          username: resposta.data.username,
          existeFormulario: resposta.data.existeFormulario,
          message: 'Login realizado com sucesso',
        })
      } catch (e) {
        if (e.code == 'ECONNREFUSED') {
          return res.status(500).json({
            success: false,
            message:
              'ECONNREFUSED: Não é possível se conectar à API no backend!',
          })
        }

        if (e.response.status == 401) {
          return res.status(401).json({
            success: false,
            message: 'Credenciais Inválidas',
          })
        }
      }
  }
}
export default login
