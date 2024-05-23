import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';
import Pagination from '../helpers/Pagination'; 
import '../styles/Symptomps.css'; 

function Symptomps() {
    const [listOfSymptomps, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { authState } = useContext(AuthContext);
    const [showDescription, setShowDescription] = useState(false);
    const [selectedSymptom, setSelectedSymptom] = useState(null);
    const itemsPerPage = 5; 

    useEffect(() => {
        fetchSymptomps(currentPage);
    }, [currentPage]);

    const fetchSymptomps = (page) => {
        axios.get(`http://localhost:3001/symptomps?page=${page}&limit=${itemsPerPage}`).then((response) => {
            setList(response.data.symptomps);
            setTotalPages(response.data.totalPages);
        });
    };

    const deleteD = (id) => {
        axios
            .delete(`http://localhost:3001/symptomps/${id}`, {
                headers: { accessToken: localStorage.getItem('accessToken') },
            })
            .then(() => {
                setList(listOfSymptomps.filter((symp) => symp.id !== id));
            });
    };

    const handleCardClick = (symptom) => {
        if (selectedSymptom && selectedSymptom.id === symptom.id) {
            setShowDescription(!showDescription); 
        } else {
            setSelectedSymptom(symptom);
            setShowDescription(true);
        }
    };

    return (
        <div className="medicine-container">
            {listOfSymptomps.map((value, key) => {
                return (
                    <div
                        key={key}
                        className="symptomps"
                        onClick={() => handleCardClick(value)}
                    >
                        <div className="title">{value.name}</div>
                        {showDescription && selectedSymptom.id === value.id && (
                            <div className="body">{value.description}</div>
                        )}
                        {authState.username === value.username && (
                            <button
                                className="delete-button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteD(value.id);
                                }}
                            >
                                x
                            </button>
                        )}
                    </div>
                );
            })}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
    );
}

export default Symptomps;
