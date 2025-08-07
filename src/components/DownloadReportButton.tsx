import React from 'react';
import { downloadReport } from '../utils/api';
import { FileDown } from 'lucide-react';

type DownloadReportButtonProps = {
  assessmentId: string;
};

const DownloadReportButton: React.FC<DownloadReportButtonProps> = ({ assessmentId }) => {
  const handleDownload = async () => {
    try {
      const blob = await downloadReport(assessmentId);
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `assessment_report_${assessmentId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download the report.');
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded inline-flex items-center gap-2"
    >
      <FileDown className="w-4 h-4" />
      Download Report
    </button>
  );
};

export default DownloadReportButton;
