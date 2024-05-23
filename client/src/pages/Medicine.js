import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';
import Pagination from '../helpers/Pagination'; 
import '../styles/Medicine.css'; 

function Medicine() {
    const [listOfDrugs, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { authState } = useContext(AuthContext);
    const [showContaining, setShowContaining] = useState(false);
    const [selectedDrug, setSelectedDrug] = useState(null);
    const itemsPerPage = 5; 

    useEffect(() => {
        fetchDrugs(currentPage);
    }, [currentPage]);

    const fetchDrugs = (page) => {
        axios.get(`http://localhost:3001/drug?page=${page}&limit=${itemsPerPage}`).then((response) => {
            setList(response.data.drugs);
            setTotalPages(response.data.totalPages);
        });
    };

    const deleteD = (id) => {
        axios
            .delete(`http://localhost:3001/drug/${id}`, {
                headers: { accessToken: localStorage.getItem('accessToken') },
            })
            .then(() => {
                setList(listOfDrugs.filter((drug) => drug.id !== id));
            });
    };

    const handleCardClick = (drug) => {
        if (selectedDrug && selectedDrug.id === drug.id) {
            setShowContaining(!showContaining); 
        } else {
            setSelectedDrug(drug);
            setShowContaining(true);
        }
    };

    return (
        <div className="medicine-container">
            {listOfDrugs.map((value, key) => {
                return (
                    <div
                        key={key}
                        className="drug"
                        onClick={() => handleCardClick(value)}
                    >
                        <div className="title">{value.name}</div>
                        {showContaining && selectedDrug.id === value.id && (
                            <div className="body">{value.containing}</div>
                        )}
                        {authState.username === value.username && (
                            <button
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

export default Medicine;
