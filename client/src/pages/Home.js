import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function Home() {
    const [listOfDrugs, setList] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State for the search input
    const { authState } = useContext(AuthContext);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/post').then((response) => {
            setList(response.data);
        });
    }, []);

    const deleteD = (id) => {
        axios
            .delete(`http://localhost:3001/post/${id}`, {
                headers: { accessToken: localStorage.getItem('accessToken') },
            })
            .then(() => {
                setList(listOfDrugs.filter((drug) => drug.id !== id));
            });
    };

    const searchDrug = () => {
        navigate(`/searchResults?name=${searchTerm}`);
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search drug by name"
            />
            <button onClick={searchDrug}>Search</button>

            {listOfDrugs.map((value, key) => {
                return (
                    <div
                        key={key}
                        className="drug"
                        onClick={() => {
                            navigate(`/drug/${value.id}`);
                        }}
                    >
                        <div className="title">{value.name}</div>
                        <div className="body">{value.containing}</div>
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
        </div>
    );
}

export default Home;
