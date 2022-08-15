import fetch from 'auth/FetchInterceptor'
import axios from 'axios'
import { API_BASE_URL } from 'configs/AppConfig'

const JwtAuthService = {}

/*
JwtAuthService.login = function (data) {
	return fetch({
		url: '/auth/login/',
		method: 'POST',
		headers: {
		  'public-request': 'true'
    	},
		data: data
	})
}
*/

JwtAuthService.login = async (credentials) => {
	try {
		const response = await axios.post(`${API_BASE_URL}/users/login/`, credentials)
		console.log(response.data)
    	return response
	} catch (error) {
		console.log("Error occured", error)
	}
    
        
}

/*
JwtAuthService.signUp = function (data) {
	return fetch({
		url: '/auth/signup',
		method: 'post',
		headers: {
		'content-type': 'application/json'
    },
		data: data
	})
}
*/

JwtAuthService.signUp = async (data) => {
	try{
		const response = await axios.post(`${API_BASE_URL}/users/register/`, data)
		return response
	} catch (error){
		console.log("Error occured", error)
		return error
	}
	
}

export default JwtAuthService