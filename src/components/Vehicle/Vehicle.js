import './Vehicle.css';
import React from 'react';
import { useHistory } from 'react-router';

const Vehicle = (props) => {
    const {name, image} = props.vehicle;
    const history = useHistory();
    const destination = name => {
        const url =`destination/${name}`;
        history.push(url);
    }
    return (
            <div onClick={() => destination(name)} className="card">
                <img className="card-img-top img-fluid" src={image} alt="" />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                </div>
            </div>
    );
};

export default Vehicle;