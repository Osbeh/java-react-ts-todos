import { apiClient } from "./ApiClient"

export const executeBasicAuhtenticationService = (token:string) => {
    return apiClient.get(`/basicauth`, {
         headers: {
             Authorization: token
         }
     })
 
 }

 export const executeJwtAuthentication = (username:string, password:string) => {
    return apiClient.post('/authenticate', {username, password})
 }