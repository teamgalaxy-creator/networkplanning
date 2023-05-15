import axios from "axios";
import appConfig from "./config/appConfig";

const api = axios.create({
    baseURL: appConfig.backendUrl,
});

export default api;

const routes = {
    auth : "/auth",
    district : "/district",
    dashboard : "/dashboard",
    style : "/style",
    tiles : "/tiles",
}
export const AuthAttributes = ["username","email","userRole","password"]
export const getAuth = () => api.get(`${routes.auth}/`)
export const postAuth = (email,password) => api.post(`${routes.auth}/`,{email,password})
export const refreshAuth = (refreshToken) => api.post(`${routes.auth}/refresh`,{refreshToken})
export const postAuthRegister = (email,password,firstname,userRole) => api.post(`${routes.auth}/register`)
export const getDistrictById = () => api.get(`${routes.district}/${id}`)
export const getMaterialCountByDistrictId = (districtId) => api.get(`${routes.dashboard}/materialCount/${districtId}`)
export const getCostInfoByDistrictId = (districtId) => api.get(`${routes.dashboard}/costInfo/${districtId}`)
export const postStyle = () => api.post(`${routes.style}/`)
export const getTiles = () => api.get(`${routes.tiles}/`)
export const getAddressPointStatus = (districtId) => api.get(`/address/${districtId}`)
export const getPhotos = (districtId) => api.get(`/photo/${districtId}`)
export const getGPXList = (districtId) => api.get(`/gpx/list/${districtId}`)
export const getGPX = (gpxId) => api.get(`/gpx/${gpxId}`)
export const getAddressPointCount = (districtId) => api.get(`/address/count/${districtId}`)
export const getnetzplanning = (districtId) => api.get(`/netzplanning/${districtId}`)
export const getDistrictPhase = () => api.get(`/DistrictPhase`)
export const postAddressPoint = (districtId,data) => api.post(`/address/new/${districtId}`,data)
export const getAddressPointDetails = (districtId,pointId) => api.get(`/address/single/${districtId}/${pointId}`)
export const updateAddressPoint = (districtId,pointId,data) => api.post(`/address/update/${districtId}/${pointId}`,data)

export const getUsers = () => api.get(`/users`)
export const createUser = (data) => api.post(`/users`,data)
export const deleteUser = (id) => api.delete(`/users/${id}`)
export const editUser = (id,data) => api.patch(`/users/${id}`,data)

export const getPermissions = () => api.get(`/permissions`)
export const createPermission = (data,title) => api.post(`/permissions/${title}`,data)
export const deletePermission = (id) => api.delete(`/permissions/${id}`)
export const editPermission = (id,data) => api.patch(`/permissions/${id}`,data)

export const getRoles = () => api.get(`/roles`)
export const createRole = (data) => api.post(`/roles`,data)
export const deleteRole = (id) => api.delete(`/roles/${id}`)
export const editRole = (id,data) => api.put(`/roles/${id}`,data)