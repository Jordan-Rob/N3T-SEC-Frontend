import { myAxios } from 'auth/AxiosInterceptor'
import { API_BASE_URL } from 'configs/AppConfig'


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
        const response = await myAxios.get(`${API_BASE_URL}/services/medical-declarations/`, config)
        return response.data
    }catch(error){
        console.log("error occured", error)
    }
    
}

const getMedicalDeclaration = async (id) => {
    const config = {
        headers: {Authorization: token}
    }

    try {
        const response = await myAxios.get(`${API_BASE_URL}/services/medical-declaration/${id}/`, config)
        return response.data 
    } catch (error) {
        console.log(error)
    }
}

const postMedicalDeclaration = async (data) => {
	const config = {
        headers: {Authorization: token}
    }

    try {
        const response = await myAxios.post(`${API_BASE_URL}/services/medical-declaration/new/`, data, config)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log("error occured", error.exception)
        return error
    }
}


const updateMedicalDeclaration = async (data, id) => {
    const config = {
        headers: {Authorization: token, /*'content-type': 'application/json-patch+json'*/}
    }

    try {
        const response = await myAxios.put(`${API_BASE_URL}/services/medical-declaration/update/${id}/`, data, config)
        return response.data
    } catch (error) {
        console.log("error occured", error)
    }
}

const deleteMedicalDeclaration = async (id) => {
    const config = {
        headers: {Authorization: token}
    }

    try {
        const response = await myAxios.delete(`${API_BASE_URL}/services/medical-declaration/delete/${id}/`, config)
        return response.data
    } catch (error) {
        console.log("error occured", error)
    }
}

export default {setToken, getAll, getMedicalDeclaration, postMedicalDeclaration, updateMedicalDeclaration, deleteMedicalDeclaration}