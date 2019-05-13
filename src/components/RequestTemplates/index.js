import React from 'react';
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
  handleInputChange,
  updateUserToMyself,
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
    fullWidth,
  }) => {
    const targetNM = state === 'hostName' ? 'for' : 'from';
    return (
      <Templates.InputWrapper fullWidth={fullWidth}>
        <TextInput
          label={placeholder}
          value={value}
          onChange={event => onChange(event.target.value, state, tobeValidate)}
          InputProps={{ classes: { input: 'input-field' } }}
        />
        {bookingData.user === 'someoneElse' && forSelf && value === '' && (
          <Templates.Myself onClick={updateUserToMyself}>
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
                  key={targetNM}
                  target={targetNM}
                  audioRecorder={audioRecorder}
                  saveAudioRecording={(target, audio) =>
                    saveAudioRecording(target, audio)
                  }
                  resetRecording={target => resetRecording(target)}
                />
              </Templates.WrapsAudioInput>
            )}
        </React.Fragment>
      </Templates.InputWrapper>
    );
  };
  const getSelect = (placeholder, value, onChange, fullWidth) => {
    const optionItems =
      bookingData.relationship &&
      bookingData.relationship.map(relation => (
        <MenuItem value={relation} key={relation.id}>
          {relation.title}
        </MenuItem>
      ));
    return (
      <Templates.InputWrapper fullWidth={fullWidth}>
        <FormControl className="select-material">
          <InputLabel htmlFor="reln-helper" classes={{ root: 'float-label' }}>
            {placeholder}
          </InputLabel>
          <Select
            value={value}
            onChange={event =>
              onChange(event.target.value, 'relationshipValue')
            }
            inputProps={{
              id: 'reln-helper',
            }}
            classes={{ select: 'input-field' }}
          >
            {optionItems}
            <MenuItem value="otherRelation" key="otherRelation" name="other">
              Other
            </MenuItem>
          </Select>
        </FormControl>
      </Templates.InputWrapper>
    );
  };

  const getDatePicker = (placeholder, date, onChange, fullWidth) => {
    return (
      <Templates.InputWrapper fullWidth={fullWidth}>
        <div className="datepickerWrapper">
          <DatePicker
            dateFormat="MMMM DD"
            withPortal
            customInput={
              <TextInput
                label={placeholder}
                InputProps={{ classes: { input: 'input-field' } }}
              />
            }
            customInputRef="dt"
            popperPlacement="bottom"
            selected={date}
            onChange={dt => onChange(dt, 'date')}
          />
        </div>
      </Templates.InputWrapper>
    );
  };
  const getFiledProps = (
    placeholder,
    audioFlg,
    valFun,
    state,
    forSelf,
    fullWidth,
  ) => {
    return {
      placeholder,
      audioFlg,
      onChange: handleInputChange,
      value: valFun ? videoForValue() : bookingData[state],
      state,
      forSelf,
      fullWidth,
    };
  };
  const getVideoFor = (state, fullWidth) => {
    return getTextInput(
      getFiledProps(
        'Who is this video for?',
        true,
        true,
        state,
        true,
        fullWidth,
      ),
    );
  };
  const getVideoFrom = (state, fullWidth) => {
    return getTextInput(
      getFiledProps(
        'Who is this video from?',
        true,
        false,
        state,
        false,
        fullWidth,
      ),
    );
  };
  const getSpecification = (placeholder, state, fullWidth) => {
    return getTextInput(
      getFiledProps(placeholder, false, false, state, fullWidth),
    );
  };
  const getRelationship = fullWidth => {
    return getSelect(
      'Relationship',
      bookingData.relationshipValue,
      handleInputChange,
      fullWidth,
    );
  };
  const getDate = fullWidth => {
    return getDatePicker(
      'Date',
      bookingData.date,
      handleInputChange,
      fullWidth,
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
                  {getVideoFor('hostName', true)}
                  {getDate(true)}
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
                  {getVideoFor('hostName', true)}
                  {getSpecification(
                    "Who's the guest of honor?",
                    'specification',
                    true,
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
                  {getVideoFor('hostName', true)}
                  {getSpecification(
                    `What is this ${bookingData.eventName} for`,
                    'specification',
                    true,
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
                  {getVideoFor('hostName', true)}
                  {getTextInput(
                    getFiledProps(
                      'For what',
                      false,
                      false,
                      'specification',
                      true,
                    ),
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
            const page2 = <FlexBox>{getDate(true)}</FlexBox>;
            pageDetails.push(page1);
            pageDetails.push(page2);
          } else {
            const page1 = (
              <FlexBox>
                {getVideoFor('hostName')}
                {getTextInput(
                  getFiledProps('From where', false, false, 'specification'),
                )}
                {getDate(true)}
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
                  'Name of the event',
                  false,
                  false,
                  'specification',
                  false,
                  true,
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
                handleInputChange,
              )}
            </FlexBox>
          );
          pageDetails.push(page1);
        } else {
          const page1 = (
            <FlexBox>
              {getTextInput(
                getFiledProps(
                  'Name of the event',
                  false,
                  false,
                  'specification',
                  false,
                  true,
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
                handleInputChange,
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
                  false,
                  true,
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
                handleInputChange,
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
                handleInputChange,
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
