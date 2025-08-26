import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import {
  Escape,
  Share,
  ThreeDotsVertical,
  X,
} from 'react-bootstrap-icons';
import {
  logoAltText, transparentHeader, headerHeight, logoLink,
} from '../config';

function Header({
  className,
}) {
  const originalShareCopy = 'Copiar link';
  const [shareCopy, setShareCopy] = useState(originalShareCopy);

  const shareDP = async () => {
    const url = window.location;
    try {
      await navigator.share({ url });
    } catch {
      const type = 'text/plain';
      const blob = new Blob([url], { type });
      const data = [new window.ClipboardItem({ [type]: blob })];
      navigator.clipboard.write(data);
      setShareCopy('Link copied!');
      setTimeout(() => setShareCopy(originalShareCopy), 3000);
    }
  };

  const handleExternalNavigate = () => {
    fetch('https://pessoadigital.digitalsolvers.com/cellera', { cache: 'no-store' })
      .then(() => {
        window.location.href = 'https://pessoadigital.digitalsolvers.com/cellera';
      });
  };

  const [showContextMenu, setShowContextMenu] = useState(false);
  const iconSize = 24;

  // const {
  //   highlightMenu,
  // } = useSelector((state) => ({ ...state.sm }));

  return (
    <div className={`${className}`}>
      <div className="cont">
        <div className="row boxCont">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              {/* left align */}
              <Link to={logoLink}>
                <img src="https://cellerafarma.com.br/wp-content/uploads/2024/02/cellera-farma-logo-footer.png" className="logo position-relative" alt={logoAltText} />
              </Link>
            </div>
            <div>
              {/* middle align */}
            </div>
            <div>
              <div className="context-control-parent d-flex direction ">
                {/* menu mais opções */}
                <button
                  className="control-icon context-controls-trigger"
                  type="button"
                  aria-label="Mais opções"
                  data-tip="Mais opções"
                  id="dpChatDropdown"
                  onClick={() => setShowContextMenu(!showContextMenu)}
                >
                  {showContextMenu ? (
                    null
                  ) : (
                    <ThreeDotsVertical size={iconSize} color="#fff" />
                  )}
                </button>
                {showContextMenu ? (
                  <div className="context-controls shadow">
                    <div className="blue">
                      <button
                        className="control-icon context-controls-trigger"
                        type="button"
                        aria-label="Mais opções"
                        data-tip="Mais opções"
                        id="dpChatDropdown"
                        onClick={() => setShowContextMenu(!showContextMenu)}
                      >
                        {showContextMenu ? (
                          <X size={iconSize} color="#fff" />
                        ) : (
                          null
                        )}
                      </button>
                      <ul className="list">
                        <li>
                          <button
                            className="btn-unstyled"
                            type="button"
                            onClick={handleExternalNavigate}
                          >
                            <Escape size={20} />
                            {' '}
                            Encerrar sessão
                          </button>
                        </li>
                        <li>
                          <button
                            className="btn-unstyled"
                            type="button"
                            onClick={() => shareDP()}
                          >
                            <Share size={20} />
                            {' '}
                            {shareCopy}
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Header.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(Header)`
  position: relative;
  z-index: 20;
  top: 0;
  width: 100%;
  background-color: ${transparentHeader ? 'none' : '#FFFFFF'};

  &>.row {
    height: ${headerHeight};
  }

  .cont{
    display: flex;
    justify-content: center;
  }

  .boxCont{
    width: 90%;
  }

  .shadow{
    height: 100vh;
    display: flex;
    width: 101vw;
    position: absolute;
    z-index: 99;
    left: 0%;
    top: 0px;
    background-color: rgb(0 0 0 / 43%);
    justify-content: flex-end;
  }
  .blue{
    background-color: #15bda0;
    width: 20%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    /* gap: 0px; */
    flex-direction: column;
  }
  .list{
    list-style-type: none;
    width: 100%;
    padding: 0;
    margin: 0;
  }
  .btn-unstyled{
    color: #fff;
    height: 75px;
    width: 100%;
    font-size: 20px;

    &:hover {
      background-color: #0e8e78;
    }
  }

  .control-icon {
    border: none;
    background: none;

    padding: .4rem;
  }

  .direction {
    flex-direction: row-reverse;
  }

  .context-controls-trigger {
    position: relative;
    z-index: 106;
  }

  .logo {
    margin-top: 20px;

    /* imagem do logotipo com restrição de altura */
    // height: calc(0.4 * ${headerHeight});
    // width: auto;
    height: auto;
    max-width: 30vw;

    // Medium devices (tablets, 768px and up)
    @media (min-width: 768px) {
      height: calc(0.8 * ${headerHeight});
   }
  }
`;
