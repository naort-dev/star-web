import React from 'react';
import PropTypes from 'prop-types';
import SubHeader from 'components/SubHeader';
import { Card } from 'styles/CommonStyled';
import PromoTemplate from 'components/PromoTemplates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { Layout, TemplateList, Accordion } from './styled';

let template1 =
  '<span class="img-back" style="background-image:url(.../../assets/images/profilebackground.svg); width: 265px; height: 265px; background-size: contain; display: inline-block; background-repeat: no-repeat; border-radius: 20px; box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.16);"></span><span style="background-image:url(@@prof-pic@@);width: 118px;height: 118px;background-size: contain;display: inline-block;background-repeat: no-repeat; position: absolute;left: 74px; top: 65px;"></span><span class="user-name" style="position: absolute;left: 0;text-align: center;display: inline-block;width: 100%;bottom: 80px;font-size: 18px;color: #ff6c58;font-family: Gilroy;">@@user-name@@</span>';
let template2 =
  '<span class="img-back" style="background-image:url(.../../assets/images/bluebackground.svg); width: 265px; height: 265px; background-size: contain; display: inline-block; background-repeat: no-repeat; border-radius: 20px; box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.16);"></span><span style="background-image:url(@@prof-pic@@);width: 118px;height: 118px;background-size: contain;display: inline-block;background-repeat: no-repeat; position: absolute;left: 74px; top: 43px; border-radius: 50%;"></span>';
let template3 =
  '<span class="img-back" style="background-image:url(.../../assets/images/crowdbackground.svg); width: 265px; height: 265px; background-size: contain; display: inline-block; background-repeat: no-repeat; border-radius: 20px; box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.16);"></span><span style="background-image:url(@@prof-pic@@);width: 102px;height: 102px;background-size: contain;display: inline-block;background-repeat: no-repeat; position: absolute;left: 76px; top: 120px; border-radius: 50%;"></span> <span class="user-name" style=" position: absolute;left: 0;text-align: center;display: inline-block;width: 100%;top: 70px;font-size: 21px;color: #555;font-family: Gilroy-Semibold; text-transform: uppercase;">@@user-name@@</span><span style="position: absolute;left: 0;text-align: center;display: inline-block;width: 100%;top: 98px;font-size: 15px;color: #555;font-family: Gilroy-Semibold;">IS ON STARSONA!</span>';
const profilePic = '../../assets/images/default-cover.jpg';
const userName = 'NAME NAME';

const PromoTools = props => {
  const goBack = () => {};
  const getSocial = () => {
    return (
      <React.Fragment>
        <span className="share-text">Where do you want to share this?</span>
        <section className="social-wrap">
          <FontAwesomeIcon icon={faFacebookF} className="social-icon" />
          <FontAwesomeIcon icon={faTwitter} className="social-icon" />
          <FontAwesomeIcon icon={faInstagram} className="social-icon" />
        </section>
      </React.Fragment>
    );
  };

  const getNote = () => {
    return (
      <React.Fragment>
        <h2 className="promo-head">How do I increase my bookings?</h2>
        <p className="promo-note">
          Simply select your graphic, and then choose which social media
          platform to share it on!
        </p>
      </React.Fragment>
    );
  };

  template1 = template1.replace('@@prof-pic@@', profilePic);
  template2 = template2.replace('@@prof-pic@@', profilePic);
  template3 = template3.replace('@@prof-pic@@', profilePic);
  template1 = template1.replace('@@user-name@@', userName);
  template2 = template2.replace('@@user-name@@', userName);
  template3 = template3.replace('@@user-name@@', userName);
  return (
    <Layout>
      <SubHeader heading="Promote Myself" onClick={goBack} />
      <Card className="card-layout">
        {getNote()}
        <TemplateList>
          <li className="template-wrap">
            <PromoTemplate template={template1} />
            {getSocial()}
          </li>
          <li className="template-wrap">
            <PromoTemplate template={template2} />
            {getSocial()}
          </li>
          <li className="template-wrap">
            <PromoTemplate template={template3} />
            {getSocial()}
          </li>
        </TemplateList>
      </Card>

      <Accordion>
        <Card className="card-mob">{getNote()}</Card>
        <Card className="card-mob">
          <ExpansionPanel
            defaultExpanded
            classes={{ root: 'collapse-root', expanded: 'collapse-exp' }}
          >
            <ExpansionPanelSummary
              classes={{
                root: 'collapse-head',
                expandIcon: 'fontawesome-icons',
              }}
              expandIcon={
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="collapse-arrow"
                />
              }
            >
              Option 1
            </ExpansionPanelSummary>
            <ExpansionPanelDetails classes={{ root: 'collapse-details' }}>
              <section className="template-wrap">
                <PromoTemplate template={template1} />
                {getSocial()}
              </section>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            classes={{ root: 'collapse-root', expanded: 'collapse-exp' }}
          >
            <ExpansionPanelSummary
              classes={{
                root: 'collapse-head',
                expandIcon: 'fontawesome-icons',
              }}
              expandIcon={
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="collapse-arrow"
                  classes={{ root: 'fontawesome-icon' }}
                />
              }
            >
              Option 2
            </ExpansionPanelSummary>
            <ExpansionPanelDetails classes={{ root: 'collapse-details' }}>
              <section className="template-wrap">
                <PromoTemplate template={template2} />
                {getSocial()}
              </section>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            classes={{ root: 'collapse-root', expanded: 'collapse-exp' }}
          >
            <ExpansionPanelSummary
              classes={{
                root: 'collapse-head',
                expandIcon: 'fontawesome-icons',
              }}
              expandIcon={
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="collapse-arrow"
                  classes={{ root: 'fontawesome-icon' }}
                />
              }
            >
              Option 3
            </ExpansionPanelSummary>
            <ExpansionPanelDetails classes={{ root: 'collapse-details' }}>
              <section className="template-wrap">
                <PromoTemplate template={template3} />
                {getSocial()}
              </section>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Card>
      </Accordion>
    </Layout>
  );
};

PromoTools.propTypes = {};

export default PromoTools;
