import React, { useState } from 'react';
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
  checkDevice,
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
  const [templateData, setTemplateData] = useState({
    type: templateType,
    relationship: bookingData.relationship,
    user: bookingData.user,
    eventname: bookingData.eventName,
    startDate: null,
  });

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
    onBlur,
    state,
  }) => {
    return (
      <Templates.InputWrapper>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value, state)}
          onBlur={event => onBlur(event.target.value)}
        />
        {audioFlg && (
          <React.Fragment>
            {!getMobileOperatingSystem() &&
            checkMediaRecorderSupport() &&
            (!window.navigator.userAgent.indexOf('MSIE ') > -1 &&
              !window.navigator.userAgent.indexOf('Trident/') > -1) ? (
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
              </Templates.WrapsAudioInput>
            ) : (
              <Templates.Myself onClick={bookingData.updateUserToMyself}>
                This video is for me!
              </Templates.Myself>
            )}
          </React.Fragment>
        )}
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
            onChange={onChange}
            placeholderText="Enter date"
          />
        </Templates.WrapsInput>
      </Templates.InputWrapper>
    );
  };

  const getFiledProps = (placeholder, audioFlg, valFun, state) => {
    return {
      placeholder,
      audioFlg,
      onChange: bookingData.handleInputChange,
      onBlur: bookingData.checkRequiredHostName,
      value: valFun ? videoForValue() : bookingData[state],
      state,
    };
  };

  const renderTemplates = () => {
    const relations = bookingData.relationship;
    const optionItems = relations.map(relation => (
      <MenuItem value={relation.id} key={relation.id}>
        {relation.title}
      </MenuItem>
    ));
    const pageDetails = [];
    switch (templateType) {
      case 1:
        if (!isMobile) {
          const page1 = (
            <FlexBox>
              {bookingData.user === 'someoneElse' ? (
                <React.Fragment>
                  {getTextInput(
                    getFiledProps(
                      'Who is this video for?',
                      true,
                      true,
                      'hostName',
                    ),
                  )}
                  {getTextInput(
                    getFiledProps(
                      'Who is this video from?',
                      true,
                      false,
                      'userName',
                    ),
                  )}
                  {getSelect(
                    'Relationship',
                    bookingData.relationshipValue,
                    bookingData.handleInputChange,
                  )}
                  {getDatePicker(
                    'Date',
                    bookingData.date,
                    bookingData.handleInputChange,
                  )}
                </React.Fragment>
              ) : (
                getDatePicker(
                  'Date',
                  bookingData.date,
                  bookingData.handleInputChange,
                )
              )}
            </FlexBox>
          );
          pageDetails.push(page1);
        } else if (bookingData.user === 'someoneElse') {
          const page1 = (
            <FlexBox>
              {
                (getTextInput(
                  getFiledProps(
                    'Who is this video for?',
                    true,
                    true,
                    'hostName',
                  ),
                ),
                getTextInput(
                  getFiledProps(
                    'Who is this video from?',
                    true,
                    false,
                    'userName',
                  ),
                ))
              }
            </FlexBox>
          );
          const page2 = (
            <FlexBox>
              {
                (getSelect(
                  'Relationship',
                  bookingData.relationshipValue,
                  bookingData.handleInputChange,
                ),
                getDatePicker(
                  'Date',
                  bookingData.date,
                  bookingData.handleInputChange,
                ))
              }
            </FlexBox>
          );
          pageDetails.push(page1);
          pageDetails.push(page2);
        } else {
          const page1 = (
            <FlexBox>
              {getDatePicker(
                'Date',
                bookingData.date,
                bookingData.handleInputChange,
              )}
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
                <Templates.InputWrapper>
                  <TextInput
                    placeholder="Who is this video for ?"
                    value={videoForValue()}
                    onChange={event =>
                      bookingData.handleInputChange(
                        event.target.value,
                        'hostName',
                      )
                    }
                    onBlur={event =>
                      bookingData.checkRequiredHostName(event.target.value)
                    }
                  />
                  {bookingData.enableAudioRecorder &&
                  !getMobileOperatingSystem() &&
                  checkMediaRecorderSupport() &&
                  (!window.navigator.userAgent.indexOf('MSIE ') > -1 &&
                    !window.navigator.userAgent.indexOf('Trident/') > -1) ? (
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
                    </Templates.WrapsAudioInput>
                  ) : (
                    <Templates.Myself onClick={bookingData.updateUserToMyself}>
                      This video is for me!
                    </Templates.Myself>
                  )}
                </Templates.InputWrapper>
              ) : (
                <Templates.InputWrapper>
                  <TextInput
                    placeholder="What specifically for"
                    value={bookingData.specification}
                    onChange={event =>
                      bookingData.handleInputChange(
                        event.target.value,
                        'specification',
                      )
                    }
                    onBlur={event =>
                      bookingData.checkRequiredWhatIsThisFor(event.target.value)
                    }
                  />
                </Templates.InputWrapper>
              )}
              {bookingData.user === 'someoneElse' ? (
                <Templates.InputWrapper>
                  <TextInput
                    placeholder="Who is this video from?"
                    value={bookingData.userName}
                    onChange={event =>
                      bookingData.handleInputChange(
                        event.target.value,
                        'userName',
                      )
                    }
                  />
                  {!getMobileOperatingSystem() &&
                  checkMediaRecorderSupport() &&
                  (!window.navigator.userAgent.indexOf('MSIE ') > -1 &&
                    !window.navigator.userAgent.indexOf('Trident/') > -1) ? (
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
                    </Templates.WrapsAudioInput>
                  ) : (
                    <Templates.Myself onClick={bookingData.updateUserToMyself}>
                      This video is for me!
                    </Templates.Myself>
                  )}
                </Templates.InputWrapper>
              ) : null}
              {bookingData.user === 'someoneElse' ? (
                <Templates.InputWrapper>
                  <Templates.WrapsInput>
                    <FormControl className="select-material">
                      <InputLabel
                        htmlFor="reln-helper"
                        className="select-label"
                      >
                        Relationship
                      </InputLabel>
                      <Select
                        value={bookingData.relationshipValue}
                        onChange={event =>
                          bookingData.handleInputChange(
                            event.target.value,
                            'relationshipValue',
                          )
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
              ) : null}
              {bookingData.user === 'someoneElse' ? (
                <Templates.InputWrapper>
                  <TextInput
                    placeholder="What specifically for"
                    value={bookingData.specification}
                    onChange={event =>
                      bookingData.handleInputChange(
                        event.target.value,
                        'specification',
                      )
                    }
                    onBlur={event =>
                      bookingData.checkRequiredWhatIsThisFor(event.target.value)
                    }
                  />
                </Templates.InputWrapper>
              ) : null}
            </FlexBox>
          );
          pageDetails.push(page1);
        } else {
          const page1 = (
            <FlexBox>
              {bookingData.user === 'someoneElse' ? (
                <Templates.InputWrapper>
                  <TextInput
                    placeholder="Who is this video for ?"
                    value={videoForValue()}
                    onChange={event =>
                      bookingData.handleInputChange(
                        event.target.value,
                        'hostName',
                      )
                    }
                    onBlur={event =>
                      bookingData.checkRequiredHostName(event.target.value)
                    }
                  />
                  {bookingData.enableAudioRecorder &&
                  !getMobileOperatingSystem() &&
                  checkMediaRecorderSupport() &&
                  (!window.navigator.userAgent.indexOf('MSIE ') > -1 &&
                    !window.navigator.userAgent.indexOf('Trident/') > -1) ? (
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
                    </Templates.WrapsAudioInput>
                  ) : (
                    <Templates.Myself onClick={bookingData.updateUserToMyself}>
                      This video is for me!
                    </Templates.Myself>
                  )}
                </Templates.InputWrapper>
              ) : (
                <Templates.InputWrapper>
                  <TextInput
                    placeholder="What specifically for"
                    value={bookingData.specification}
                    onChange={event =>
                      bookingData.handleInputChange(
                        event.target.value,
                        'specification',
                      )
                    }
                    onBlur={event =>
                      bookingData.checkRequiredWhatIsThisFor(event.target.value)
                    }
                  />
                </Templates.InputWrapper>
              )}
              {bookingData.user === 'someoneElse' ? (
                <Templates.InputWrapper>
                  <TextInput
                    placeholder="Who is this video from?"
                    value={bookingData.userName}
                    onChange={event =>
                      bookingData.handleInputChange(
                        event.target.value,
                        'userName',
                      )
                    }
                  />
                  {!getMobileOperatingSystem() &&
                  checkMediaRecorderSupport() &&
                  (!window.navigator.userAgent.indexOf('MSIE ') > -1 &&
                    !window.navigator.userAgent.indexOf('Trident/') > -1) ? (
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
                    </Templates.WrapsAudioInput>
                  ) : null}
                </Templates.InputWrapper>
              ) : null}
            </FlexBox>
          );
          const page2 = (
            <FlexBox>
              {bookingData.user === 'someoneElse' ? (
                <Templates.InputWrapper>
                  <Templates.WrapsInput>
                    <FormControl className="select-material">
                      <InputLabel
                        htmlFor="reln-helper"
                        className="select-label"
                      >
                        Relationship
                      </InputLabel>
                      <Select
                        value={bookingData.relationshipValue}
                        onChange={event =>
                          bookingData.handleInputChange(
                            event.target.value,
                            'relationshipValue',
                          )
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
              ) : null}
              {bookingData.user === 'someoneElse' ? (
                <Templates.InputWrapper>
                  <TextInput
                    placeholder="What specifically for"
                    value={bookingData.specification}
                    onChange={event =>
                      bookingData.handleInputChange(
                        event.target.value,
                        'specification',
                      )
                    }
                  />
                </Templates.InputWrapper>
              ) : null}
            </FlexBox>
          );
          pageDetails.push(page1);
          pageDetails.push(page2);
        }
        return pageDetails;

      case 3:
        if (!isMobile) {
          const page1 = (
            <FlexBox>
              <Templates.InputWrapper>
                <TextInput
                  placeholder="Who is this video for ?"
                  value={videoForValue()}
                  onChange={event =>
                    bookingData.handleInputChange(
                      event.target.value,
                      'hostName',
                    )
                  }
                  onBlur={event =>
                    bookingData.checkRequiredHostName(event.target.value)
                  }
                />
                {bookingData.enableAudioRecorder &&
                !getMobileOperatingSystem() &&
                checkMediaRecorderSupport() &&
                (!window.navigator.userAgent.indexOf('MSIE ') > -1 &&
                  !window.navigator.userAgent.indexOf('Trident/') > -1) ? (
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
                  </Templates.WrapsAudioInput>
                ) : (
                  <Templates.Myself onClick={bookingData.updateUserToMyself}>
                    This video is for me!
                  </Templates.Myself>
                )}
              </Templates.InputWrapper>
              {bookingData.user === 'someoneElse' ? (
                <Templates.InputWrapper>
                  <TextInput
                    placeholder="Who is this video from?"
                    value={bookingData.userName}
                    onChange={event =>
                      bookingData.handleInputChange(
                        event.target.value,
                        'userName',
                      )
                    }
                  />
                  {!getMobileOperatingSystem() &&
                  checkMediaRecorderSupport() &&
                  (!window.navigator.userAgent.indexOf('MSIE ') > -1 &&
                    !window.navigator.userAgent.indexOf('Trident/') > -1) ? (
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
                    </Templates.WrapsAudioInput>
                  ) : (
                    <Templates.Myself onClick={bookingData.updateUserToMyself}>
                      This video is for me!
                    </Templates.Myself>
                  )}
                </Templates.InputWrapper>
              ) : (
                <Templates.InputWrapper>
                  <TextInput
                    placeholder={`What is this ${bookingData.eventname} for`}
                    value={bookingData.specification}
                    onChange={event =>
                      bookingData.handleInputChange(
                        event.target.value,
                        'specification',
                      )
                    }
                    onBlur={event =>
                      bookingData.checkRequiredWhatIsThisFor(event.target.value)
                    }
                  />
                </Templates.InputWrapper>
              )}
              {bookingData.user === 'someoneElse' ? (
                <Templates.InputWrapper>
                  <Templates.WrapsInput>
                    <FormControl className="select-material">
                      <InputLabel htmlFor="reln-helper">
                        Relationship
                      </InputLabel>
                      <Select
                        value={bookingData.relationshipValue}
                        onChange={event =>
                          bookingData.handleInputChange(
                            event.target.value,
                            'relationshipValue',
                          )
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
              ) : null}
              {bookingData.user === 'someoneElse' ? (
                <Templates.InputWrapper>
                  <TextInput
                    placeholder={`What is this ${bookingData.eventName} for`}
                    value={bookingData.specification}
                    onChange={event =>
                      bookingData.handleInputChange(
                        event.target.value,
                        'specification',
                      )
                    }
                    onBlur={event =>
                      bookingData.checkRequiredWhatIsThisFor(event.target.value)
                    }
                  />
                </Templates.InputWrapper>
              ) : null}
            </FlexBox>
          );
          pageDetails.push(page1);
        } else {
          const page1 = (
            <FlexBox>
              <Templates.InputWrapper>
                <TextInput
                  placeholder="Who is this video for ?"
                  value={() => videoForValue}
                  onChange={event =>
                    bookingData.handleInputChange(
                      event.target.value,
                      'hostName',
                    )
                  }
                />
                {bookingData.enableAudioRecorder ? null : (
                  <Templates.Myself onClick={bookingData.updateUserToMyself}>
                    This video is for me!
                  </Templates.Myself>
                )}
              </Templates.InputWrapper>
              {bookingData.user === 'someoneElse' ? (
                <Templates.InputWrapper>
                  <TextInput
                    placeholder="Who is this video from?"
                    value={bookingData.userName}
                    onChange={event =>
                      bookingData.handleInputChange(
                        event.target.value,
                        'userName',
                      )
                    }
                  />
                  {!getMobileOperatingSystem() &&
                  checkMediaRecorderSupport() &&
                  (!window.navigator.userAgent.indexOf('MSIE ') > -1 &&
                    !window.navigator.userAgent.indexOf('Trident/') > -1) ? (
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
                    </Templates.WrapsAudioInput>
                  ) : null}
                </Templates.InputWrapper>
              ) : (
                <Templates.InputWrapper>
                  <TextInput
                    placeholder={`What is this ${bookingData.eventname} for`}
                    value={bookingData.specification}
                    onChange={event =>
                      bookingData.handleInputChange(
                        event.target.value,
                        'specification',
                      )
                    }
                  />
                </Templates.InputWrapper>
              )}
            </FlexBox>
          );
          const page2 = (
            <FlexBox>
              {bookingData.user === 'someoneElse' ? (
                <Templates.InputWrapper>
                  <Templates.WrapsInput>
                    <FormControl className="select-material">
                      <InputLabel
                        htmlFor="reln-helper"
                        className="select-label"
                      >
                        Relationship
                      </InputLabel>
                      <Select
                        value={bookingData.relationshipValue}
                        onChange={event =>
                          bookingData.handleInputChange(
                            event.target.value,
                            'relationshipValue',
                          )
                        }
                        className="select-material"
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
              ) : null}
              {bookingData.user === 'someoneElse' ? (
                <Templates.InputWrapper>
                  <TextInput
                    placeholder={`What is this ${bookingData.eventname} for`}
                    value={bookingData.specification}
                    onChange={event =>
                      bookingData.handleInputChange(
                        event.target.value,
                        'specification',
                      )
                    }
                  />
                </Templates.InputWrapper>
              ) : null}
            </FlexBox>
          );
          pageDetails.push(page1);
          pageDetails.push(page2);
        }
        return pageDetails;

      case 4:
        if (!isMobile) {
          const page1 = (
            <FlexBox>
              {bookingData.user === 'someoneElse' ? (
                <React.Fragment>
                  {getTextInput(
                    getFiledProps(
                      'Who is this video for?',
                      true,
                      true,
                      'hostName',
                    ),
                  )}
                  {getTextInput(
                    getFiledProps(
                      'Who is this video from?',
                      true,
                      false,
                      'userName',
                    ),
                  )}
                  {getSelect(
                    'Relationship',
                    bookingData.relationshipValue,
                    bookingData.handleInputChange,
                  )}
                  {getTextInput(
                    getFiledProps('For what', false, false, 'forWhat'),
                  )}
                </React.Fragment>
              ) : (
                getTextInput(getFiledProps('For what', false, false, 'forWhat'))
              )}
            </FlexBox>
          );
          pageDetails.push(page1);
        } else if (bookingData.user === 'someoneElse') {
          const page1 = (
            <FlexBox>
              {
                (getTextInput(
                  getFiledProps(
                    'Who is this video for?',
                    true,
                    true,
                    'hostName',
                  ),
                ),
                getTextInput(
                  getFiledProps(
                    'Who is this video from?',
                    true,
                    false,
                    'userName',
                  ),
                ))
              }
            </FlexBox>
          );
          const page2 = (
            <FlexBox>
              {
                (getSelect(
                  'Relationship',
                  bookingData.relationshipValue,
                  bookingData.handleInputChange,
                ),
                getTextInput(
                  getFiledProps('For what', false, false, 'forWhat'),
                ))
              }
            </FlexBox>
          );
          pageDetails.push(page1);
          pageDetails.push(page2);
        } else {
          const page1 = (
            <FlexBox>
              {getTextInput(getFiledProps('For what', false, false, 'forWhat'))}
            </FlexBox>
          );
          pageDetails.push(page1);
        }
        return pageDetails;

      case 5:
        if (!isMobile) {
          const page1 = (
            <FlexBox>
              {bookingData.user === 'someoneElse' ? (
                <Templates.InputWrapper>
                  <TextInput
                    placeholder="Who is this video for ?"
                    value={videoForValue()}
                    onChange={event =>
                      bookingData.handleInputChange(
                        event.target.value,
                        'hostName',
                      )
                    }
                    onBlur={event =>
                      bookingData.checkRequiredHostName(event.target.value)
                    }
                  />
                  {bookingData.enableAudioRecorder &&
                  !getMobileOperatingSystem() &&
                  checkMediaRecorderSupport() &&
                  (!window.navigator.userAgent.indexOf('MSIE ') > -1 &&
                    !window.navigator.userAgent.indexOf('Trident/') > -1) ? (
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
                    </Templates.WrapsAudioInput>
                  ) : (
                    <Templates.Myself onClick={bookingData.updateUserToMyself}>
                      This video is for me!
                    </Templates.Myself>
                  )}
                </Templates.InputWrapper>
              ) : (
                <Templates.InputWrapper>
                  <TextInput
                    placeholder="From Where"
                    value={bookingData.specification}
                    onChange={event =>
                      bookingData.handleInputChange(
                        event.target.value,
                        'specification',
                      )
                    }
                    onBlur={event =>
                      bookingData.checkRequiredWhatIsThisFor(event.target.value)
                    }
                  />
                </Templates.InputWrapper>
              )}
              {bookingData.user === 'someoneElse' ? (
                <Templates.InputWrapper>
                  <TextInput
                    placeholder="Who is this video from?"
                    value={bookingData.userName}
                    onChange={event =>
                      bookingData.handleInputChange(
                        event.target.value,
                        'userName',
                      )
                    }
                  />
                  {!getMobileOperatingSystem() &&
                  checkMediaRecorderSupport() &&
                  (!window.navigator.userAgent.indexOf('MSIE ') > -1 &&
                    !window.navigator.userAgent.indexOf('Trident/') > -1) ? (
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
                    </Templates.WrapsAudioInput>
                  ) : (
                    <Templates.Myself onClick={bookingData.updateUserToMyself}>
                      This video is for me!
                    </Templates.Myself>
                  )}
                </Templates.InputWrapper>
              ) : (
                <Templates.InputWrapper>
                  <TextInput
                    placeholder=""
                    type="date"
                    value={bookingData.date}
                    onChange={event =>
                      bookingData.handleInputChange(event.target.value, 'date')
                    }
                    onBlur={event =>
                      bookingData.checkRequiredWhatIsThisFor(event.target.value)
                    }
                  />
                </Templates.InputWrapper>
              )}
              {bookingData.user === 'someoneElse' ? (
                <Templates.InputWrapper>
                  <Templates.WrapsInput>
                    <FormControl className="select-material">
                      <InputLabel
                        htmlFor="reln-helper"
                        className="select-label"
                      >
                        Relationship
                      </InputLabel>
                      <Select
                        value={bookingData.relationshipValue}
                        onChange={event =>
                          bookingData.handleInputChange(
                            event.target.value,
                            'relationshipValue',
                          )
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
              ) : null}
              {bookingData.user === 'someoneElse' ? (
                <Templates.InputWrapper>
                  <TextInput
                    placeholder="From Where"
                    value={bookingData.specification}
                    onChange={event =>
                      bookingData.handleInputChange(
                        event.target.value,
                        'specification',
                      )
                    }
                    onBlur={event =>
                      bookingData.checkRequiredWhatIsThisFor(event.target.value)
                    }
                  />
                </Templates.InputWrapper>
              ) : null}
            </FlexBox>
          );
          pageDetails.push(page1);
          if (bookingData.user === 'someoneElse') {
            const page2 = (
              <Templates.InputWrapper>
                <TextInput
                  placeholder=""
                  type="date"
                  value={bookingData.date}
                  onChange={event =>
                    bookingData.handleInputChange(event.target.value, 'date')
                  }
                  onBlur={event =>
                    bookingData.checkRequiredWhatIsThisFor(event.target.value)
                  }
                />
              </Templates.InputWrapper>
            );
            pageDetails.push(page2);
          }
        } else {
          const page1 = (
            <FlexBox>
              {bookingData.user === 'someoneElse' ? (
                <Templates.InputWrapper>
                  <TextInput
                    placeholder="Who is this video for ?"
                    value={videoForValue()}
                    onChange={event =>
                      bookingData.handleInputChange(
                        event.target.value,
                        'hostName',
                      )
                    }
                    onBlur={event =>
                      bookingData.checkRequiredHostName(event.target.value)
                    }
                  />
                  {bookingData.enableAudioRecorder &&
                  !getMobileOperatingSystem() &&
                  checkMediaRecorderSupport() &&
                  (!window.navigator.userAgent.indexOf('MSIE ') > -1 &&
                    !window.navigator.userAgent.indexOf('Trident/') > -1) ? (
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
                    </Templates.WrapsAudioInput>
                  ) : (
                    <Templates.Myself onClick={bookingData.updateUserToMyself}>
                      This video is for me!
                    </Templates.Myself>
                  )}
                </Templates.InputWrapper>
              ) : (
                <Templates.InputWrapper>
                  <TextInput
                    placeholder="From Where"
                    value={bookingData.specification}
                    onChange={event =>
                      bookingData.handleInputChange(
                        event.target.value,
                        'specification',
                      )
                    }
                    onBlur={event =>
                      bookingData.checkRequiredWhatIsThisFor(event.target.value)
                    }
                  />
                </Templates.InputWrapper>
              )}
              {bookingData.user === 'someoneElse' ? (
                <Templates.InputWrapper>
                  <TextInput
                    placeholder="Who is this video from?"
                    value={bookingData.userName}
                    onChange={event =>
                      bookingData.handleInputChange(
                        event.target.value,
                        'userName',
                      )
                    }
                  />
                  {!getMobileOperatingSystem() &&
                  checkMediaRecorderSupport() &&
                  (!window.navigator.userAgent.indexOf('MSIE ') > -1 &&
                    !window.navigator.userAgent.indexOf('Trident/') > -1) ? (
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
                    </Templates.WrapsAudioInput>
                  ) : (
                    <Templates.Myself onClick={bookingData.updateUserToMyself}>
                      This video is for me!
                    </Templates.Myself>
                  )}
                </Templates.InputWrapper>
              ) : (
                <Templates.InputWrapper>
                  <TextInput
                    placeholder=""
                    type="date"
                    value={bookingData.date}
                    onChange={event =>
                      bookingData.handleInputChange(event.target.value, 'date')
                    }
                    onBlur={event =>
                      bookingData.checkRequiredWhatIsThisFor(event.target.value)
                    }
                  />
                </Templates.InputWrapper>
              )}
            </FlexBox>
          );
          const page2 = (
            <FlexBox>
              {bookingData.user === 'someoneElse' ? (
                <Templates.InputWrapper>
                  <Templates.WrapsInput>
                    <FormControl className="select-material">
                      <InputLabel
                        htmlFor="reln-helper"
                        className="select-label"
                      >
                        Relationship
                      </InputLabel>
                      <Select
                        value={bookingData.relationshipValue}
                        onChange={event =>
                          bookingData.handleInputChange(
                            event.target.value,
                            'relationshipValue',
                          )
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
              ) : null}
              {bookingData.user === 'someoneElse' ? (
                <Templates.InputWrapper>
                  <TextInput
                    placeholder="From Where"
                    value={bookingData.specification}
                    onChange={event =>
                      bookingData.handleInputChange(
                        event.target.value,
                        'specification',
                      )
                    }
                    onBlur={event =>
                      bookingData.checkRequiredWhatIsThisFor(event.target.value)
                    }
                  />
                </Templates.InputWrapper>
              ) : null}
            </FlexBox>
          );

          pageDetails.push(page1);
          pageDetails.push(page2);
          if (bookingData.user === 'someoneElse') {
            const page3 = (
              <Templates.InputWrapper>
                <TextInput
                  placeholder=""
                  type="date"
                  value={bookingData.date}
                  onChange={event =>
                    bookingData.handleInputChange(event.target.value, 'date')
                  }
                  onBlur={event =>
                    bookingData.checkRequiredWhatIsThisFor(event.target.value)
                  }
                />
              </Templates.InputWrapper>
            );
            pageDetails.push(page3);
          }
        }
        return pageDetails;
      default:
        return [];
    }
  };

  return renderTemplates();
}

export default RequestTemplates;
