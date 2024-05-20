import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Registration.css'; // Import the CSS file

function Registration() {
    let navigate = useNavigate();
    
    const initialValues = {
        username: "",
        password: "",
        picture: ""
    };

    const ValidationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(5).max(20).required(),
        picture: Yup.string().nullable()
    });

    const onSubmit = (data) => {
        if (!data.picture) {
            data.picture = null;
        }

        axios.post("http://localhost:3001/auth", data).then((response) => {
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

                    <div className="formGroup">
                        <label className="formLabel" htmlFor="inputPicture">Profile Picture URL:</label>
                        <Field id="inputPicture" name="picture" placeholder="Profile Picture URL..." className="formField" /> 
                        <ErrorMessage name="picture" component="span" className="formError" /> 
                    </div>

                    <button type="submit" className="formButton">Register</button>
                </Form>
            </Formik>
        </div>
    );
}

export default Registration;
