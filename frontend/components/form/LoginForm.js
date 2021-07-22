function LoginForm({ props }) {
  const {
    onSubmitHandler,
    onChangeHandler,
    stateFormData,
    stateFormError,
    stateFormMessage,
  } = props
  return (
    <form onSubmit={onSubmitHandler} method="POST">
      <div>
        <label className="block mb-auto text-indigo-500 " htmlFor="username">
          Usuário
        </label>
        <input
          className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-100"
          type="text"
          name="username"
          value={stateFormData.username.value}
          onChange={onChangeHandler}
        ></input>
      </div>
      <div>
        <label className="block mb-2 text-indigo-500" htmlFor="password">
          {' '}
          Senha
        </label>
        <input
          className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-100"
          type="password"
          name="password"
          value={stateFormData.password.value}
          onChange={onChangeHandler}
        ></input>
      </div>
      <div>
        <center>
          <table>
            <tr>
              <th width="200">
                <label>
                  Criar<br></br>
                  <input type="radio" name="tipo" value={1} onChange={onChangeHandler}></input><br></br>
                </label>
              </th>
              <th width="200">
                <label>
                  Enviar<br></br>
                  <input type="radio" name="tipo" value={2} onChange={onChangeHandler}></input><br></br>
                </label>
              </th>
              <th width="200">
                <label>
                  Digitar<br></br>
                  <input type="radio" name="tipo" value={3} onChange={onChangeHandler}></input><br></br>
                </label>
              </th>
            </tr>
          </table>
        </center>
      </div>
      <br></br>
      <div>
        <input
          className="w-full px-4 py-2 mb-6 font-bold text-white bg-blue-700 rounded hover:bg-blue-500"
          type="submit"
          value="Logar"
        ></input>
      </div>
      <div>
        <span className="bg-yellow-200">{stateFormMessage.message}</span>
      </div>
    </form>
  )
}
export default LoginForm