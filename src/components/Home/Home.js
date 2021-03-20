import './Home.css';
import React, { useEffect, useState } from 'react';
import vehicleData from '../../data/data.json';
import Vehicle from '../Vehicle/Vehicle';

const Home = () => {
    const [vehicle, setVehicle] = useState([]);
    useEffect(() => {
        setVehicle(vehicleData);
    }, [])
    return (
        <div className="center">
            <h1>Select Your Ride From These {vehicle.length} choices</h1>
            <div className="card-deck">
                {
                    vehicleData.map((vehicle) => <Vehicle vehicle={vehicle}></Vehicle>)
                }
            </div>
        </div>
    );
};

export default Home;