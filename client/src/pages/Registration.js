import React,  { useState } from 'react';
import { Formik, Form, Field, ErrorMessage,useFormikContext } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Registration.css'; 


const ProfilePictureUpload = () => {
    const { setFieldValue } = useFormikContext();
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        if (file && file.type.startsWith('image/')) {
            setFieldValue('picture', file);
            setFile(URL.createObjectURL(file)); 
        } else {
            alert('Please select a valid image file');
            setFile(null);
            setFieldValue('picture', null);
        }
    };

    return (
        <div className="formGroup">
            <label className="formLabel" htmlFor="inputPicture">Profile Picture:</label>
            <input
                id="inputPicture"
                name="picture"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="formField"
                style={{ display: 'none' }}
            />
            <button type="button" className="fileButton" onClick={() => document.getElementById('inputPicture').click()}>
                Choose File
            </button>
            <span className="fileCaption">{file ? file.name : " No file chosen"}</span>
            <ErrorMessage name="picture" component="span" className="formError" />
            {file && <img src={file} alt="Profile Preview" className="imagePreview" />}
        </div>
    );
};



function Registration() {
    let navigate = useNavigate();

    const initialValues = {
        username: "",
        password: "",
        picture: null
    };

    const ValidationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(5).max(20).required(),
        picture: Yup.mixed().nullable()
    });


     
    const onSubmit = async (data) => {
        if (!data.picture) {
            data.picture = null;
        }
        axios.post("http://localhost:3001/auth", data).then(() => {
            navigate("/login");
        });
    };

    return (
        <div className="registrationContainer">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={ValidationSchema}>
                <Form className="registrationForm">
                    <div className="formGroup">
                        <label className="formLabel" htmlFor="inputUsername">Username:</label>
                        <Field id="inputUsername" name="username" placeholder="Username..." className="formField" />
                        <ErrorMessage name="username" component="span" className="formError" />
                    </div>

                    <div className="formGroup">
                        <label className="formLabel" htmlFor="inputPassword">Password:</label>
                        <Field id="inputPassword" type="password" name="password" placeholder="Password..." className="formField" />
                        <ErrorMessage name="password" component="span" className="formError" />
                    </div>

                    <ProfilePictureUpload />

                    <button type="submit" className="formButton">Register</button>
                </Form>
            </Formik>
        </div>
    );
}

export default Registration;
