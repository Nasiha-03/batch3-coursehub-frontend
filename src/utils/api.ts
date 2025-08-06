import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL, // Backend URL
  withCredentials: true,
});

export const downloadReport = async (reportData: any) => {
  const token = localStorage.getItem('token');
  return api.post('/api/download-report', reportData, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'blob',
  });
};
