import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { createBuilding, updateBuilding } from '../API/BuildingService'; 
import '../Styles/FormPage.css';
import Navbar from './Navbar';

const FormPage = () => {
    const { points, currentPointIndex, setCurrentPointIndex, setIsFirstPointSubmitted } = useContext(AppContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        buildingName: '',
        buildingNumber: '',
        numberOfFloors: '',
        buildingType: '',
        additionalData: ''
    });

    useEffect(() => {
        // Pre-fill form data with current building name if available
        if (points[currentPointIndex]) {
            setFormData((prevData) => ({
                ...prevData,
                buildingName: points[currentPointIndex].name || ''
            }));
        }
    }, [currentPointIndex, points]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (points[currentPointIndex]?.id) {
                // Update existing building
                const result = await updateBuilding(points[currentPointIndex].id, formData);
                console.log('Building updated:', result);
            } else {
                // Create new building
                const result = await createBuilding(formData);
                console.log('Building created:', result);
            }

            setIsFirstPointSubmitted(true);
            navigate('/'); // Navigate back to HomePage after form submission
        } catch (error) {
            console.error('Error submitting building data:', error);
            // Optionally, handle the error (e.g., show a message to the user)
        }
    };

    return (
        <div className="form-page">
            <Navbar />
            <h1 className="form-title">Building Data Form</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Building Name:</label>
                    <input type="text" name="buildingName" value={formData.buildingName} onChange={handleChange} placeholder="Enter building name" required/>
                </div>
                <div className="form-group">
                    <label>Building Number:</label>
                    <input type="text" name="buildingNumber" value={formData.buildingNumber} onChange={handleChange} placeholder="Enter building number" required />
                </div>
                <div className="form-group">
                    <label>Number of Floors:</label>
                    <input type="number" name="numberOfFloors" value={formData.numberOfFloors} onChange={handleChange} placeholder="Enter number of floors" required />
                </div>
                <div className="form-group">
                    <label>Type:</label>
                    <select name="buildingType" value={formData.buildingType} onChange={handleChange} required>
                        <option value="">Select Type</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Governmental">Governmental</option>
                        <option value="Housing">Housing</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Additional Data:</label>
                    <input type="text" name="additionalData" value={formData.additionalData} onChange={handleChange} placeholder="Enter additional data" />
                </div>
                <button className="submit-button" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FormPage;
