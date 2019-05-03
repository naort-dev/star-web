import React from 'react'
import styled from 'styled-components'

export const PageWrapper = styled.div`
  width: 100%;
  background: rgb(246, 246, 246);
`

export const PageContainer= styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0px auto;
  margin-top: 143px;
  section {
    width:100%;
  }
  @media (max-width: 1279px) {
    max-width: 80%;
    margin-top: 259px;
  }

  @media (max-width: 831px) {
    max-width: 100%;
    padding: 0 10px;
    margin-top: 126px;
  }
`

export const CoverBoxWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  max-width: 100%;
  padding: 0 0px 0px;
  list-style-type: none;
  margin: 0px;
  border-top:1px solid #707271;
`

export const BoxListing = styled.li`
  display: flex;
  justify-content: center;
  padding-right: 10px;
  padding-bottom: 35px;
  width: 20%; 

  @media (max-width: 1280px) {
    width: 25%;
  }

  @media (max-width: 1080px) {
    width: 33.3333%;
  }

  @media (max-width: 768px) {
    width: 50%;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding-right: 0;
  }
`

export const BoxListingCover = styled.section`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 200px;
`
 
export const TopCoverBox = styled.div`
  width: 200px;
  height: 200px;
  display: block;
  box-shadow: rgba(0, 0, 0, 0.16) 3px 3px 10px 0px;
  position: relative;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  border-radius: 50%;
  ${props => {
    if (props.bgImage) {
      return `background: url(${props.bgImage})  center center / cover no-repeat`
    }
    return 'background: #ccc'
  }};
  background-position: center center;
`

export const PlayButton = ({ className }) => (
  <div className={className}>
   <span>
      <img src="./assets/images/play.svg" />
    </span>
  </div>
)

export const StyledPlayButton =  styled(PlayButton)`
  position: absolute;
  bottom: 7.5px;
  left: 0px;
  right: 0px;
  text-align: center;

  span {
    width: 26.4px;
    height: 26.4px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    font-size: 14px;
    color: rgb(255, 108, 88);
    background: rgba(255, 255, 255, 0.5);
    margin: 0px auto;
    border-radius: 50%;

    img {
      width: 100%;
      max-width: 13px;
    }
  }
`

export const BottomCoverBox = styled.div`
  padding-top: 0.2px;
  font-family: Avenir-Light;
  display: flex;
  align-items: flex-end;
  margin-top: 8px;
  flex-direction: column;
  border-top: 1px solid rgb(204, 204, 204);
  text-align: left;
  max-width: 100%;
`

export const SecondaryHeading = styled.p`
  font-family: Avenir-Regular;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 3px;
  width: 100%;
  padding-top: 7px;
  overflow: hidden;
  font-size: 13px;
  text-align: left;
`

export const TitlePricingBox = ({ className, title, pricing }) => (
  <div className={className}>
    <div className="title-box">
      {title}
    </div>
    <div className="pricing-box">
      {pricing}
    </div>
  </div>
)

export const StyledTitlePricingBox = styled(TitlePricingBox)`
  display: block;
  width: 100%;

  .title-box {
    display: inline-block;
    color: rgb(47, 131, 157);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 1.41;
    font-size: 17px;
    font-family: Avenir-Bold;
    width: calc(100% - 50px);
    text-align: left;
  }

  .pricing-box {
    display: inline-block;
    line-height: 1.41;
    vertical-align: top;
    color: rgb(85, 85, 85);
    font-family: Avenir-Medium;
    font-size: 17px;
    text-align: right;
    width: 50px;
  }
`

export const InfoHeader = styled.div`
  max-width:664px;
  margin: 0 auto;
  text-align:center;
  position: relative;
  z-index: 2;
  padding-top: 40px;

  img {
    max-width: 315px;
    margin-bottom: 16px;
  }
 
`

export const CardInfo = ({ className, Infotext, InfoHeading  }) => (
  <div className={className}>
    <p>{Infotext}</p>
    <h2 className="head-link">{InfoHeading}</h2>
  </div>
)

export const StyledCardInfo = styled(CardInfo)`
  p{
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.44;
    letter-spacing: normal;
    text-align: left;
    color:#555;
  }

  .head-link {
    font-size: 30px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 0.93;
    letter-spacing: normal;
    text-align: center;
    color: #2f839d  ;
    margin: 10px 0 20px;
    text-decoration: none;
    display: inline-block;
  }
`

export const CoverWrap = styled.div`
  width:100%;
  position: relative;
  background: url(./assets/images/star-02.svg) no-repeat;
  background-size: auto;
  background-position: 70% 30%;

  @media (max-width: 1080px) {
    background-position: 80% 30%;
  }

  @media (max-width: 768px) {
    background-position: 95% 30%;
  }

  @media (max-width: 480px) {
    background-position: 101% 4%;
  }

  &:before {
    content: url(./assets/images/star-01.svg);
    position: absolute;
    top: 20px;
    left: 18%;
    z-index: 0;

    @media (max-width: 768px) {
      left: 0;
    }
  }

  &:after {
    content: url(./assets/images/star-03.svg);
    position: absolute;
    bottom: 20px;
    right: 18%;
    z-index: 0;

    @media (max-width: 768px) {
      bottom: 6px;
      right: 0;
    }
  }
`

export const LoaderWrapper = styled.div`
  height: calc(100% - 95px);
  padding: 20px 16px;
  @media(min-width: 1025px) {
    height: calc(100% - 79px);
    padding: 20px 0;
  }
  @media(min-width: 1920px) {
    padding-top: 32px;
  }
`;

