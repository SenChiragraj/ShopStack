import api from 'axios';

api.defaults.baseURL = "http://localhost:8000/";



const SetHeader = () => {
  // const { token } = useContext(TokenContext);
  const token = localStorage.getItem('authToken');
  if (token.token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
    }
}

export const GetData = async (endPoint, options) => {
  SetHeader();
  const response = await api.get(endPoint, options);
  return response
}

export const PostData = async (endPoint, options) => {
  SetHeader();
  const response = await api.post(endPoint, options);
  return response
}

export const PutData = async (endPoint, options) => {

  SetHeader();
  const response = await api.put(endPoint, options);
  return response
}

export const DeleteData = async (endPoint) => {
  SetHeader();
  const response = await api.delete(endPoint);
  return response
}
