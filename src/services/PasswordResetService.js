import axios from 'axios'
import { myAxios } from 'auth/AxiosInterceptor'
import { API_BASE_URL } from 'configs/AppConfig'


let token = null

const setToken = (userToken) => {
    token = `JWT ${userToken}`
	//token = `Bearer ${userToken}`
}

const resetPass = async (data) => {
    
    try{
        const response = await axios.post(`${API_BASE_URL}/auth/users/reset_password/`, data)
        return response.data
    }catch(error){
        return error
    }
    
}



const confirmResetPass = async (data) => {
    
    try{
        const response = await axios.post(`${API_BASE_URL}/auth/users/reset_password_confirm/`, data)
        return response.data
    }catch(error){
        return error
    }
    
}

// SET PASSWORD

const setPass = async (data) => {
    const config = {
        headers: {Authorization: token }
    }
    
    try{
        const response = await myAxios.post(`${API_BASE_URL}/auth/users/set_password/`, data, config)
        console.log(response.data)
        return response.data
    }catch(error){
        return error
    }
    
}




export default {setToken, resetPass, confirmResetPass, setPass}