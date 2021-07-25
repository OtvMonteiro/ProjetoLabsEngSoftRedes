import Cookies from 'js-cookie'
import Router from 'next/router'

const LayoutListaCampos = (nomes_campos, campos_digitados) => {
  
  var lista = new Array(nomes_campos.length)
  for (let i = 0; i < nomes_campos.length; i++) {
    lista[i] = nomes_campos[i] + ': '+ campos_digitados[i];
  }
  return (
    <div>
      {lista.map((item, i) => <div key={i}>{item}</div>)}
    </div>
  )
}

export default LayoutListaCampos
