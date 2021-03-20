import './Destination.css';
import React from 'react';
import { useForm } from 'react-hook-form';

const Destination = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="From" name="from" ref={register} />
            <br/>
            <input placeholder="To" name="to" ref={register} />
            <br/>
            <input type="submit" />
        </form>
    );
};

export default Destination;