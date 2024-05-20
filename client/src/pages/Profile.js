import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import '../styles/Profile.css'; 

function Profile() {
    let { id } = useParams();
    const [username, setUsername] = useState("");
    const [picture, setPicture] = useState(""); 

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/userinfo/${id}`).then((response) => {
            setUsername(response.data.username);
            setPicture(response.data.picture); 
        });
    }, [id]); 

    const renderPicture = () => {
        if (picture !== null) {
            return <img className="profilePicture" src={picture} alt="" />;
        } else {
            return <img className="profilePicture" src="https://i.ibb.co/nkc87fG/d.jpg" alt="" />;
        }
    }; 

    return (
        <div className="profilePageContainer">
            <div className='profileInfo'>
                <div className="profileHeader">
                    {renderPicture()}
                    <h1 className="profileUsername">{username}</h1>
                </div>
                <div className="profileBio">
                    {/* Add additional profile information here if needed */}
                </div>
            </div>
            <div className='listOfPosts'>
                {/* Display user's posts here if applicable */}
            </div>
        </div>
    );
}

export default Profile;
