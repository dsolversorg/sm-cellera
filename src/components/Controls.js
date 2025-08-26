import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  CameraVideoFill,
  CameraVideoOffFill,
  MicFill,
  MicMuteFill,
  SkipEndFill,
  VolumeMuteFill,
  VolumeUpFill,
} from 'react-bootstrap-icons';
import ReactTooltip from 'react-tooltip';
import {
  stopSpeaking,
  setOutputMute,
  setMicOn,
  setCameraOn,
} from '../store/sm/index';
import mic from '../img/mic.svg';
import micFill from '../img/mic-fill.svg';
import breakpoints from '../utils/breakpoints';
import { seconderyAccent } from '../globalStyle';
import FeedbackModal from './FeedbackModal';

const volumeMeterHeight = 24;
const volumeMeterMultiplier = 1.2;
const smallHeight = volumeMeterHeight;
const largeHeight = volumeMeterHeight * volumeMeterMultiplier;

function Controls({
  className,
}) {
  const {
    micOn,
    cameraOn,
    isOutputMuted,
    speechState,
    requestedMediaPerms,
    highlightMic,
    highlightMute,
    highlightCamera,
    highlightSkip,
  } = useSelector((state) => ({ ...state.sm }));

  const dispatch = useDispatch();

  const [showFeedback, setShowFeedback] = useState(false);
  const [initial, setInitial] = useState(false);

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const MenuiconSize = 35;

  return (
    <div className={className}>
      {showFeedback ? (
        <div className="alert-modal">
          <div className="alert-modal-card container">
            <FeedbackModal
              onClose={() => {
                setShowFeedback(false);
              }}
              closeText="Resume Conversation"
              denyFeedbackText="Close"
              denyFeedback={() => {
                setShowFeedback(false);
              }}
            />
          </div>
        </div>
      ) : null}
      <div className="d-flex espace">

        {!initial ? (
          <button
            type="button"
            className="control-icon icon iniciar"
            aria-label="Alternar Microfone"
            data-tip="Alternar Microfone"
            onClick={() => {
              dispatch(setMicOn({ micOn: !micOn }));
              dispatch(setCameraOn({ cameraOn: !cameraOn }));
              setInitial(true);
            }}
          >
            <span>Iniciar</span>
          </button>
        )
          : (
            <>
              <div>
                {/* alternar microfone do usuário */}
                {micOn ? (
                  <button
                    type="button"
                    className="control-icon icon"
                    aria-label="Alternar Microfone"
                    data-tip="Alternar Microfone"
                    disabled={requestedMediaPerms.micDenied === true}
                    onClick={() => dispatch(setMicOn({ micOn: !micOn }))}
                  >
                    <MicFill size={MenuiconSize} className="size" color={seconderyAccent} style={{ border: highlightMic ? 'red 2px solid' : '' }} />
                  </button>
                )
                  : (
                    <button
                      type="button"
                      className="control-icon iconMute"
                      aria-label="Alternar Microfone"
                      data-tip="Alternar Microfone"
                      disabled={requestedMediaPerms.micDenied === true}
                      onClick={() => dispatch(setMicOn({ micOn: !micOn }))}
                    >
                      <MicMuteFill size={MenuiconSize} className="size" color={seconderyAccent} style={{ border: highlightMic ? 'red 2px solid' : '' }} />
                    </button>
                  )}
              </div>

              <div>
                {/* alternar câmera do usuário */}
                {cameraOn ? (
                  <button
                    type="button"
                    className="control-icon icon"
                    aria-label="Alternar Câmera"
                    data-tip="Alternar Câmera"
                    disabled={requestedMediaPerms.cameraDenied === true}
                    onClick={() => dispatch(setCameraOn({ cameraOn: !cameraOn }))}
                  >
                    <CameraVideoFill size={MenuiconSize} color={seconderyAccent} style={{ border: highlightCamera ? 'red 2px solid' : '' }} className="size" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="control-icon iconMute"
                    aria-label="Alternar Câmera"
                    data-tip="Alternar Câmera"
                    disabled={requestedMediaPerms.cameraDenied === true}
                    onClick={() => dispatch(setCameraOn({ cameraOn: !cameraOn }))}
                  >
                    <CameraVideoOffFill size={MenuiconSize} className="size" color={seconderyAccent} style={{ border: highlightCamera ? 'red 2px solid' : '' }} />

                  </button>
                )}
              </div>

              <div>
                {/* pule o que quer que o dp esteja falando no momento */}
                {speechState === 'speaking' ? (
                  <button
                    type="button"
                    className="control-icon icon"
                    onClick={() => dispatch(stopSpeaking())}
                    data-tip="Pular fala"
                    aria-label="Pular fala"
                  >
                    <SkipEndFill size={MenuiconSize} className="size" color={seconderyAccent} style={{ border: highlightSkip ? 'red 2px solid' : '' }} />
                  </button>
                ) : null}

              </div>

              <div>
                {/* silenciar som dp */}
                {isOutputMuted ? (
                  <button
                    type="button"
                    className="control-icon iconMute"
                    aria-label="Alternar áudio"
                    data-tip="Alternar áudio"
                    onClick={() => dispatch(setOutputMute({ isOutputMuted: !isOutputMuted }))}
                  >
                    <VolumeMuteFill size={MenuiconSize} className="size" color={seconderyAccent} style={{ border: highlightMute ? 'red 2px solid' : '' }} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="control-icon icon"
                    aria-label="Alternar áudio"
                    data-tip="Alternar áudio"
                    onClick={() => dispatch(setOutputMute({ isOutputMuted: !isOutputMuted }))}
                  >
                    <VolumeUpFill size={MenuiconSize} className="size" color={seconderyAccent} style={{ border: highlightMute ? 'red 2px solid' : '' }} />
                  </button>
                )}
              </div>
            </>
          )}
      </div>
    </div>
  );
}

