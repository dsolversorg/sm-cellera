import { createGlobalStyle } from 'styled-components';

export const primaryAccent = '#169ca9';
export const seconderyAccent = '#fff';

export default createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    width: 100vw;
    height: 100vh;
    overflow: hiden;
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
  }
  html, body {
      width: 100v%;
      height: 100%;
  }
  body {
      min-height: 100vh;
  }
  svg {
    vertical-align: -0.125em;
  }

  .btn.primary-accent {
    border: 1px solid ${primaryAccent};
    background: ${primaryAccent};
    color: ${seconderyAccent};
    text-align: center;
    width: 100%;
    max-width: 270px;
    height: auto;
    font-size: 15px;
    margin: 0;
    border-radius: 5px;
  }
  @media screen and (min-width: 768px) {
    .btn.primary-accent {
      max-width: 500px;
      font-size: 20px;
    }
  }

  .card{
    border: 1px solid ${primaryAccent};
    background: ${primaryAccent};
    color: ${seconderyAccent};
    text-align: center;
    font-size: 10px;
    width: 100%;
    max-width: 500px;
    height: auto;
    margin: 0;
    border-radius: 10px;
  }
  @media screen and (min-width: 768px) {
    .card {
      font-size: 10px;
    }
  }

  .h2{
    font-size: 15px;
    background: transparent;
  }    
  
  .form-check-input:checked {
    background-color: ${primaryAccent};
    border-color: ${primaryAccent};
  }
  .btn-unstyled {
    border: none;
    background: none;
  }

  .error-modal {
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    background: rgba(0,0,0,0.2);

    .error-modal-card {
      background: #FFF;
      border: 1px solid rgba(0,0,0,0.2);
      border-radius: 10px;
      max-width: 30rem;
      padding: 1rem;
    }
    .error-modal-inner {
      padding: 1rem;
    }
  }
`;
