import axios from 'axios'
import { API_BASE_URL } from 'configs/AppConfig'
import myAxios from 'auth/AxiosInterceptor'


let token = null

const setToken = (userToken) => {
    token = `JWT ${userToken}`
	//token = `Bearer ${userToken}`
}

const getAll = async () => {
    const config = {
        headers: {Authorization: token }
    }
    try{
        const response = await myAxios.get(`${API_BASE_URL}/auth/users/`, config)
        return response.data
    }catch(error){
        console.log("error occured", error)
    }
    
}


const getCurrentUser = async () => {
    const config = {
        headers: {Authorization: token }
    }
    try{
        const response = await myAxios.get(`${API_BASE_URL}/auth/users/me/`, config)
        return response.data
    }catch(error){
        console.log("error occured", error)
    }
    
}

const getUser = async (id) => {
    const config = {
        headers: {Authorization: token }
    }
    try{
        const response = await myAxios.get(`${API_BASE_URL}/auth/user/${id}/`, config)
        return response.data
    }catch(error){
        console.log("error occured", error)
    }
    
}




export default {setToken, getAll, getCurrentUser, getUser}