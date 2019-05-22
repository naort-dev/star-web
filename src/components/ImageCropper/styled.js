import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

const CropperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (min-width: 832px) {
    width: 100%;
    height: auto;
    max-height: 100%;
  }
  .ReactCrop {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 100%;
  }

  .croppie-container {
    width: 100%;
    height: 100%;
  }

  .croppie-container .cr-image {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: 0 0;
    max-height: none;
    max-width: none;
  }

  .croppie-container .cr-boundary {
    position: relative;
    overflow: hidden;
    margin: 0 auto;
    z-index: 1;
    width: 100%;
    height: 262px;
    ${media.webView} {
      height: 487px;
    }
  }

  .croppie-container .cr-viewport,
  .croppie-container .cr-resizer {
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    box-shadow: 0 0 2000px 2000px rgba(0, 0, 0, 0.5);
    z-index: 0;
  }

  .croppie-container .cr-resizer {
    z-index: 2;
    box-shadow: none;
    pointer-events: none;
  }

  .croppie-container .cr-resizer-vertical,
  .croppie-container .cr-resizer-horisontal {
    position: absolute;
    pointer-events: all;
  }

  .croppie-container .cr-resizer-vertical::after,
  .croppie-container .cr-resizer-horisontal::after {
    display: block;
    position: absolute;
    box-sizing: border-box;
    border: 1px solid black;
    background: #fff;
    width: 10px;
    height: 10px;
    content: '';
  }

  .croppie-container .cr-resizer-vertical {
    bottom: -5px;
    cursor: row-resize;
    width: 100%;
    height: 10px;
  }

  .croppie-container .cr-resizer-vertical::after {
    left: 50%;
    margin-left: -5px;
  }

  .croppie-container .cr-resizer-horisontal {
    right: -5px;
    cursor: col-resize;
    width: 10px;
    height: 100%;
  }

  .croppie-container .cr-resizer-horisontal::after {
    top: 50%;
    margin-top: -5px;
  }

  .croppie-container .cr-original-image {
    display: none;
  }

  .croppie-container .cr-vp-circle {
    border-radius: 50%;
    border: 2px dashed #fff;
  }

  .croppie-container .cr-overlay {
    z-index: 1;
    position: absolute;
    cursor: move;
    touch-action: none;
  }

  .croppie-container .cr-slider-wrap {
    width: 75%;
    margin: 15px auto;
    text-align: center;
    display:none;
  }

  .croppie-result {
    position: relative;
    overflow: hidden;
  }

  .croppie-result img {
    position: absolute;
  }

  .croppie-container .cr-image,
  .croppie-container .cr-overlay,
  .croppie-container .cr-viewport {
    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }

  /*************************************/
  /***** STYLING RANGE INPUT ***********/
  /*************************************/
  /*http://brennaobrien.com/blog/2014/05/style-input-type-range-in-every-browser.html */
  /*************************************/

  .cr-slider {
    -webkit-appearance: none;
    /*removes default webkit styles*/
    /*border: 1px solid white; */ /*fix for FF unable to apply focus style bug */
    width: 300px;
    /*required for proper track sizing in FF*/
    max-width: 100%;
    padding-top: 8px;
    padding-bottom: 8px;
    background-color: transparent;
  }

  .cr-slider::-webkit-slider-runnable-track {
    width: 100%;
    height: 3px;
    background: rgba(0, 0, 0, 0.5);
    border: 0;
    border-radius: 3px;
  }

  .cr-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #ddd;
    margin-top: -6px;
  }

  .cr-slider:focus {
    outline: none;
  }
  /*
.cr-slider:focus::-webkit-slider-runnable-track {
background: #ccc;
}
*/

  .cr-slider::-moz-range-track {
    width: 100%;
    height: 3px;
    background: rgba(0, 0, 0, 0.5);
    border: 0;
    border-radius: 3px;
  }

  .cr-slider::-moz-range-thumb {
    border: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #ddd;
    margin-top: -6px;
  }

  /*hide the outline behind the border*/
  .cr-slider:-moz-focusring {
    outline: 1px solid white;
    outline-offset: -1px;
  }

  .cr-slider::-ms-track {
    width: 100%;
    height: 5px;
    background: transparent;
    /*remove bg colour from the track, we'll use ms-fill-lower and ms-fill-upper instead */
    border-color: transparent; /*leave room for the larger thumb to overflow with a transparent border */
    border-width: 6px 0;
    color: transparent; /*remove default tick marks*/
  }
  .cr-slider::-ms-fill-lower {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
  }
  .cr-slider::-ms-fill-upper {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
  }
  .cr-slider::-ms-thumb {
    border: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #ddd;
    margin-top: 1px;
  }
  .cr-slider:focus::-ms-fill-lower {
    background: rgba(0, 0, 0, 0.5);
  }
  .cr-slider:focus::-ms-fill-upper {
    background: rgba(0, 0, 0, 0.5);
  }
  /*******************************************/

  /***********************************/
  /* Rotation Tools */
  /***********************************/
  .cr-rotate-controls {
    position: absolute;
    bottom: 5px;
    left: 5px;
    z-index: 1;
  }
  .cr-rotate-controls button {
    border: 0;
    background: none;
  }
  .cr-rotate-controls i:before {
    display: inline-block;
    font-style: normal;
    font-weight: 900;
    font-size: 22px;
  }
  .cr-rotate-l i:before {
    content: '↺';
  }
  .cr-rotate-r i:before {
    content: '↻';
  }
`;

CropperStyled.ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  z-index: 1;
  position: relative;
  margin-top: 97px;
  ${media.webView}{
    transform: translateY(-50%);
    margin-top: 0;
  }
  .button {
    width: 250px;
    height: 60px;
  }
`;
CropperStyled.CropperLightButton = styled.button`
  cursor: pointer;
  background-color: #ededed;
  font-family: Gilroy-Medium;
  font-size: 18px;
  line-height: 1.5;
  text-align: center;
  color: #2f839d;
  padding: 15px;
  box-sizing: border-box;
  border: none;
  border-radius: 30px;
  min-width: 170px;
  height: 60px;
  outline: none;
  position: relative;
  &:hover {
    background-color: #2f839d;
    color: #ededed;
  }
`;

CropperStyled.UploadInput = styled.input`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  cursor: pointer;
  width: 100%;
`;

CropperStyled.CropperCancel = styled.span`
  display: block;
  padding: 11px 25px;
  color: #fff;
  cursor: pointer;
`;

export default CropperStyled;
