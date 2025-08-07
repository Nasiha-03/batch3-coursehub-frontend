import axios from 'axios';

const api = axios.create({
  baseURL: 'https://server-m1hy.onrender.com', 
});

// ✅ Download Report Function
export const downloadReport = async ({
  name,
  subject,
  score,
  grade,
  date,
}: {
  name: string;
  subject: string;
  score: number;
  maxScore: number;
  grade: string;
  date: string;
}) => {
  const generatedOn = new Date().toLocaleString();
  const response = await api.post(
    '/api/download-report',
    {
      name,
      subject,
      score,
      grade,
      date,
      generatedOn,
    },
    {
      responseType: 'blob',
    }
  );
  return response.data;
};

// ✅ Fetch Assessments with Auth Token
export const fetchAssessments = async (token: string) => {
  return api.get('/assessments', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ Submit Feedback using backend URL
export const submitFeedback = async (data: any) => {
  try {
    const response = await api.post('/api/feedback', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
