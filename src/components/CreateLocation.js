import React from "react";
import { useNavigate } from "react-router-dom";
import { Appstate } from "../Context/AppProvider";
import BaseApp from "../Core/Base";
import * as yup from 'yup'
import { useFormik } from "formik";

const userSchemaValidation = yup.object({
    id: yup.string().required("Please specify your ID"),
    name: yup.string().required("Please Enter your Name"),
    details: yup.string().required("Please specify Your Details"),
    coverimage: yup.string().required("Please specify the Coverimage....."),
    latitude: yup.string().required("Please specify the latitude"),
    longitude: yup.string().required("Please specify the longitude"),



})

const CreateLocation = () => {

    const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
        initialValues: {
            id: "",
            name: "",
            details: "",
            coverimage: "",
            latitude: "",
            longitude: "",
        },
        validationSchema: userSchemaValidation,
        onSubmit: (newUSer) => {
            console.log("on sumbit called :", newUSer)
            addNewUser(newUSer)
        }
    })
    const { user, setUser } = Appstate();
    const history = useNavigate();



    const addNewUser = async (newUser) => {
        const token = "your_token_here"; 
    
        try {
            const response = await fetch(`https://www.melivecode.com/api/auth/attractions/create`, {
                method: "POST",
                body: JSON.stringify({
                    name: newUser.name,
                    detail: newUser.detail,
                    coverimage: newUser.coverimage,
                    latitude: parseFloat(newUser.latitude),
                    longitude: parseFloat(newUser.longitude),
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data);
            console.log("Data sent to API:", newUser);
            setUser([...user, data]);
            history("/delete");
        } catch (error) {
            console.error("Error:", error);
        }
    };
    

    return (
        <BaseApp
            title={"Add a New Books"}>
            <div className="new" >
                <form onSubmit={handleSubmit}>

                    <input placeholder="Id" className="id" type="number" name="id" onBlur={handleBlur}
                        value={values.id}
                        onChange={handleChange}
                    />
                    {touched.id && errors.id ? <p style={{ color: "crimson" }}>{errors.id}</p> : ""}
                    <br></br>
                    <input placeholder="Enter the Name" className="name" type="text" name="name" onBlur={handleBlur}
                        value={values.name}
                        onChange={handleChange}
                    />
                    {touched.name && errors.name ? <p style={{ color: "crimson" }}>{errors.name}</p> : ""}
                    <br></br>

                    <input placeholder="Please specify your Details" className="details" type="text" name="details" onBlur={handleBlur}
                        value={values.details}
                        onChange={handleChange}
                    />
                    {touched.details && errors.details ? <p style={{ color: "crimson" }}>{errors.details}</p> : ""}
                    <br></br>

                    <input placeholder="Please specify the Coverimage" className="coverimage" type="link" name="coverimage" onBlur={handleBlur}
                        value={values.coverimage}
                        onChange={handleChange}
                    />
                    {touched.coverimage && errors.coverimage ? <p style={{ color: "crimson" }}>{errors.coverimage}</p> : ""}
                    <br></br>

                    <input placeholder="Enter the Latitude" className="latitude" type="Number" name="latitude" onBlur={handleBlur}
                        value={values.latitude}
                        onChange={handleChange}
                    />
                    {touched.latitude && errors.latitude ? <p style={{ color: "crimson" }}>{errors.latitude}</p> : ""}
                    <br></br>

                    <input placeholder="Enter the longitude" className="longitude" type="Number" name="longitude" onBlur={handleBlur}
                        value={values.longitude}
                        onChange={handleChange}
                    />
                    {touched.longitude && errors.longitude ? <p style={{ color: "crimson" }}>{errors.longitude}</p> : ""}
                    <br></br>

                    <button
                        className="add"
                        type="submit"
                    >Add</button>
                </form>


            </div>
        </BaseApp>
    )
}

export default CreateLocation

