import axios from 'axios'
import { API_BASE_URL } from 'configs/AppConfig'
import myAxios from 'auth/AxiosInterceptor'


let token = null

const setToken = (userToken) => {
    //token = `JWT ${userToken}`
    
	token = `Bearer ${localStorage.getItem("auth_token")}`
}

const netSecProtect = async () => {
    const config = {
        headers: {Authorization: token }
    }

    const data = {cmd:"start"}

    try{
        const response = await axios.post(`${API_BASE_URL}/sec-actions/status`, data, config)
        return response.data
    }catch(error){
        console.log("error occured", error)
    }
    
}

const netSecAlerts = async () => {
    const config = {
        headers: {Authorization: token }
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/sec-actions/alerts`, config)
        return response.data
    } catch (error) {
        console.log("error occured", error)
    }
}







export default {setToken, netSecProtect, netSecAlerts}