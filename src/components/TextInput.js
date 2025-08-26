import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Send } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { sendTextMessage } from '../store/sm';

function TextInput({ className }) {
  const [textInput, setText] = useState('');

  const handleInput = (e) => setText(e.target.value);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendTextMessage({ text: textInput }));
    setText('');
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="formCont">
        <div className="input-group">
          <input
            value={textInput}
            onChange={handleInput}
            className="form-control"
            placeholder="Digite sua mensagem aqui...."
          />
          <button
            className="btn send-button"
            type="submit"
            aria-label="Submit"
            data-tip="Submit"
          >
            <Send />
          </button>

        </div>
      </form>
    </div>
  );
}

TextInput.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(TextInput)`
  input {
    border-right: none;
  }
  .send-button {
    border: 1px solid #ced4da;
    border-left: none;
    background: #FFF;
    color: rgba(0,0,0,0.4);
  }

  .input-group {
    width: 40%;

    @media (max-width: 700px){
      width: 90%;
    }
  }

  .formCont {
    display: flex;
    justify-content: flex-end;
    width: 98%;

     @media (max-width: 700px){
      display: flex;
      -webkit-box-pack: end;
      width: 100%;
      justify-content: center;
      margin-bottom: 30px;
    }
  }
`;
