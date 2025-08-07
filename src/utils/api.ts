import axios from 'axios';

const api = axios.create({
  baseURL: 'https://server-m1hy.onrender.com, //
});

// ✅ Updated to POST with full assessment data
export const downloadReport = async ({
  name,
  subject,
  score,
  maxScore,
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
  const response = await api.post(
    '/api/download-report',
    {
      name,
      subject,
      score,
      maxScore,
      grade,
      date,
    },
    {
      responseType: 'blob',
    }
  );
  return response.data;
};

export default api;

export const fetchAssessments = async (token: string) => {
  return api.get('/assessments', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const submitFeedback = async (data: any) => {
  try {
    const response = await axios.post('/api/feedback', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
