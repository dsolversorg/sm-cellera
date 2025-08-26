import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Color from 'color';
import { useDispatch, useSelector } from 'react-redux';
import breakpoints from '../utils/breakpoints';
import Header from '../components/Header';
import { landingBackgroundImage, landingBackgroundColor } from '../config';
import { createScene } from '../store/sm';
import micFill from '../img/mic-fill.svg';
import videoFill from '../img/camera-video-fill.svg';

function Landing({ className }) {
  const dispatch = useDispatch();

  const {
    connected,
    loading,
    error,
  } = useSelector(({ sm }) => (sm));

  const createSceneIfNotStarted = () => {
    if (loading === false && connected === false && error === null) {
      dispatch(createScene());
    }
  };

  useEffect(() => {
    createSceneIfNotStarted();
  }, []);

  const [skip, setSkip] = useState(false);
  const redirectToVideoOnConnect = () => {
    setSkip(true);
  };
  const history = useHistory();
  useEffect(() => {
    if (skip === true && connected === true) history.push('/cellera');
  }, [connected, skip]);

  return (
    <div className={className}>
      <div className="landing-wrapper">
        <Header />
        <div className="container d-flex">
          <div className="landing-container flex-grow-1">
            <div className="col-12 col-lg-6">
              <div className="row" style={{ marginBottom: '9px' }}>
                <div>
                  <h1 className="fw-bol">Olá, eu sou a Éra, um agente virtual da Cellera Farma, com o propósito de esclarecer dúvidas.</h1>
                  {/* <h2 className="fw-bol">
                    Segue abaixo algumas frases de navegação:
                  </h2>
                  <h2 className="fw-bol">
                    <b> Menu</b>
                    ,
                  </h2>
                  <h2 className="fw-bol">
                    <b> Voltar</b>
                    ,
                  </h2>
                  <h2 className="fw-bol">
                    <b> Encerrar</b>
                  </h2> */}
                </div>
              </div>
              <div className="row">
                <div>
                  <h4 className="fw-light" style={{ marginBottom: '31px' }}>
                    Faça-me uma pergunta e farei o meu melhor para respondê-la.
                  </h4>
                </div>
              </div>
              <div className="row" style={{ marginBottom: '60px' }}>
                {!connected && (
                  <div
                    className="button-start button--disabled m-2 "
                    type="button"
                  >
                    <span>
                      Aguarde...
                    </span>
                    <img alt="gif loading" src="https://media.tenor.com/t5DMW5PI8mgAAAAj/loading-green-loading.gif" className="gif-loading" />
                  </div>
                )}

                {connected && (
                  <button
                    className={`${connected ? 'button-start' : 'button-start button-start--disabled'} m-2`}
                    type="button"
                    disabled={!connected}
                    onClick={redirectToVideoOnConnect}
                  >
                    Conversar com a Éra
                  </button>
                )}
              </div>
              <div className="row">
                <div>
                  Acho difícil ouvi-lo quando você está em uma sala barulhenta,
                  ou quando há outras conversas acontecendo ao seu redor,
                  então fale comigo de um lugar tranquilo.
                </div>
              </div>
              <div className="col" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Landing.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(Landing)`
  .fw-bol { font-size: 24px!important;}

  .fw-light{ font-size: 16px; }

  .gif-loading {
    width: 25px;
    height: 25px;
  }

  .fw-bol {
    font-size: 32px;
  }
  
  .landing-wrapper {
    min-height: 100vh;

    background: ${landingBackgroundImage ? `url(${landingBackgroundImage})` : ''} ${landingBackgroundColor ? `${landingBackgroundColor};` : ''};
    background-size: auto 50%;
    background-repeat: no-repeat;
    background-position: bottom center;
    z-index: 2;


    @media (min-width: ${breakpoints.lg}px) {
      background-size: 60% auto;
      background-position: right bottom;
    }
  }

  .button-start {
    border: 1px solid rgb(60, 60, 60);
    border-radius: 32px;
    padding:16px 32px;
    background-color: #8AC43F;
    color: #ffffff;
    font-weight: 600;
    margin: 0;
  }

  .button--disabled {
    border: 1px solid rgb(60, 60, 60);
    border-radius: 32px;
    padding:16px 32px;
    background-color: #E5E5E5;
    color: #ABABAB;
    font-weight: 600;
    margin: 0;
    text-align: center;
    cursor: not-allowed;
  }

  .button-start--disabled {
    background-color: #E5E5E5;
    color: #ABABAB;
  }

  .landing-container {
    padding-top: 1rem;
    display: flex;

    &>div {
      background-color: ${Color(landingBackgroundColor).alpha(0.5)};
      backdrop-filter: blur(10px);
      border: 1px solid rgba(0,0,0,0.1);
      padding: 1rem;
      border-radius: 5px;

      @media (min-width: ${breakpoints.lg}px) {
        border: none;
      }
    }
  }
  .form-switch .form-check-input {
    min-width: 7rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #8AC43F;
    color: #ffffff;


    &.mic-switch::before, &.mic-switch.status-checked::after {
        background-image: url(${micFill});
    }
    &.video-switch::before, &.video-switch.status-checked::after {
        background-image: url(${videoFill});
    }
    &.mic-switch.status-checked::before, &.video-switch.status-checked::before {
      background-image: none;
    }

    &.status-unchecked {
      background-color: #E5E5E5;
      color: #ABABAB;
      &::after {
        content: 'OFF';
        color: #000;
        margin-right: 18%;
      }
      &::before {
        background-size: 60%;
        background-repeat: no-repeat;
        background-color: rgb(220, 220, 220);
        background-position: 45% center;
        content: '';
        display: block;

        border-radius: 50%;

        height: 80%;
        margin-left: 5%;
        aspect-ratio: 1;
        float: right;
      }
    }

    &.status-checked {
      &::before {
        content: 'ON';
        color: #FFF;
        margin-left: 22%;
      }

      &::after {
        background-size: 60%;
        background-repeat: no-repeat;
        background-color: #FFF;
        background-position: 55% center;
        content: '';
        display: block;

        border-radius: 50%;

        height: 80%;
        margin-right: 5%;
        aspect-ratio: 1;
        float: right;
      }
    }
  }

`;
