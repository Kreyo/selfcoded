import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchData = async () => {
  return axios.get(apiUrl)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching the file tree:', error);
    });
}