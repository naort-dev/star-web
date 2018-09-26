import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import SelectTags from '../SelectTag';
import GroupStyled from './styled';

export default class GroupRegistration extends React.Component {
  state = {
    bio: '',
    website: '',
    searchTags: [],

  }

  handleFieldChange = (fieldType, fieldValue) => {
    if (fieldType === 'profession') {
      const professionArray = fieldValue.split(',');
      if (professionArray.length <= 3) {
        this.setState({ profession: professionArray, errors: { ...this.state.errors, profession: false } });
      }
    } else if (fieldType === 'searchTags') {
      this.setState({ searchTags: fieldValue });
    } else {
      this.setState({ [fieldType]: fieldValue, errors: { ...this.state.errors, [fieldType]: false } });
    }
  }

  renderMultiValueItems = (selectProps) => {
    return (
      <GroupStyled.mutiSelectItemWrapper>
        {selectProps.value.label}
        <GroupStyled.CloseButton
          type="button"
          onClick={(e) => selectProps.onRemove(selectProps.value)}
        />
      </GroupStyled.mutiSelectItemWrapper>
    );
  }


  render() {
    return (
      <GroupStyled>
        <Scrollbars>
          <GroupStyled.ContentWrapper>
            <GroupStyled.HeadingWrapper>
              <GroupStyled.SubHeading>Public information</GroupStyled.SubHeading>
              <GroupStyled.SubHeadingDescription>
                This information will be shared on your profile and you can always update these later in your profile.
              </GroupStyled.SubHeadingDescription>
            </GroupStyled.HeadingWrapper>
            <GroupStyled.InputwrapperDiv>
              <GroupStyled.InputWrapper>
                <GroupStyled.Label>Group bio</GroupStyled.Label>
                <GroupStyled.WrapsInput>

                  <GroupStyled.InputArea
                    placeholder="Enter information about your group.
                    Note: Help Fans and Stars find you in search by including terms associated with your group."
                    value={this.state.bio}
                    onChange={event => { this.handleFieldChange('bio', event.target.value) }}
                  />

                  {/* <GroupStyled.ErrorMsg isError={this.state.errors.bio}>
                    {
                      this.state.errors.bio ? 'Please enter a valid event title' :
                        null
                    }
                  </GroupStyled.ErrorMsg> */}
                </GroupStyled.WrapsInput>
              </GroupStyled.InputWrapper>
              <GroupStyled.InputWrapper>
                <GroupStyled.Label>Group Website</GroupStyled.Label>
                <GroupStyled.WrapsInput>
                  <GroupStyled.InputArea
                    placeholder="www.yoursite.org"
                    value={this.state.website}
                    onChange={event => { this.handleFieldChange('website', event.target.value) }}
                  />
                  {/* <GroupStyled.ErrorMsg isError={this.state.errors.bio}>
                    {
                      this.state.errors.bio ? 'Please enter a valid event title' :
                        null
                    }
                  </GroupStyled.ErrorMsg> */}
                </GroupStyled.WrapsInput>
              </GroupStyled.InputWrapper>
              <GroupStyled.InputWrapper>
                <GroupStyled.Label>Search tags</GroupStyled.Label>
                <GroupStyled.WrapsInput>
                  <SelectTags
                    otherOptions={{
                      clearable: false,
                      arrowRenderer: null,
                      valueComponent: (selectProps) => this.renderMultiValueItems(selectProps),
                    }}
                    placeholder=""
                    searchTags={this.state.searchTags}
                    value={this.state.searchTags}
                    handleFieldChange={this.handleFieldChange}
                  />
                  <GroupStyled.ErrorMsg isError={false}>
                    Add hashtags to help Fans find you quicker
                  </GroupStyled.ErrorMsg>
                </GroupStyled.WrapsInput>
              </GroupStyled.InputWrapper>
            </GroupStyled.InputwrapperDiv>
            <GroupStyled.HeadingWrapper>
              <GroupStyled.SubHeading>Private information</GroupStyled.SubHeading>
              <GroupStyled.SubHeadingDescription>
                This information is private to you and will not be shared publicly.
              </GroupStyled.SubHeadingDescription>
            </GroupStyled.HeadingWrapper>
          </GroupStyled.ContentWrapper>
        </Scrollbars>
      </GroupStyled>
    );
  }
}
