import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import '../styles/Profile.css'; 


const ProfilePicture = ({ picture }) => {
    let imageUrl = "";
    if (picture) {
        console.log("data64: ",picture)
        imageUrl = picture.startsWith('data:image') ? picture : `data:image/jpeg;base64,${picture}`; 
    } else {
        imageUrl = "https://i.ibb.co/nkc87fG/d.jpg"; 
    }
    console.log("slika:",imageUrl)
    return <img className="profilePicture" src={imageUrl} alt="Profile" />;
 };



function Profile() {
    let { id } = useParams();
    const [username, setUsername] = useState("");
    const [picture, setPicture] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/userinfo/${id}`)
            .then((response) => {
                setUsername(response.data.username);
                const base64EncodedImage = `data:image/jpeg;base64,${btoa(response.data.picture)}`;
               
                setPicture(response.data.picture);
            })
            .catch((error) => {
                console.error('Error fetching user info:', error);
            });
    }, [id]); 

    return (
        <div className="profilePageContainer">
            <div className='profileInfo'>
                <div className="profileHeader">
                    <ProfilePicture picture={picture} />
                    <h1 className="profileUsername">{username}</h1>
                </div>
                
            </div>
           
        </div>
    );
}



export default Profile;