Controls.propTypes = { className: PropTypes.string.isRequired };

export default styled(Controls)`
  .context-controls {
    position: absolute;
    z-index: 100;
    background: rgba(0,0,0,0.3);
    left: 0;
    top: 0;

    &>div {
      width: 100vw;
      height: 100vh;

      margin-top: 4rem;
    }

    ul {
      padding: 1rem;

      list-style-type: none;

      background: #FFF;
      border: 1px solid rgba(0,0,0,0.1);
      border-radius: 5px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: none;

      &>li {
        border-bottom: 1px solid rgba(0,0,0,0.4);
        padding: 0.5rem;
      }
      &>li:last-child {
        border: none;
        padding-bottom: 0;
      }
    }
  }

  .context-controls-trigger {
    position: relative;
    border: 1px solid red;
    z-index: 105;
  }

  .control-icon {
    border: none;
    background: none;

    padding: .4rem;
  }

  .form-control {
    opacity: 0.8;
    &:focus {
      opacity: 1;
    }
  }

  .interrupt {
    opacity: 1;
    transition: opacity 0.1s;
  }

  .interrupt-active {
    opacity: 0;
  }

  .volume-display {
    position: relative;
    top: ${volumeMeterHeight * 0.5}px;
    display: flex;
    align-items: flex-end;
    justify-content: start;
    min-width: ${({ videoWidth }) => (videoWidth <= breakpoints.md ? 21 : 32)}px;
    .meter-component {
      /* don't use media queries for this since we need to write the value
      in the body of the component */
      height: ${({ videoWidth }) => (videoWidth >= breakpoints.md ? largeHeight : smallHeight)}px;
      background-size: ${({ videoWidth }) => (videoWidth >= breakpoints.md ? largeHeight : smallHeight)}px;
      background-position: bottom;
      background-repeat: no-repeat;
      min-width: ${({ videoWidth }) => (videoWidth <= breakpoints.md ? 21 : 28)}px;
      position: absolute;
    }
    .meter-component-1 {
      background-image: url(${mic});
      z-index: 10;
    }
    .meter-component-2 {
      background-image: url(${micFill});
      z-index: 20;
    }
  }

  .alert-modal {
    position: absolute;
    z-index: 1000;
    display: flex;
    bottom: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    width: 100vw;
    min-height: 100vh; /* Leva em consideração a altura do cabeçalho e do rodapé */
    background: rgba(0,0,0,0.3);
  }
  .alert-modal-card {
    background: #FFF;
    padding-bottom: 2.5rem; /* altura do rodapé */
    border-radius: 5px;
  }

  .icon{
    background-color: #8bc53f;
    color: #fff;
    border-radius: 40px;
    margin-right: 10px;
    height: 70px;
    width: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover{
      background-color: #628c2a;
    }
    @media (max-width: 500px){
      height: 60px;
      width: 60px;
    }
  }

  .iconMute{
    background-color: #f2695c;
    border-radius: 40px;
    margin-right: 10px;
    height: 70px;
    width: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover{
      background-color: #bc493e;
    }
    @media (max-width: 500px){
      height: 60px;
      width: 60px;
    }
  }

  .iconPhone{
    background-color: #f2695c;
    border-radius: 40px;
    margin-right: 10px;
    height: 70px;
    width: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover{
      background-color: #bc493e;
    }
    @media (max-width: 500px){
      height: 60px;
      width: 60px;
    }
  }

  .size{
    @media (max-width: 500px){
      width: 20px !important;
      height: 20px !important;
    }
  }
`;
