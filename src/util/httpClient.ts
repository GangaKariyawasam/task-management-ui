import axios, { AxiosResponse } from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:8080/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const handleResponse = (response: AxiosResponse, errorFunction: Function | undefined, successFunction: Function | undefined) => {
    if(response.status === 200 || response.status === 201) {
        if(successFunction) {
            return successFunction(response.data);
        }
    } else if(errorFunction) {
        return errorFunction(response.data);
    }
}

export default httpClient;
