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
  return (
    <Layout>
      <SubHeader heading="Promote Myself" onClick={goBack} />
      <Card className="card-layout">
        {getNote()}
        <TemplateList>
          <section className="template-wrap">
            <PromoTemplate
              template={
                '<section style="background-image:url(.../../assets/images/profilebackground.svg); width: 265px; height: 265px; background-size: contain; display: inline-block; background-repeat: no-repeat; border-radius: 20px; box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.16);"/>'
              }
            />
            {getSocial()}
          </section>
          <section className="template-wrap">
            <PromoTemplate
              template={
                '<section style="background-image:url(../../assets/images/bluebackground.svg); width: 265px; height: 265px; background-size: contain; display: inline-block; background-repeat: no-repeat; box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.16);"/>'
              }
            />
            {getSocial()}
          </section>
          <section className="template-wrap">
            <PromoTemplate
              template={
                '<section style="background-image:url(.../../assets/images/crowdbackground.svg); width: 265px; height: 265px; background-size: contain; display: inline-block; background-repeat: no-repeat; box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.16);"/>'
              }
            />
            {getSocial()}
          </section>
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
                <PromoTemplate
                  template={
                    '<section style="background-image:url(.../../assets/images/profilebackground.svg); width: 265px; height: 265px; background-size: contain; display: inline-block; background-repeat: no-repeat; border-radius: 20px; box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.16);"/>'
                  }
                />
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
                <PromoTemplate
                  template={
                    '<section style="background-image:url(../../assets/images/bluebackground.svg); width: 265px; height: 265px; background-size: contain; display: inline-block; background-repeat: no-repeat; box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.16);"/>'
                  }
                />
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
                <PromoTemplate
                  template={
                    '<section style="background-image:url(.../../assets/images/crowdbackground.svg); width: 265px; height: 265px; background-size: contain; display: inline-block; background-repeat: no-repeat; box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.16);"/>'
                  }
                />
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
