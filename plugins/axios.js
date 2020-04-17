export default function({ $axios, redirect, store }) {
  $axios.onRequest((config) => {
    console.log('Making request to ', config)
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      store.dispatch('user/logOut')
      redirect('/login')
    }
  })

  const token = store.getters.isAuthenticated
  if (token) {
    $axios.setToken(token, 'Bearer')
  }
  $axios.setBaseURL(process.env.API_BASE_URL)

  // $axios.setHeader('Authorization', '123')
}
