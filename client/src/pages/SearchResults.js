import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Pagination from '../helpers/Pagination'; 


function SearchResults() {
    const [medicineResults, setMedicineResults] = useState({ drugs: [], totalPages: 1 });
    const [symptompsResults, setSymptompsResults] = useState({ symptomps: [], totalPages: 1 });
    const [medicineCurrentPage, setMedicineCurrentPage] = useState(1);
    const [symptompsCurrentPage, setSymptompsCurrentPage] = useState(1);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [selectedSymptom, setSelectedSymptom] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const itemsPerPage = 5; 

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchTerm = params.get('name');

        if (searchTerm) {
            axios.get(`http://localhost:3001/drug/search/${searchTerm}`, {
                params: {
                    page: medicineCurrentPage,
                    limit: itemsPerPage
                }
            })
            .then(response => {
                setMedicineResults(response.data);
            })
            .catch(error => console.error('Error fetching medicine search results:', error));

            axios.get(`http://localhost:3001/symptomps/search/${searchTerm}`, {
                params: {
                    page: symptompsCurrentPage,
                    limit: itemsPerPage
                }
            })
            .then(response => {
                setSymptompsResults(response.data);
            })
            .catch(error => console.error('Error fetching symptomps search results:', error));
        }
    }, [location.search, medicineCurrentPage, symptompsCurrentPage]);

    const handleMedicinePageChange = (newPage) => {
        setMedicineCurrentPage(newPage);
    };

    const handleSymptompsPageChange = (newPage) => {
        setSymptompsCurrentPage(newPage);
    };

    const handleMedicineClick = (drug) => {
        if (selectedMedicine && selectedMedicine.id === drug.id) {
            setSelectedMedicine(null); 
        } else {
            setSelectedMedicine(drug); 
        }
    };

    const handleSymptomClick = (symptom) => {
        if (selectedSymptom && selectedSymptom.id === symptom.id) {
            setSelectedSymptom(null); 
        } else {
            setSelectedSymptom(symptom); 
        }
    };

    return (
        <div>
            <div className="results-section">
                <h2>Medicines</h2>
                {medicineResults.drugs.length > 0 ? (
                    <>
                        {medicineResults.drugs.map(drug => (
                            <div
                                key={drug.id}
                                className="result-item"
                                onClick={() => handleMedicineClick(drug)}
                            >
                                <div className="title">{drug.name}</div>
                                {selectedMedicine && selectedMedicine.id === drug.id && (
                                    <div className="body">{drug.containing}</div>
                                )}
                            </div>
                        ))}
                        <Pagination currentPage={medicineCurrentPage} totalPages={medicineResults.totalPages} onPageChange={handleMedicinePageChange} />
                    </>
                ) : (
                    <p>No medicines found.</p>
                )}
            </div>
            <div className="results-section">
                <h2>Symptomps</h2>
                {symptompsResults.symptomps.length > 0 ? (
                    <>
                        {symptompsResults.symptomps.map(symptom => (
                            <div
                                key={symptom.id}
                                className="result-item"
                                onClick={() => handleSymptomClick(symptom)}
                            >
                                <div className="title">{symptom.name}</div>
                                {selectedSymptom && selectedSymptom.id === symptom.id && (
                                    <div className="body">{symptom.description}</div>
                                )}
                            </div>
                        ))}
                        <Pagination currentPage={symptompsCurrentPage} totalPages={symptompsResults.totalPages} onPageChange={handleSymptompsPageChange} />
                    </>
                ) : (
                    <p>No symptomps found.</p>
                )}
            </div>
        </div>
    );
}

export default SearchResults;
