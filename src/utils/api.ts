import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  withCredentials: true,
});

export const downloadReport = async (reportData: any) => {
  const token = localStorage.getItem('token');
  return api.post('/download-report', reportData, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'blob',
  });
};

export const fetchAssessments = async (token: string): Promise<any> => {
  return api.get('/assessments', {
    headers: { Authorization: `Bearer ${token}` },
  });
};
