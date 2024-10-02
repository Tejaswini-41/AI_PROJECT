import React, { useEffect, useState } from 'react';

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Similarity Report</h1>
            {similarityReport.length > 0 ? (
                <ul>
                    {similarityReport.map((report, index) => (
                        <li key={index}>
                            {report.file1} and {report.file2} have a similarity score of {report.similarity_score}%
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No similar documents found.</p>
            )}
        </div>
    );
};

export default SimilarityReport;
