import React from "react";
import { useParams } from "react-router-dom";
import { Appstate } from "../Context/AppProvider";
import BaseApp from "../Core/Base";
import "./Details.css"; 

const Details = () => {
  const { user } = Appstate();
  const { id } = useParams();
  const person = user[id];

  return (
    <BaseApp title={"Books Details"}>
      <div className="user-content2">
        <div className="user-card2">
          <div className="card-image2">
            <img src={person.coverimage} alt={person.name} />
          </div>
          <div className="card-details2">
            <h1>{person.name}</h1>
            <p>Details: {person.detail}</p>
            <p>coverimage:{person.coverimage}</p>
            <p>Latitude: {person.latitude}</p>
            <p>Longitude: {person.longitude}</p>
          </div>
        </div>
      </div>
    </BaseApp>
  );
};

export default Details;

  