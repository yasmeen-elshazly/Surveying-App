import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import FormPage from './Components/FormPage';
import Navbar from './Components/Navbar';
import { AppProvider } from './Context/AppContext'; // Import AppProvider directly

function App() {
    return (
        <Router>
            <AppProvider>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/form" element={<FormPage />} />
                    </Routes>
                    <Navbar />
                </div>
            </AppProvider>
        </Router>
    );
}

export default App;
