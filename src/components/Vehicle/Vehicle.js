import './Vehicle.css';
import React from 'react';

const Vehicle = (props) => {
    console.log(props.vehicle);
    const {name, image} = props.vehicle;
    return (
            <div class="card">
                <img class="card-img-top img-fluid" src={image} alt="" />
                <div class="card-body">
                    <h5 class="card-title">{name}</h5>
                </div>
            </div>
    );
};

export default Vehicle;