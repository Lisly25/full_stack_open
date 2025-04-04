import axios from 'axios'
const baseUrl = '/api/login'

const loginService = (username, password) => {
    const request = axios.post(baseUrl, {username: username, password: password})
    return request.then(response => response.data)
}

export default loginService