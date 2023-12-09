import React, { useState } from 'react';
import './ValidationForm.css';

function ValidationForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        group: '',
        idCard: '',
        birthDate: '',
        email: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [submittedData, setSubmittedData] = useState(null);

    const validateField = (name, value) => {
        switch(name) {
            case 'fullName':
                return /^[а-яА-ЯёЁіІїЇєЄ'\s-]+$/u.test(value) ? '' : 'Невірний формат ПІБ.';
            case 'group':
                return /^[\w-]+$/.test(value) ? '' : 'Невірний формат групи.';
            case 'idCard':
                return /^\d{9}$/.test(value) ? '' : 'ID-card має складатися з 9 цифр.';
            case 'birthDate':
                return /^\d{2}\.\d{2}\.\d{4}$/.test(value) ? '' : 'Невірний формат дати народження.';
            case 'email':
                return /^\S+@\S+\.\S+$/.test(value) ? '' : 'Невірний формат email.';
            default:
                return '';
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
        setFormErrors(prevFormErrors => ({ ...prevFormErrors, [name]: validateField(name, value) }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = Object.keys(formData).reduce((acc, key) => {
            const error = validateField(key, formData[key]);
            if (error) {
                acc[key] = error;
            }
            return acc;
        }, {});

        if (Object.keys(errors).length === 0) {
            setSubmittedData(formData);
        } else {
            setSubmittedData(null);
        }
        setFormErrors(errors);
    };

    return (
        <div className="validation-form-container">
            <form onSubmit={handleSubmit} noValidate className="validation-form">
                <div className="form-group">
                    <label htmlFor="fullName">ПІБ:</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={formErrors.fullName ? 'invalid' : ''}
                    />
                    {formErrors.fullName && <div className="error">{formErrors.fullName}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="group">Група:</label>
                    <input
                        type="text"
                        id="group"
                        name="group"
                        value={formData.group}
                        onChange={handleChange}
                        className={formErrors.group ? 'invalid' : ''}
                    />
                    {formErrors.group && <div className="error">{formErrors.group}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="idCard">ID-card:</label>
                    <input
                        type="text"
                        id="idCard"
                        name="idCard"
                        value={formData.idCard}
                        onChange={handleChange}
                        className={formErrors.idCard ? 'invalid' : ''}
                    />
                    {formErrors.idCard && <div className="error">{formErrors.idCard}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="birthDate">Дата народж.:</label>
                    <input
                        type="text"
                        id="birthDate"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        className={formErrors.birthDate ? 'invalid' : ''}
                    />
                    {formErrors.birthDate && <div className="error">{formErrors.birthDate}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={formErrors.email ? 'invalid' : ''}
                    />
                    {formErrors.email && <div className="error">{formErrors.email}</div>}
                </div>

                <button type="submit" className="submit-button">Перевірити</button>
            </form>
            {submittedData && (
                <div className="form-data-output">
                    <h3>Введені дані:</h3>
                    <p>ПІБ: {submittedData.fullName}</p>
                    <p>Група: {submittedData.group}</p>
                    <p>ID-card: {submittedData.idCard}</p>
                    <p>Дата народж.: {submittedData.birthDate}</p>
                    <p>Email: {submittedData.email}</p>
                </div>
            )}
        </div>
    );
}

export default ValidationForm;
