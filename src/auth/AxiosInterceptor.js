import axios from "axios";
import { API_BASE_URL } from 'configs/AppConfig'
import { message  } from 'antd' 
import dayjs from 'dayjs'
import jwt_decode from 'jwt-decode'
import {Redirect} from 'react-router-dom'
import { AUTH_PREFIX_PATH } from 'configs/AppConfig';
import { signOut } from "redux/sagas/Auth";
import { connect } from 'react-redux'


let userToken = localStorage.getItem('auth_token')
let refreshToken = localStorage.getItem('refresh')

export const myAxios = axios.create({});


myAxios.interceptors.request.use(async req => {
    if(!userToken){
        userToken = localStorage.getItem('auth_token') 
        req.headers.Authorization = `JWT ${userToken}`
    }

    console.log("interceptor ran!")

    const user = jwt_decode(userToken)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if(!isExpired) return req


    const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
        refresh: refreshToken
      });

    console.log('refresh ran!')

    localStorage.setItem('auth_token', JSON.stringify(response.data.access))
    req.headers.Authorization = `JWT ${response.data.access}`
    return req
})

myAxios.interceptors.response.use(async resp => {
        return resp
    },(error) => {
        localStorage.removeItem('refresh')
        localStorage.removeItem('auth_token')
        signOut();

    }

)

export default connect(null, {signOut})(myAxios)
