import React, { useEffect, useState } from 'react';
import './SimilarityReport.css'; // Make sure this is correctly linked

const SimilarityReport = () => {
    const [similarityReport, setSimilarityReport] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSimilarityReport = async () => {
            try {
                const response = await fetch('http://localhost:8000/similarity-db', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();
                setSimilarityReport(data.similarity_report || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSimilarityReport();
    }, []);

    const getColorByScore = (score) => {
        if (score >= 70) return '#FF9A98';
        if (score >= 62) return '#FFB668';
        if (score >= 50) return '#FFFF4C';
        return '';
    };

    const extractFileName = (file) => {
        const fileParts = file.split('-'); 
        return fileParts.slice(1).join('-'); // Remove the ID and return the rest
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="similarity-report-container ">
            <div className='report-card'>
            <h1>Similarity Report</h1>
            {similarityReport.length > 0 ? (
                <ul className="similarity-list">
                    {similarityReport.map((report, index) => (
                        <li key={index} className="similarity-item" style={{ backgroundColor: getColorByScore(report.similarity_score) }}>
                            <span className="file-name a">{extractFileName(report.file1)}</span>  
                            &nbsp;&nbsp;and&nbsp;&nbsp;
                            <span className="file-name"> {extractFileName(report.file2)}</span> 
                            <span className="score" style={{ marginLeft: 'auto' }}>{report.similarity_score}%</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No similar documents found.</p>
            )}
            </div>
        </div>
    );
};

export default SimilarityReport;
