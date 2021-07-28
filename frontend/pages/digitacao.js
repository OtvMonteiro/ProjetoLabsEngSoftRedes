import React, { useState, useEffect, Component } from 'react';
import ReactDOM from "react-dom";
import Link from 'next/link'
import LayoutCriarFormulario from '../components/layout/LayoutCriarFormulario'
import LayoutListaCampos from '../components/form/LayoutListaCampos'
import { getAppCookies, verifyToken } from '../utilities/util'
import Image from 'next/image'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Cookies from 'js-cookie'


class Digitacao extends Component {
  
  state = {}

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  async componentDidMount() {
    // StatusBar.setNetworkActivityIndicatorVisible(true)
    const response = await axios.post('http://192.168.15.101:5000/api/load_digitacao', {'nome_digitador': Cookies.get('nomeDoUsuario')});
    const erro = await response['data']['erro']
    const message = await response['data']['message']
    if (erro){
      await this.setStateAsync({
        message: message,
        erro: erro,
        })
    } else{
      const image_data = await response['data']['image_data'];
      const nome_campo = await response['data']['nome_campo']
      const num_campo = await response['data']['num_campo']
      const total_campos = await response['data']['total_campos']
      const nomes_campos = await response['data']['nomes_campos'];
      const campos_digitados = await response['data']['campos_digitados']
      const nome_municipio = await response['data']['nome_municipio']
      var lista = 0
      if (nomes_campos && campos_digitados){lista = LayoutListaCampos(nomes_campos, campos_digitados)}
      const finalizada = await response['data']['finalizada']
      await this.setStateAsync({image: image_data,
                                nome_campo: nome_campo,
                                num_campo: num_campo,
                                total_campos: total_campos,
                                nome_municipio: nome_municipio,
                                finalizada: finalizada, 
                                lista: lista, 
                                nome_municipio: nome_municipio})
    }
    
    // StatusBar.setNetworkActivityIndicatorVisible(false)
  }

  async onSubmitHandler(campo_text) {
    await this.setState({campo_digitado: campo_text})
    // console.log(campo_text)
    // console.log(this.state)

    // var formdata = new FormData()
    // formdata.append('campo_text', campo_text)
    var request = {'campo_info': this.state,
                   'campo_text': campo_text,
                   'nome_digitador': Cookies.get('nomeDoUsuario')
                  }
    var formdata = JSON.stringify(request)
    // console.log(campo_text)
    // Inserir lógica para adicionar ao formdata texto digitado do campo

    const post_response = await axios.post('http://192.168.15.101:5000/api/continue_digitacao', {formdata})
     
      const erro = await post_response['data']['erro']
      const message = await post_response['data']['message']
      if (erro){
        await this.setStateAsync({
          message: message,
          erro: erro,
          })
      } else{
      const finalizada = await post_response['data']['finalizada']
      const nome_municipio = await post_response['data']['nome_municipio']
      if (finalizada){
        const nomes_campos = await post_response['data']['nomes_campos'];
        const campos_digitados = await post_response['data']['campos_digitados']
        const lista = LayoutListaCampos(nomes_campos, campos_digitados)
        await this.setStateAsync({finalizada: true, 
                                  lista: lista, 
                                  nome_municipio: nome_municipio})
        return
      }
      const image_data = await post_response['data']['image_data'];
      const nome_campo = await post_response['data']['nome_campo']
      const num_campo = await post_response['data']['num_campo']
      const total_campos = await post_response['data']['total_campos']
      await this.setStateAsync({image: image_data,
                                nome_campo: nome_campo,
                                num_campo: num_campo,
                                total_campos: total_campos,
                                nome_municipio: nome_municipio})

  }}

  render() {

    if (this.state.erro){
      return (
        <LayoutCriarFormulario title="Digitação">
          <div className="container">
            <main>
              <section>
            <div>
              {this.state.message}
            </div>
            </section>
            </main>
          </div>
        </LayoutCriarFormulario>
      )
    }

    if (this.state.finalizada) {
      return (
        <LayoutCriarFormulario title="Digitação">
          <div className="container">
            <main>
              <section>
              <div>
                  <label><b>Cidade: {this.state.nome_municipio}</b></label>
                  </div>
            <div>
            <label><b>{'Formulário digitado!'}</b></label>
            <div>
            {this.state.lista}              
            </div>
            </div>
            </section>
            </main>
          </div>
        </LayoutCriarFormulario>
      )
    }
    if (!this.state.image) {
      return (
        <LayoutCriarFormulario title="Digitação">
          <div className="container">
            <main>
              <section>
            <div>
              {'Carregando...'}
            </div>
            </section>
            </main>
          </div>
        </LayoutCriarFormulario>
      )
    }
    return (
          <LayoutCriarFormulario title="Digitação">
            <div className="container">
              <main>
                <section className="main" >
                  <div>
                  <label><b>Cidade: {this.state.nome_municipio}</b></label>
                  </div>
              <div>
                <Image src={this.state.image}  
                       width={1469} height={169}></Image>
                <div>
                  <label><b>{(parseInt(this.state.num_campo)+1)+'/'+this.state.total_campos+' '}{this.state.nome_campo}:</b> </label>
                  <Input id="input_campo"  type="text" placeholder="Digite aqui o texto da imagem acima"/>
                </div>
              </div>
              <Button onClick={() => {this.onSubmitHandler(document.getElementById("input_campo").value); document.getElementById("input_campo").value = ''}} >Enviar</Button>
              </section>
              {/* </form> */}
              </main>
            </div>
          </LayoutCriarFormulario>
        )
  }
}

export default Digitacao

