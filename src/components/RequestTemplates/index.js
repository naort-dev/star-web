import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AutoComplete from 'components/Autosuggest';
import { Templates, FlexBox } from './styled';
import {
  getMobileOperatingSystem,
  checkMediaRecorderSupport,
  audioVideoSupport,
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
  occasion,
) {
  const isMobile = getMobileOperatingSystem();

  const checkDeviceSupport = async () => {
    const supportAudio = await audioVideoSupport('audioinput');
    return supportAudio;
  };
  const [supportAudio, updateDeviceSupport] = useState(false);

  useEffect(() => {
    checkDeviceSupport().then(result => {
      updateDeviceSupport(result);
    });
  }, []);

  const getTextInput = ({
    placeholder,
    value,
    audioFlg,
    onChange,
    state,
    forSelf,
    fullWidth,
    maxLength,
  }) => {
    const targetNM = state === 'hostName' ? 'for' : 'from';
    return (
      <Templates.InputWrapper fullWidth={fullWidth}>
        <TextInput
          label={placeholder}
          value={value}
          onChange={event => onChange(event.target.value, state)}
          InputProps={{
            classes: { input: 'input-field' },
          }}
          InputLabelProps={{ classes: { root: 'float-label' } }}
          nativeProps={{ maxLength }}
        />
        {bookingData.user === 'someoneElse' &&
          forSelf &&
          value === '' &&
          (occasion !== 13 && occasion !== 37) && (
            <Templates.Myself onClick={updateUserToMyself}>
              This video is for me!
            </Templates.Myself>
          )}
        <React.Fragment>
          {audioFlg &&
            value !== '' &&
            checkMediaRecorderSupport() &&
            supportAudio &&
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
    return (
      <Templates.InputWrapper fullWidth={fullWidth}>
        <AutoComplete
          placeholder={placeholder}
          onChange={onChange}
          list={bookingData.relationship}
          labelKey="title"
          valueKey="id"
          type="relationshipValue"
          value={value}
        />
      </Templates.InputWrapper>
    );
  };

  const getDatePicker = (
    placeholder,
    date,
    onChange,
    fullWidth,
    minDate,
    maxDate,
  ) => {
    return (
      <Templates.InputWrapper fullWidth={fullWidth}>
        <div className="datepickerWrapper">
          <DatePicker
            dateFormat="MMMM Do"
            withPortal
            minDate={minDate}
            maxDate={maxDate}
            customInput={
              <TextInput
                label={placeholder}
                InputProps={{ classes: { input: 'input-field' } }}
                InputLabelProps={{ classes: { root: 'float-label' } }}
                nativeProps={{ readOnly: true }}
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
    maxLength,
  ) => {
    return {
      placeholder,
      audioFlg,
      onChange: handleInputChange,
      value: valFun ? bookingData.hostName : bookingData[state],
      state,
      forSelf,
      fullWidth,
      maxLength,
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
  const getSpecification = (placeholder, state, fullWidth, isAudio) => {
    return getTextInput(
      getFiledProps(placeholder, isAudio, false, state, false, fullWidth),
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
              {getRelationship()} {getDate(true)}
            </FlexBox>
          );
          pageDetails.push(page1);
          pageDetails.push(page2);
        } else {
          const page1 = (
            <FlexBox>
              {getVideoFor('hostName', true)}
              {getDate(true)}
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
                    false,
                    false,
                  )}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getVideoFor('hostName', true)}
                  {getSpecification(
                    "Who's the guest of honor?",
                    'specification',
                    true,
                    false,
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
                "Who's the guest of honor?",
                'specification',
                false,
                false,
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
                "Who's the guest of honor?",
                'specification',
                false,
                false,
              )}
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
                    false,
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
                false,
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
                false,
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
          const page3 = <FlexBox>{getDate(true)}</FlexBox>;
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
              {getDate(true)}
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
                  52,
                ),
              )}
              {getTextInput(
                getFiledProps(
                  "Who's hosting the event?",
                  true,
                  false,
                  'hostName',
                ),
              )}
              {getDatePicker(
                'When is the event?',
                bookingData.date,
                handleInputChange,
                false,
                new Date(),
                null,
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
                  52,
                ),
              )}
              {getTextInput(
                getFiledProps(
                  "Who's hosting the event?",
                  true,
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
                true,
                new Date(),
                null,
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
                  true,
                  false,
                  'hostName',
                ),
              )}
              {getDatePicker(
                'When is the event?',
                bookingData.date,
                handleInputChange,
                false,
                new Date(),
                null,
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
                  true,
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
                true,
                new Date(),
                null,
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
