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
      ]
    },
}