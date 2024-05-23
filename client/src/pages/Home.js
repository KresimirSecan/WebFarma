import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'; 

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    let navigate = useNavigate();

    const searchItems = () => {
        navigate(`/searchResults?name=${searchTerm}`);
    };

    return (
        <div>
            <div className="button-container">
                <button className="nav-button" onClick={() => navigate('/medicine')}>
                    Medicine
                </button>
                <button className="nav-button" onClick={() => navigate('/symptomps')}>
                    Symptomps
                </button>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name"
                    className="search-input"
                />
                <button onClick={searchItems} className="search-button">Search</button>
            </div>
        </div>
    );
}

export default Home;
