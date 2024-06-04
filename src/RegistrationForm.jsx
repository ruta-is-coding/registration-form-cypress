// src/RegistrationForm.js
import React, { useState } from 'react';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        dob: ''
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [age, setAge] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let formErrors = {};
        if (!formData.username) formErrors.username = "Username is required";
        if (!formData.email) {
            formErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = "Email is invalid";
        }
        if (!formData.password) {
            formErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            formErrors.password = "Password must be at least 6 characters";
        }
        if (!formData.dob) {
            formErrors.dob = "Date of Birth is required";
        } else if (!isValidDate(formData.dob)) {
            formErrors.dob = "Date of Birth is invalid";
        }
        return formErrors;
    };

    const isValidDate = (dateString) => {
        // Check if the date is in YYYY-MM-DD format
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(dateString)) {
            return false;
        }

        const date = new Date(dateString);
        // Ensure the date components are correct
        const [year, month, day] = dateString.split('-').map(Number);
        return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
    };

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validate();
        setErrors(formErrors);
        if (Object.keys(formErrors).length === 0) {
            // setAge(calculateAge(formData.dob));
            setSubmitted(true);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className='registration-form bg-success bg-opacity-50 bg-gradient border border-success rounded p-4'>
                <div className="mb-3">
                    <div className='input-group mb-1'>
                        <label className="col-3">Username:</label>
                        <input
                            type="text"
                            name="username"
                            data-cy="username"
                            value={formData.username}
                            onChange={handleChange}
                            className='form-control border border-success rounded'
                        />
                    </div>
                    {errors.username && <p className="error text-center">{errors.username}</p>}
                </div>

                <div className="mb-3">
                    <div className='input-group mb-1'>
                        <label className="col-3">Email:</label>
                        <input
                            type="text"
                            name="email"
                            data-cy="email"
                            value={formData.email}
                            onChange={handleChange}
                            className='form-control border border-success rounded'
                        />
                    </div>
                    {errors.email && <p className="error text-center">{errors.email}</p>}
                </div>

                <div className="mb-3">
                    <div className='input-group mb-1'>
                        <label className="col-3">Password:</label>
                        <input
                            type="password"
                            name="password"
                            data-cy="password"
                            value={formData.password}
                            onChange={handleChange}
                            className='form-control border border-success rounded'
                        />
                    </div>
                    {errors.password && <p className="error text-center">{errors.password}</p>}
                </div>

                <div className="mb-3">
                    <div className='input-group mb-1'>
                        <label className="col-3">Date of Birth:</label>
                        <input
                            type="date"
                            name="dob"
                            data-cy="date-of-birth"
                            value={formData.dob}
                            onChange={handleChange}
                            className='form-control border border-success rounded'
                        />
                    </div>
                    {errors.dob && <p className="error text-center">{errors.dob}</p>}
                </div>

                <div className="row">
                    <div className="col">
                        <button
                            type="submit"
                            className='btn btn-success float-end'
                            data-cy="submit"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
            {submitted && (
                <div className="submitted-info" data-cy="submitted-info">
                    <h3>Submitted Information:</h3>
                    <p>
                        <strong>Username: </strong>
                        <span data-cy="submitted-username">{formData.username}</span>
                    </p>
                    <p>
                        <strong>Email: </strong>
                        <span data-cy="submitted-email">{formData.email}</span>
                    </p>
                    <p>
                        <strong>Date of Birth: </strong>
                        <span data-cy="submitted-dob">{formData.dob}</span>
                    </p>
                    <p>
                        <strong>Age: </strong>
                        <span data-cy="age">{age}</span>
                    </p>
                </div>
            )}
        </>
    );
};

export default RegistrationForm;