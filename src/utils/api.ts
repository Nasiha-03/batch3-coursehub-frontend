export const downloadReport = async (reportData: any) => {
  const token = localStorage.getItem('token');
  return api.post('/api/download-report', reportData, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'blob',
  });
};

export const fetchAssessments = async (token: string) => {
  return api.get('/api/assessments', {
    headers: { Authorization: `Bearer ${token}` },
  });
};
