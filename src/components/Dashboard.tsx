import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";
import axios from "axios";

interface Assessment {
  _id: string;
  studentName: string;
  subject: string;
  score: number;
  date: string | Date; // Allow both
  tutorName?: string;  // Optional to prevent TypeScript errors
}

const Dashboard: React.FC = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await axios.get("https://server-m1hy.onrender.com/api/assessments");
        setAssessments(response.data);
      } catch (error) {
        console.error("Failed to load assessment data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssessments();
  }, []);

  const handleDownload = async (id: string) => {
    try {
      const response = await axios.get(
        `https://server-m1hy.onrender.com/api/download-report/${id}`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `assessment_report_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Failed to download report:", error);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading assessments...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Assessment Results</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Student Name</th>
              <th className="px-4 py-2 text-left">Subject</th>
              <th className="px-4 py-2 text-left">Score</th>
              <th className="px-4 py-2 text-left">Tutor Name</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assessments.map((assessment) => (
              <tr
                key={assessment._id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="px-4 py-2">{assessment.studentName}</td>
                <td className="px-4 py-2">{assessment.subject}</td>
                <td className="px-4 py-2">{assessment.score}</td>
                <td className="px-4 py-2">{assessment.tutorName || "—"}</td>
                <td className="px-4 py-2">
                  {new Date(assessment.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDownload(assessment._id)}
                    className="flex items-center gap-2 px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition"
                  >
                    <Download size={18} /> Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
