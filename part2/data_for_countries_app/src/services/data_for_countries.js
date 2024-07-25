import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
	console.log("About to send GET request")
	return axios.get(`${baseUrl}/all`)
}

const getCountry = (name) => {
	return axios.get(`${baseUrl}/name/${name}`)
}

export default { getAll, getCountry }