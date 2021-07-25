module.exports = {
    async rewrites() {
      return [
        {
          source: '/carregar',
          destination: 'https://projetolabsengsoftredes-otvmonteiro.cloud.okteto.net/api/upload',
        },
        { // TODO lembra de modificar a /campos no axios
          source: '/campos',
          destination: 'https://projetolabsengsoftredes-otvmonteiro.cloud.okteto.net/api/create_form',
        },
        { // TODO lembra de modificar a /recuper no axios
          source: '/recuperar',
          destination: 'https://projetolabsengsoftredes-otvmonteiro.cloud.okteto.net/api/recover_form',
        },
        { // TODO lembra de modificar a /recuper no axios
          source: '/load_digitacao',
          destination: 'https://projetolabsengsoftredes-otvmonteiro.cloud.okteto.net/api/load_digitacao',
        },
        { // TODO lembra de modificar a /recuper no axios
          source: '/continue_digitacao',
          destination: 'https://projetolabsengsoftredes-otvmonteiro.cloud.okteto.net/api/continue_digitacao',
        },
      ]
    },
}