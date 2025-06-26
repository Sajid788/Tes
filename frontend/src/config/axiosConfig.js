import axios from 'axios';


let baseURL;

if (import.meta.env.PROD) {
  baseURL = 'https://tes-g9jw.vercel.app';
} else {
  baseURL = ''; 
}

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient; 
