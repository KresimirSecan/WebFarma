import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function SearchResults() {
    const [listOfDrugs, setListOfDrugs] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchTerm = params.get('name');
        
        if (searchTerm) {
            axios.get(`http://localhost:3001/post/search/${searchTerm}`)
                .then(response => setListOfDrugs(response.data))
                .catch(error => console.error('Error fetching search results:', error));
        }
    }, [location.search]);

    return (
        <div>
            <h1>Search Results</h1>
            {listOfDrugs.map(drug => (
                <div
                    key={drug.id}
                    className="drug"
                    onClick={() => navigate(`/drug/${drug.id}`)}
                >
                    <div className="title">{drug.name}</div>
                    <div className="body">{drug.containing}</div>
                </div>
            ))}
        </div>
    );
}

export default SearchResults;
