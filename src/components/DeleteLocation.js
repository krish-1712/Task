import React from "react";
import { useNavigate } from "react-router-dom";
import { Appstate } from "../Context/AppProvider";
import BaseApp from "../Core/Base";
import './DeleteLocation.css';

const DeleteLocation = () => {
    const { user, setUser } = Appstate();
    const history = useNavigate();

    const deleteUser = async (idx) => {
        try {
            const response = await fetch(`https://www.melivecode.com/api/attractions/${idx}`, {
                method: "DELETE"
            });

            if (response.ok) {
                const data = await response.json();
                console.log("after the data", data);

                const alterList = user.filter((per) => per.id !== idx);
                setUser(alterList);
            } else {
                console.log("Could not delete data");
            }
        } catch (error) {
            console.log(error);
        }
    };

    console.log("User data in DeleteLocation:", user);

    return (
        <BaseApp title="Details">
            <div className="user-content1">
                {user && user.map((person, idx) => (
                    <div key={idx} className="user-card1">
                        <img src={person.coverimage} alt={person.name} className="location-img" />
                        <div className="location-details1">
                            <h1>{person.name}</h1>
                            <p>{person.detail}</p>
                            <p>{person.coverimage}</p>
                            <p>{person.latitude}</p>
                            <p>{person.longitude}</p>
                            <div className="btn-group1">
                                <button
                                    className="btn edit-btn1"
                                    onClick={() => history(`/edits/${person.id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn view-btn1"
                                    onClick={() => history(`/details/${idx}`)}
                                >
                                    View
                                </button>
                                <button
                                    className="btn del-btn1"
                                    onClick={() => deleteUser(person.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </BaseApp>
    );
};

export default DeleteLocation;
