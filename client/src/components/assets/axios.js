import api from 'axios';


api.defaults.baseURL = "http://localhost:8000/";

const setHeader = () => {
    const token = localStorage.getItem('token');
    if(token){
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
}

export const GetData = async (endPoint, options) => {
  setHeader();
  const response = await api.get(endPoint, options);
  return response
}

export const PostData = async (endPoint, options) => {
  setHeader();
  const response = await api.post(endPoint, options);
  return response
}

export const PutData = async (endPoint, options) => {

  setHeader();
  const response = await api.put(endPoint, options);
  return response
}

export const DeleteData = async (endPoint) => {
  setHeader();
  const response = await api.delete(endPoint);
  return response
}