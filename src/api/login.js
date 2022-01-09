import { request } from '@/utils/request'

export const login = (data) => {
    return request({
        url: '/api/login',
        method: 'POST',
        data
    })
}

export const logout = (data) => {
    return request({
        url: '/api/logout',
        method: 'POST',
        data
    })
}

export const getUserInfo = (data) =>  {
    return request({
        url: '/api/userInfo/get',
        method: 'POST',
        data
    })
}