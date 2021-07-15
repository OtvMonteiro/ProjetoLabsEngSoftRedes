module.exports = {
    async rewrites() {
      return [
        {
          source: '/carregar',
          destination: 'https://projetolabsengsoftredes-otvmonteiro.cloud.okteto.net/api/upload',
        },
      ]
    },
}