import React from 'react';
import { useNavigate } from 'react-router-dom';

const FinishPage = () => {
    const navigate = useNavigate();

    const handleReturnHome = () => {
        navigate('/');
    };

    return (
        <div className="finish-page">
            <h2>Congratulations! All points completed.</h2>
            <button onClick={handleReturnHome}>Return Home</button>
        </div>
    );
};

export default FinishPage;
