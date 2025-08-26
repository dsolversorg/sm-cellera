import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Telephone } from 'react-bootstrap-icons'; // Import the Telephone icon
import { useDispatch } from 'react-redux';
import axios from 'axios'; // Import axios for making HTTP requests
import InputMask from 'react-input-mask'; // Import InputMask for phone masking
import qs from 'qs'; // Import qs for query string formatting

function PhoneForm({ className }) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(''); // State for messages

  const handleNameInput = (e) => setName(e.target.value);
  const handleCompanyInput = (e) => setCompany(e.target.value);
  const handlePhoneInput = (e) => setPhone(e.target.value);

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone.match(/^\+55\(\d{2}\)\d{4,5}-\d{4}$/)) {
      setMessage('Por favor, insira um número de telefone válido com o DDD.');
      return;
    }
    dispatch({ type: 'SUBMIT_FORM', payload: { name, company, phone } });

    // Make the POST request to Twilio API for Call
    try {
      const parametersObj = {
        message: 'Bem-vindo à Digital Solvers',
        name,
        company,
        phone,
      };

      const data = qs.stringify({
        Parameters: JSON.stringify(parametersObj),
        To: phone,
        From: '+13374152289',
      });

      await axios.post(`https://studio.twilio.com/v2/Flows/${process.env.REACT_APP_TWIMLBIN_ACCOUNT_SID}/Executions`, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: process.env.REACT_APP_TWILIO_ACCOUNT_SID,
          password: process.env.REACT_APP_TWILIO_AUTH_TOKEN,
        },
      });
      setMessage('Chamada iniciada com sucesso!');
      console.log('Chamada iniciada');
    } catch (error) {
      setMessage('Erro ao iniciar chamada. Por favor, tente novamente.');
      console.error('Erro ao iniciar chamada', error);
    }
    setName('');
    setCompany('');
    setPhone('');
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 15000);
      return () => clearTimeout(timer);
    }
    return undefined; // Explicitly return undefined to satisfy ESLint rule
  }, [message]);

  const handleCloseMessage = () => {
    setMessage('');
  };

  return (
    <div className={className}>
      <h2 className="header">Fale agora com um dos nossos representantes:</h2>
      <form onSubmit={handleSubmit} className="formCont">
        <div className="input-group">
          <label htmlFor="name">
            Nome
            <input
              id="name"
              value={name}
              onChange={handleNameInput}
              className="form-control"
              placeholder="Digite o seu nome completo"
              required
            />
          </label>
        </div>
        <div className="input-group">
          <label htmlFor="company">
            Empresa
            <input
              id="company"
              value={company}
              onChange={handleCompanyInput}
              className="form-control"
              placeholder="Digite o nome da sua empresa"
              required
            />
          </label>
        </div>
        <div className="input-group">
          <label htmlFor="phone">
            Celular
            <InputMask
              mask="+55(99)99999-9999"
              id="phone"
              value={phone}
              onChange={handlePhoneInput}
              className="form-control"
              placeholder="Digite o número do seu telefone"
              required
            />
          </label>
        </div>
        <button
          className="btn send-button"
          type="submit"
          aria-label="Submit"
          data-tip="Submit"
        >
          <Telephone />
        </button>
      </form>
      {message && (
        <div className="message-container">
          <p className="message">{message}</p>
          <button className="close-button" onClick={handleCloseMessage} aria-label="Close" type="button">
            &times;
          </button>
        </div>
      )}
    </div>
  );
}

PhoneForm.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(PhoneForm)`
  .header {
    text-align: center;
    margin-bottom: -15px;
  }

  .form-control {
    margin-bottom: 10px;
  }

  .send-button {
    border: 1px solid #ced4da;
    background: #28a745; /* Green background */
    color: #FFF; /* White text */
    margin-top: 0;
    padding: 13px 30px; /* Increase padding for larger button */
    font-size: 1.2rem; /* Increase font size */
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease; /* Smooth transition for hover effect */
    border-radius: 10px; /* Curved borders */
  }

  .send-button:hover {
    background-color: #218838; /* Darker green on hover */
  }

  .send-button svg {
    margin-right: 5px; /* Space between icon and text */
    font-size: 1.5rem; /* Increase icon size */
  }

  .input-group {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 10px;

    @media (max-width: 700px){
      width: 90%;
    }
  }

  .formCont {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    background: azure;
    padding: 1rem 30px; /* Add padding to create space at the top and bottom */

    @media (max-width: 700px){
      display: masonry;
    }
  }

  label {
    margin-bottom: 5px;
    font-weight: bold;
  }

  .message-container {
    margin-top: 10px;
    background: #f8d7da;
    padding: 0px;
    border-radius: 5px;
    height: 35px;
    position: relative;
  }

  .message {
    font-weight: bold;
    height: auto;
    color: red; /* You can style this message as needed */
  }

  .close-button {
    position: absolute;
    top: 5px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    z-index: 1; /* Ensure the button is on top */
  }
`;
