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

  // componentDidMount() {
  //   const datePicker = document.getElementsByClassName("react-datepicker__input-container")[0];
  //   if (datePicker && datePicker.childNodes && datePicker.childNodes[0]) {
  //     datePicker.childNodes[0].setAttribute("readOnly",true);
  //   }
  // }
  // handleChange(date) {
  //   this.setState({
  //     startDate: date,
  //   });
  //   this.props.handleChange(date, 'date');
  // }

  // audioRecorder(displayText) {
  //   if (!getMobileOperatingSystem() && checkMediaRecorderSupport()) {
  //     this.props.deviceCheck("checking")
  //     return checkDevice()
  //       .then(
  //         () => {
  //           this.props.showRecorder(displayText),
  //             this.props.deviceCheck("checked")
  //         },
  //         () => {
  //           this.props.showFallback(displayText),
  //             this.props.deviceCheck("checked")
  //         }
  //       );
  //   }

  //   else {
  //     this.props.showRecorder(displayText)
  //   }

  // }

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
        return [];
      case 2:
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
                    <FormControl className={{ root: 'select-material' }}>
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
                    <FormControl className={{ root: 'select-material' }}>
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
      case 3:
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

      case 4:
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

      // return (
      //   <div>
      //     {bookingData.user === '2' ?
      //       <Templates.InputWrapper>
      //         <Templates.Label>Who is the Starsona video for?</Templates.Label>
      //         <Templates.InputWrapperContainer>
      //           <Templates.WrapsInput>
      //             <Templates.Input
      //               placeholder="Enter name"
      //               type="text"
      //               name="hostName"
      //               value={this.props.hostName}
      //               onChange={event => this.props.handleChange(event.target.value, 'hostName')}
      //               onBlur={this.props.checkRequiredHostName}
      //             />

      //             {this.props.whoIsfor ?
      //               <Templates.ErrorMsg>Please enter a valid name</Templates.ErrorMsg>
      //               :
      //               null
      //             }
      //           </Templates.WrapsInput>
      //           {!getMobileOperatingSystem() && checkMediaRecorderSupport() && (!window.navigator.userAgent.indexOf('MSIE ') > -1 && !window.navigator.userAgent.indexOf('Trident/') > -1) ?
      //             <Templates.WrapsAudioInput>
      //               <AudioRecorder key="for" target="for" {...this.props} />
      //             </Templates.WrapsAudioInput>
      //             : null}
      //         </Templates.InputWrapperContainer>
      //       </Templates.InputWrapper>
      //       :
      //       null
      //     }
      //     {bookingData.user === '2' ?
      //       <Templates.InputWrapper>
      //         <Templates.Label>Who is the Starsona video from?</Templates.Label>
      //         <Templates.InputWrapperContainer>
      //           <Templates.WrapsInput>
      //             <Templates.Input
      //               placeholder="Enter name"
      //               type="text"
      //               value={this.props.userName}
      //               name="userName"
      //               onChange={event => this.props.handleChange(event.target.value, 'userName')}
      //               onBlur={this.props.checkRequiredUserName}
      //             />

      //             {this.props.whoIsfrom ?
      //               <Templates.ErrorMsg>Please enter a valid name</Templates.ErrorMsg>
      //               :
      //               null
      //             }
      //           </Templates.WrapsInput>
      //           {!getMobileOperatingSystem() && checkMediaRecorderSupport() && (!window.navigator.userAgent.indexOf('MSIE ') > -1 && !window.navigator.userAgent.indexOf('Trident/') > -1) ?
      //             <Templates.WrapsAudioInput>
      //               <AudioRecorder key="from" target="from" {...this.props} />
      //             </Templates.WrapsAudioInput>
      //             : null}
      //         </Templates.InputWrapperContainer>
      //       </Templates.InputWrapper>
      //       :
      //       null
      //     }
      //     {bookingData.user === '2' ?
      //       <Templates.InputWrapper>
      //         <Templates.RelationshipLabelWrapper>
      //           <Templates.RelationLabel>Relationship</Templates.RelationLabel>
      //           {' '}
      //           {this.props.userName && this.props.hostName && <Templates.DetailedRelation>{`(${this.props.userName} is ${this.props.hostName}'s)`}</Templates.DetailedRelation>}
      //         </Templates.RelationshipLabelWrapper>
      //         <Templates.WrapsInput>
      //           <Templates.Select
      //             value={this.props.relationshipValue}
      //             onChange={event => this.props.handleChange(event.target.value, 'relationshipValue')}
      //           >
      //             <option value="0" key="0">Choose one</option>
      //             {optionItems}
      //             <option value="otherRelation" key="otherRelation">Other</option>
      //           </Templates.Select>
      //         </Templates.WrapsInput>
      //       </Templates.InputWrapper>
      //       :
      //       null
      //     }
      //     {this.props.relationshipValue === 'otherRelation' ?
      //       <Templates.InputWrapper>
      //         <Templates.Label>Other relationship</Templates.Label>
      //         <Templates.WrapsInput>
      //           <Templates.Input
      //             placeholder="Enter relationship"
      //             type="text"
      //             name="otherRelationship"
      //             value={this.props.otherRelationValue}
      //             onBlur={this.props.otherRelationship}
      //             onChange={event => this.props.handleChange(event.target.value, 'otherRelationValue')}
      //           />
      //         </Templates.WrapsInput>
      //       </Templates.InputWrapper>
      //       :
      //       null
      //     }
      //     <Templates.InputWrapper>
      //       <Templates.Label>What's the occasion?</Templates.Label>
      //       <Templates.WrapsInput>
      //         <DatePicker
      //           dateFormat="LL"
      //           withPortal
      //           customInput={<Templates.Input />}
      //           popperPlacement="bottom"
      //           selected={this.props.date}
      //           onChange={this.handleChange}
      //         />
      //       </Templates.WrapsInput>
      //     </Templates.InputWrapper>
      //     <Templates.InputWrapper>
      //       <Templates.Label>{this.state.eventname} from</Templates.Label>
      //       <Templates.WrapsInput>
      //         <Templates.Input
      //           placeholder="From Where"
      //           type="text"
      //           name="specification"
      //           value={this.props.specification}
      //           onChange={event => this.props.handleChange(event.target.value, 'specification')}
      //         />
      //       </Templates.WrapsInput>
      //     </Templates.InputWrapper>
      //     <Templates.InputWrapper>
      //       <Templates.Label>Any important info for {this.props.starName} to know? (optional)</Templates.Label>
      //       <Templates.WrapsInput>
      //         <Templates.InputArea
      //           placeholder="Nickname?&#10;Funny quirk?&#10;Why you're such a big fan?&#10;Favorite movie/song/etc.that the star did?"
      //           type="text"
      //           name="important"
      //           value={this.props.importantinfo}
      //           onChange={event => this.props.handleChange(event.target.value, 'importantinfo')}
      //         />
      //       </Templates.WrapsInput>
      //     </Templates.InputWrapper>
      //   </div>
      // );
      case 5:
        return (
          <div>
            {bookingData.user === '2' ? (
              <Templates.InputWrapper>
                <Templates.Label>
                  Who is the Starsona video for?
                </Templates.Label>
                <Templates.InputWrapperContainer>
                  <Templates.WrapsInput>
                    <Templates.Input
                      placeholder="Enter name"
                      type="text"
                      name="hostName"
                      value={bookingData.hostName}
                      onChange={event =>
                        bookingData.handleInputChange(
                          event.target.value,
                          'hostName',
                        )
                      }
                      onBlur={bookingData.checkRequiredHostName}
                    />
                    {bookingData.whoIsfor ? (
                      <Templates.ErrorMsg>
                        Please enter a valid name
                      </Templates.ErrorMsg>
                    ) : null}
                  </Templates.WrapsInput>
                  {!getMobileOperatingSystem() &&
                  checkMediaRecorderSupport() &&
                  (!window.navigator.userAgent.indexOf('MSIE ') > -1 &&
                    !window.navigator.userAgent.indexOf('Trident/') > -1) ? (
                    <Templates.WrapsAudioInput>
                      <AudioRecorder key="for" target="for" />
                    </Templates.WrapsAudioInput>
                  ) : null}
                </Templates.InputWrapperContainer>
              </Templates.InputWrapper>
            ) : null}
            {bookingData.user === '2' ? (
              <Templates.InputWrapper>
                <Templates.Label>
                  Who is the Starsona video from?
                </Templates.Label>
                <Templates.InputWrapperContainer>
                  <Templates.WrapsInput>
                    <Templates.Input
                      placeholder="Enter name"
                      type="text"
                      name="userName"
                      value={bookingData.userName}
                      onChange={event =>
                        bookingData.handleInputChange(
                          event.target.value,
                          'userName',
                        )
                      }
                      onBlur={bookingData.checkRequiredHostName}
                    />

                    {bookingData.whoIsfrom ? (
                      <Templates.ErrorMsg>
                        Please enter a valid name
                      </Templates.ErrorMsg>
                    ) : null}
                  </Templates.WrapsInput>
                  {!getMobileOperatingSystem() &&
                  checkMediaRecorderSupport() &&
                  (!window.navigator.userAgent.indexOf('MSIE ') > -1 &&
                    !window.navigator.userAgent.indexOf('Trident/') > -1) ? (
                    <Templates.WrapsAudioInput>
                      <AudioRecorder key="from" target="from" />
                    </Templates.WrapsAudioInput>
                  ) : null}
                </Templates.InputWrapperContainer>
              </Templates.InputWrapper>
            ) : null}
            {bookingData.user === '2' ? (
              <Templates.InputWrapper>
                <Templates.RelationshipLabelWrapper>
                  <Templates.RelationLabel>
                    Relationship
                  </Templates.RelationLabel>{' '}
                  {bookingData.userName && bookingData.hostName && (
                    <Templates.DetailedRelation>{`(${bookingData.userName} is ${
                      bookingData.hostName
                    }'s)`}</Templates.DetailedRelation>
                  )}
                </Templates.RelationshipLabelWrapper>
                <Templates.WrapsInput>
                  <Templates.Select
                    value={bookingData.relationshipValue}
                    onChange={event =>
                      bookingData.handleInputChange(
                        event.target.value,
                        'relationshipValue',
                      )
                    }
                  >
                    <option value="0" key="0">
                      Choose one
                    </option>
                    {optionItems}
                    <option value="otherRelation" key="otherRelation">
                      Other
                    </option>
                  </Templates.Select>
                </Templates.WrapsInput>
              </Templates.InputWrapper>
            ) : null}
            {bookingData.relationshipValue === 'otherRelation' ? (
              <Templates.InputWrapper>
                <Templates.Label>Other relationship</Templates.Label>
                <Templates.WrapsInput>
                  <Templates.Input
                    placeholder="Enter relationship"
                    type="text"
                    name="otherRelationship"
                    value={bookingData.otherRelationValue}
                    onBlur={bookingData.otherRelationship}
                    onChange={event =>
                      bookingData.handleInputChange(
                        event.target.value,
                        'otherRelationValue',
                      )
                    }
                  />
                </Templates.WrapsInput>
              </Templates.InputWrapper>
            ) : null}
            {bookingData.selectedOccasion == 5 ? (
              <Templates.InputWrapper>
                <Templates.Label>
                  When is the occasion? (optional)
                </Templates.Label>
                <Templates.WrapsInput>
                  <DatePicker
                    dateFormat="LL"
                    withPortal
                    customInput={<Templates.Input />}
                    popperPlacement="bottom"
                    selected={bookingData.date}
                    onChange={bookingData.handleInputChange}
                    placeholderText="Enter date"
                  />
                </Templates.WrapsInput>
              </Templates.InputWrapper>
            ) : (
              <Templates.InputWrapper>
                <Templates.Label>When is the occasion?</Templates.Label>
                <Templates.WrapsInput>
                  <DatePicker
                    dateFormat="LL"
                    withPortal
                    customInput={<Templates.Input />}
                    popperPlacement="bottom"
                    selected={bookingData.date}
                    onChange={bookingData.handleInputChange}
                  />
                </Templates.WrapsInput>
              </Templates.InputWrapper>
            )}

            <Templates.InputWrapper>
              <Templates.Label>
                Any important info for {bookingData.starName} to know?
                (optional)
              </Templates.Label>
              <Templates.WrapsInput>
                <Templates.InputArea
                  placeholder="Nickname?&#10;Funny quirk?&#10;Why you're such a big fan?&#10;Favorite movie/song/etc.that the star did?"
                  type="text"
                  name="important"
                  onChange={event =>
                    bookingData.handleInputChange(
                      event.target.value,
                      'importantinfo',
                    )
                  }
                  value={bookingData.importantinfo}
                />
              </Templates.WrapsInput>
            </Templates.InputWrapper>
          </div>
        );
      case 6:
        return (
          <div>
            <Templates.InputWrapper>
              <Templates.Label>Title of the event</Templates.Label>
              <Templates.WrapsInput>
                <Templates.Input
                  placeholder="Enter the Event Name"
                  type="text"
                  name="EventName"
                  value={bookingData.eventdetailName}
                  onChange={event =>
                    bookingData.handleInputChange(
                      event.target.value,
                      'eventdetailName',
                    )
                  }
                  onBlur={bookingData.checkRequiredTitle}
                />
                {bookingData.eventTitle ? (
                  <Templates.ErrorMsg>
                    Please enter a valid event title
                  </Templates.ErrorMsg>
                ) : null}
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>Who's hosting the event?</Templates.Label>
              <Templates.WrapsInput>
                <Templates.Input
                  placeholder="Enter Name"
                  type="text"
                  name="userName"
                  value={bookingData.userName}
                  onBlur={bookingData.checkRequiredHostName}
                  onChange={event =>
                    bookingData.handleInputChange(
                      event.target.value,
                      'userName',
                    )
                  }
                />
                {bookingData.whoIsfrom ? (
                  <Templates.ErrorMsg>
                    Please enter a valid name
                  </Templates.ErrorMsg>
                ) : null}
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>When is the event?</Templates.Label>
              <Templates.WrapsInput>
                <DatePicker
                  dateFormat="LL"
                  withPortal
                  customInput={<Templates.Input />}
                  popperPlacement="bottom"
                  selected={bookingData.date}
                  onChange={bookingData.handleInputChange}
                  onBlur={bookingData.checkRequiredHostName}
                />
                {bookingData.eventDate ? (
                  <Templates.ErrorMsg>
                    Please enter a valid date
                  </Templates.ErrorMsg>
                ) : null}
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>
                Any important info for {bookingData.starName} to know?
                (optional)
              </Templates.Label>
              <Templates.WrapsInput>
                <Templates.InputArea
                  placeholder="Nickname?&#10;Funny quirk?&#10;Why you're such a big fan?&#10;Favorite movie/song/etc.that the star did?"
                  type="text"
                  name="important"
                  value={bookingData.importantinfo}
                  onChange={event =>
                    bookingData.handleInputChange(
                      event.target.value,
                      'importantinfo',
                    )
                  }
                />
              </Templates.WrapsInput>
            </Templates.InputWrapper>
          </div>
        );
      case 7:
        return (
          <div>
            <Templates.InputWrapper>
              <Templates.Label>Who's the guest of honor?</Templates.Label>
              <Templates.WrapsInput>
                <Templates.Input
                  placeholder="Enter guest name"
                  type="text"
                  name="hostName"
                  value={bookingData.hostName}
                  onChange={event =>
                    bookingData.handleInputChange(
                      event.target.value,
                      'hostName',
                    )
                  }
                  onBlur={bookingData.checkRequiredHostName}
                />
                {bookingData.whoIsfor ? (
                  <Templates.ErrorMsg>
                    Please enter guest of honor
                  </Templates.ErrorMsg>
                ) : null}
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>Who's hosting the event?</Templates.Label>
              <Templates.WrapsInput>
                <Templates.Input
                  placeholder="Enter name"
                  type="text"
                  value={bookingData.userName}
                  name="userName"
                  onChange={event =>
                    bookingData.handleInputChange(
                      event.target.value,
                      'userName',
                    )
                  }
                  onBlur={bookingData.checkRequiredHostName}
                />
                {bookingData.whoIsfrom ? (
                  <Templates.ErrorMsg>
                    Please enter a valid name
                  </Templates.ErrorMsg>
                ) : null}
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>When is the event?</Templates.Label>
              <Templates.WrapsInput>
                <DatePicker
                  dateFormat="LL"
                  withPortal
                  customInput={<Templates.Input />}
                  popperPlacement="bottom"
                  selected={bookingData.date}
                  onChange={bookingData.handleInputChange}
                  onBlur={bookingData.checkRequiredHostName}
                />
                {bookingData.eventDate ? (
                  <Templates.ErrorMsg>
                    Please enter a valid date
                  </Templates.ErrorMsg>
                ) : null}
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>
                Any important info for {bookingData.starName} to know?
                (optional)
              </Templates.Label>
              <Templates.WrapsInput>
                <Templates.InputArea
                  placeholder="Nickname?&#10;Funny quirk?&#10;Why you're such a big fan?&#10;Favorite movie/song/etc.that the star did?"
                  type="text"
                  name="important"
                  onChange={event =>
                    bookingData.handleInputChange(
                      event.target.value,
                      'importantinfo',
                    )
                  }
                  value={bookingData.importantinfo}
                />
              </Templates.WrapsInput>
            </Templates.InputWrapper>
          </div>
        );
      default:
        return null;
    }
  };

  return renderTemplates();
}

export default RequestTemplates;
