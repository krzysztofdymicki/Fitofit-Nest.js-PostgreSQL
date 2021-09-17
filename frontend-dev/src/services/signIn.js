import axios from 'axios'

const url = 'http://localhost:3001/users/signin'

const signIn = async (credentials) => {
  const response = await axios.post(url, credentials)
  return response.data
}

export default {
  signIn,
}
