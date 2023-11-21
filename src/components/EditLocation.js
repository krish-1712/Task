import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Appstate } from "../Context/AppProvider";
import BaseApp from "../Core/Base";
import * as yup from 'yup'
import { useFormik } from "formik";

const userSchemaValidation = yup.object({
    id:yup.string().required("Please specify your ID"),
    name: yup.string().required("Please Enter your Name"),
    detail: yup.string().required("Please specify Your Details"),
    coverimage: yup.string().required("Please specify the Coverimage"),
    latitude: yup.string().required("Please specify the Latitude"),
    longitude: yup.string().required("Please specify the Longitude"),
});

const EditLocation = () => {
    const { id } = useParams();
    const history = useNavigate();
    const { user, setUser } = Appstate();

    const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
        initialValues: {
            id:"",
            name: "",
            detail: "",
            coverimage: "",
            latitude: "",
            longitude: "",
        },
        validationSchema: userSchemaValidation,
        onSubmit: async (editedData) => {
            console.log("on submit called :", editedData);
            await updateUser(editedData);
        },
    });

    useEffect(() => {
        const selectedUser = user.find((per) => per?.id === parseInt(id));
        if (selectedUser) {
            handleChange({ target: { id: "id", value: selectedUser.id || "" } });
            handleChange({ target: { name: "name", value: selectedUser.name || "" } });
            handleChange({ target: { name: "detail", value: selectedUser.detail || "" } });
            handleChange({ target: { name: "coverimage", value: selectedUser.coverimage || "" } });
            handleChange({ target: { name: "latitude", value: selectedUser.latitude || "" } });
            handleChange({ target: { name: "longitude", value: selectedUser.longitude || "" } });
        }
    }, [id, user, handleChange]);

    const updateUser = async (editedData) => {
        try {
            const response = await fetch(`https://www.melivecode.com/api/auth/attractions/update`, {
                method: "PUT",
                body: JSON.stringify({ ...editedData, id: parseInt(id) }),
                headers: {
                    "Content-Type": "application/json",
              
                    Authorization: `Bearer YOUR_TOKEN`,
                },
            });
            const data = await response.json();
            console.log(data);

            const updatedUser = user.map((per) => (per.id === parseInt(id) ? data : per));
            setUser(updatedUser);
            history("/delete");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <BaseApp
            title={"Edit the Details"}>
             <div className="new" >
               <form onSubmit={handleSubmit}>
               <input placeholder="Id" className="id" type="number" name="id" onBlur={handleBlur}
                            value={values.id}
                            onChange={handleChange}
                        /> 
                        {touched.id && errors.id ? <p style={{color:"crimson"}}>{errors.id}</p>:""}
                        <br></br>
        
                    <input placeholder="Enter the Name" className="name" type="text" name="name" onBlur={handleBlur}
                        value={values.name}
                        onChange={handleChange}
                    /> 
                    {touched.name && errors.name ? <p style={{color:"crimson"}}>{errors.name}</p>:""}
                    <br></br>
        
                    <input placeholder="Please specify your Details" className="details" type="text" name="details" onBlur={handleBlur}
                        value={values.detail}
                        onChange={handleChange}
                    />
                     {touched.detail && errors.detail ? <p style={{color:"crimson"}}>{errors.detail}</p>:""}
                     <br></br>
        
                    <input placeholder="Please specify the Coverimage" className="coverimage" type="text"name="coverimage" onBlur={handleBlur}
                     value={values.coverimage}
                     onChange={handleChange}
                    />
                     {touched.coverimage && errors.coverimage ? <p style={{color:"crimson"}}>{errors.coverimage}</p>:""}
                    <br></br>
        
                    <input placeholder="Enter the Latitude" className="latitude" type="Number" name="latitude" onBlur={handleBlur}
                     value={values.latitude}
                     onChange={handleChange}
                    />
                     {touched.latitude && errors.latitude ? <p style={{color:"crimson"}}>{errors.latitude}</p>:""}
                    <br></br>
        
                    <input placeholder="Enter the Longitude" className="longitude" type="Number" name="longitude" onBlur={handleBlur}
                     value={values.longitude}
                     onChange={handleChange}
                    />
                     {touched.longitude && errors.longitude ? <p style={{color:"crimson"}}>{errors.longitude}</p>:""}
                    <br></br>
        
                    <button
                    className="add"
                    type="submit"
                    >Add</button>
                    </form>
            
             
            </div>
            </BaseApp>
    );
};

export default EditLocation;
