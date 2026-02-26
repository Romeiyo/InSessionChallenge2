import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.reponse.use(
    (response) => {
        return
    },
    (error) => {
        console.error('API Error:', error.message);
        return Promise.reject(error);
    }
);

export default apiClient;