import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Drugs() {
    let navigate = useNavigate();

    const initialValues = {
        name: "",
        containing: ""
    };

    const onSubmit = async (data) => {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            alert("You must be logged in to perform this action.");
            navigate("/login");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3001/post", data, {
                headers: { accessToken :  localStorage.getItem("accessToken")}
            });

            if (response.data.error) {
                console.log(response.data.error);
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("There was an error making the request", error);
            alert("An error occurred while processing your request.");
        }
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        containing: Yup.string().required("Containing is required")
    });

    return (
        <div className="createDrugPage">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form>
                    <label>Name: </label>
                    <ErrorMessage name="name" component="span" />
                    <Field id="inputName" name="name" placeholder="Ex. Brufen" />
                    
                    <label>Containing: </label>
                    <ErrorMessage name="containing" component="span" />
                    <Field id="inputContaining" name="containing" placeholder="Write" />
                    
                    <button type="submit">Insert</button>
                </Form>
            </Formik>
        </div>
    );
}

export default Drugs;
