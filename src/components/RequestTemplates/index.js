import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { Templates, FlexBox } from './styled';
import {
  getMobileOperatingSystem,
  checkMediaRecorderSupport,
} from '../../utils/checkOS';
import AudioRecorder from '../AudioRecorder';
import { TextInput } from '../../components/TextField';

function RequestTemplates(
  templateType,
  bookingData,
  audioRecorder,
  saveAudioRecording,
  resetRecording,
) {
  const isMobile = getMobileOperatingSystem();
  const videoForValue = () => {
    let value = '';
    if (bookingData.hostName) {
      value = bookingData.hostName;
    } else {
      value = bookingData.user === 'someoneElse' ? '' : 'YOU';
    }
    return value;
  };

  const getTextInput = ({
    placeholder,
    value,
    audioFlg,
    onChange,
    state,
    forSelf,
    tobeValidate,
  }) => {
    return (
      <Templates.InputWrapper>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value, state, tobeValidate)}
        />
        {bookingData.user === 'someoneElse' && forSelf && value === '' && (
          <Templates.Myself onClick={bookingData.updateUserToMyself}>
            This video is for me!
          </Templates.Myself>
        )}
        <React.Fragment>
          {audioFlg &&
            value !== '' &&
            !getMobileOperatingSystem() &&
            checkMediaRecorderSupport() &&
            (!window.navigator.userAgent.indexOf('MSIE ') > -1 &&
              !window.navigator.userAgent.indexOf('Trident/') > -1) && (
              <Templates.WrapsAudioInput>
                <AudioRecorder
                  key="for"
                  target="for"
                  audioRecorder={audioRecorder}
                  saveAudioRecording={(target, audio) =>
                    saveAudioRecording(target, audio)
                  }
                  resetRecording={target => resetRecording(target)}
                />
                <span className="recText">Pronounce Name</span>
              </Templates.WrapsAudioInput>
            )}
        </React.Fragment>
      </Templates.InputWrapper>
    );
  };
  const getSelect = (placeholder, value, onChange) => {
    const optionItems =
      bookingData.relationship &&
      bookingData.relationship.map(relation => (
        <MenuItem value={relation.id} key={relation.id}>
          {relation.title}
        </MenuItem>
      ));
    return (
      <Templates.InputWrapper>
        <Templates.WrapsInput>
          <FormControl className="select-material">
            <InputLabel htmlFor="reln-helper">{placeholder}</InputLabel>
            <Select
              value={value}
              onChange={event =>
                onChange(event.target.value, 'relationshipValue')
              }
              inputProps={{
                id: 'reln-helper',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {optionItems}
              <MenuItem value="otherRelation" key="otherRelation">
                Other
              </MenuItem>
            </Select>
          </FormControl>
        </Templates.WrapsInput>
      </Templates.InputWrapper>
    );
  };
  const getDatePicker = (placeholder, date, onChange) => {
    return (
      <Templates.InputWrapper>
        <Templates.Label>{placeholder}</Templates.Label>
        <Templates.WrapsInput>
          <DatePicker
            dateFormat="LL"
            withPortal
            customInput={<Templates.Input />}
            popperPlacement="bottom"
            selected={date}
            onChange={dt => onChange(dt, 'date')}
            placeholderText="Enter date"
          />
        </Templates.WrapsInput>
      </Templates.InputWrapper>
    );
  };
  const getFiledProps = (placeholder, audioFlg, valFun, state, forSelf) => {
    return {
      placeholder,
      audioFlg,
      onChange: bookingData.handleInputChange,
      value: valFun ? videoForValue() : bookingData[state],
      state,
      forSelf,
    };
  };

  const getVideoFor = state => {
    return getTextInput(
      getFiledProps('Who is this video for?', true, true, state, true),
    );
  };
  const getVideoFrom = state => {
    return getTextInput(
      getFiledProps('Who is this video from?', true, false, state, false),
    );
  };
  const getSpecification = (placeholder, state) => {
    return getTextInput(getFiledProps(placeholder, false, false, state));
  };

  const getRelationship = () => {
    return getSelect(
      'Relationship',
      bookingData.relationshipValue,
      bookingData.handleInputChange,
    );
  };
  const getDate = () => {
    return getDatePicker(
      'Date',
      bookingData.date,
      bookingData.handleInputChange,
    );
  };
  const renderTemplates = () => {
    const pageDetails = [];
    switch (templateType) {
      case 1:
        if (!isMobile) {
          const page1 = (
            <FlexBox>
              {bookingData.user === 'someoneElse' ? (
                <React.Fragment>
                  {getVideoFor('hostName')}
                  {getVideoFrom('userName')}
                  {getRelationship()}
                  {getDate()}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getVideoFor('hostName')}
                  {getDate()}
                </React.Fragment>
              )}
            </FlexBox>
          );
          pageDetails.push(page1);
        } else if (bookingData.user === 'someoneElse') {
          const page1 = (
            <FlexBox>
              {getVideoFor('hostName')} {getVideoFrom('userName')}
            </FlexBox>
          );
          const page2 = (
            <FlexBox>
              {getRelationship()} {getDate()}
            </FlexBox>
          );
          pageDetails.push(page1);
          pageDetails.push(page2);
        } else {
          const page1 = (
            <FlexBox>
              {getVideoFor('hostName')}
              {getDate()}
            </FlexBox>
          );
          pageDetails.push(page1);
        }
        return pageDetails;
      case 2:
        if (!isMobile) {
          const page1 = (
            <FlexBox>
              {bookingData.user === 'someoneElse' ? (
                <React.Fragment>
                  {getVideoFor('hostName')}
                  {getVideoFrom('userName')}
                  {getRelationship()}
                  {getSpecification(
                    "Who's the guest of honor?",
                    'specification',
                  )}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getVideoFor('hostName')}
                  {getSpecification(
                    "Who's the guest of honor?",
                    'specification',
                  )}
                </React.Fragment>
              )}
            </FlexBox>
          );
          pageDetails.push(page1);
        } else if (bookingData.user === 'someoneElse') {
          const page1 = (
            <FlexBox>
              {getVideoFor('hostName')} {getVideoFrom('userName')}
            </FlexBox>
          );
          const page2 = (
            <FlexBox>
              {getRelationship()}
              {getSpecification("Who's the guest of honor?", 'specification')}
            </FlexBox>
          );
          pageDetails.push(page1);
          pageDetails.push(page2);
        } else {
          const page1 = (
            <FlexBox>
              {getVideoFor('hostName')}
              {getSpecification("Who's the guest of honor?", 'specification')}
            </FlexBox>
          );
          pageDetails.push(page1);
        }
        return pageDetails;
      case 3:
        if (!isMobile) {
          const page1 = (
            <FlexBox>
              {bookingData.user === 'someoneElse' ? (
                <React.Fragment>
                  {getVideoFor('hostName')}
                  {getVideoFrom('userName')}
                  {getRelationship()}
                  {getSpecification(
                    `What is this ${bookingData.eventName} for`,
                    'specification',
                  )}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getVideoFor('hostName')}
                  {getSpecification(
                    `What is this ${bookingData.eventName} for`,
                    'specification',
                  )}
                </React.Fragment>
              )}
            </FlexBox>
          );
          pageDetails.push(page1);
        } else if (bookingData.user === 'someoneElse') {
          const page1 = (
            <FlexBox>
              {getVideoFor('hostName')} {getVideoFrom('userName')}
            </FlexBox>
          );
          const page2 = (
            <FlexBox>
              {getRelationship()}
              {getSpecification(
                `What is this ${bookingData.eventName} for`,
                'specification',
              )}
            </FlexBox>
          );
          pageDetails.push(page1);
          pageDetails.push(page2);
        } else {
          const page1 = (
            <FlexBox>
              {getVideoFor('hostName')}
              {getSpecification(
                `What is this ${bookingData.eventName} for`,
                'specification',
              )}
            </FlexBox>
          );
          pageDetails.push(page1);
        }
        return pageDetails;
      case 4:
        if (!isMobile) {
          const page1 = (
            <FlexBox>
              {bookingData.user === 'someoneElse' ? (
                <React.Fragment>
                  {getVideoFor('hostName')}
                  {getVideoFrom('userName')}
                  {getRelationship()}
                  {getTextInput(
                    getFiledProps('For what', false, false, 'specification'),
                  )}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getVideoFor('hostName')}
                  {getTextInput(
                    getFiledProps('For what', false, false, 'specification'),
                  )}
                </React.Fragment>
              )}
            </FlexBox>
          );
          pageDetails.push(page1);
        } else if (bookingData.user === 'someoneElse') {
          const page1 = (
            <FlexBox>
              {getVideoFor('hostName')} {getVideoFrom('userName')}
            </FlexBox>
          );
          const page2 = (
            <FlexBox>
              {getRelationship()}
              {getTextInput(
                getFiledProps('For what', false, false, 'specification'),
              )}
            </FlexBox>
          );
          pageDetails.push(page1);
          pageDetails.push(page2);
        } else {
          const page1 = (
            <FlexBox>
              {getVideoFor('hostName')}
              {getTextInput(
                getFiledProps('For what', false, false, 'specification'),
              )}
            </FlexBox>
          );
          pageDetails.push(page1);
        }
        return pageDetails;
      case 5:
        if (!isMobile) {
          if (bookingData.user === 'someoneElse') {
            const page1 = (
              <FlexBox>
                {getVideoFor('hostName')}
                {getVideoFrom('userName')}
                {getRelationship()}
                {getTextInput(
                  getFiledProps('From where', false, false, 'specification'),
                )}
              </FlexBox>
            );
            const page2 = <FlexBox>{getDate()}</FlexBox>;
            pageDetails.push(page1);
            pageDetails.push(page2);
          } else {
            const page1 = (
              <FlexBox>
                {getVideoFor('hostName')}
                {getTextInput(
                  getFiledProps('From where', false, false, 'specification'),
                )}
                {getDate()}
              </FlexBox>
            );
            pageDetails.push(page1);
          }
        } else if (bookingData.user === 'someoneElse') {
          const page1 = (
            <FlexBox>
              {getVideoFor('hostName')} {getVideoFrom('userName')}
            </FlexBox>
          );
          const page2 = (
            <FlexBox>
              {getRelationship()}
              {getTextInput(
                getFiledProps('From where', false, false, 'specification'),
              )}
            </FlexBox>
          );
          const page3 = <FlexBox>{getDate()}</FlexBox>;
          pageDetails.push(page1);
          pageDetails.push(page2);
          pageDetails.push(page3);
        } else {
          const page1 = (
            <FlexBox>
              {getVideoFor('hostName')}
              {getTextInput(
                getFiledProps('From where', false, false, 'specification'),
              )}
              {getDate()}
            </FlexBox>
          );
          pageDetails.push(page1);
        }
        return pageDetails;
      case 6:
        if (!isMobile) {
          const page1 = (
            <FlexBox>
              {getTextInput(
                getFiledProps(
                  'Title of the event?',
                  false,
                  false,
                  'specification',
                ),
              )}
              {getTextInput(
                getFiledProps(
                  "Who's hosting the event?",
                  false,
                  false,
                  'hostName',
                ),
              )}
              {getDatePicker(
                'When is the event?',
                bookingData.date,
                bookingData.handleInputChange,
              )}
            </FlexBox>
          );
          pageDetails.push(page1);
        } else {
          const page1 = (
            <FlexBox>
              {getTextInput(
                getFiledProps(
                  'Title of the event?',
                  false,
                  false,
                  'specification',
                ),
              )}
              {getTextInput(
                getFiledProps(
                  "Who's hosting the event?",
                  false,
                  false,
                  'hostName',
                ),
              )}
            </FlexBox>
          );
          const page2 = (
            <FlexBox>
              {getDatePicker(
                'When is the event?',
                bookingData.date,
                bookingData.handleInputChange,
              )}
            </FlexBox>
          );
          pageDetails.push(page1);
          pageDetails.push(page2);
        }
        return pageDetails;
      case 7:
        if (!isMobile) {
          const page1 = (
            <FlexBox>
              {getTextInput(
                getFiledProps(
                  "Who's the guest of honor?",
                  false,
                  false,
                  'specification',
                ),
              )}
              {getTextInput(
                getFiledProps(
                  "Who's hosting the event?",
                  false,
                  false,
                  'hostName',
                ),
              )}
              {getDatePicker(
                'When is the event?',
                bookingData.date,
                bookingData.handleInputChange,
              )}
            </FlexBox>
          );
          pageDetails.push(page1);
        } else {
          const page1 = (
            <FlexBox>
              {getTextInput(
                getFiledProps(
                  "Who's the guest of honor?",
                  false,
                  false,
                  'specification',
                ),
              )}
              {getTextInput(
                getFiledProps(
                  "Who's hosting the event?",
                  false,
                  false,
                  'hostName',
                ),
              )}
            </FlexBox>
          );
          const page2 = (
            <FlexBox>
              {getDatePicker(
                'When is the event?',
                bookingData.date,
                bookingData.handleInputChange,
              )}
            </FlexBox>
          );
          pageDetails.push(page1);
          pageDetails.push(page2);
        }
        return pageDetails;
      default:
        return [];
    }
  };
  return renderTemplates();
}
export default RequestTemplates;
