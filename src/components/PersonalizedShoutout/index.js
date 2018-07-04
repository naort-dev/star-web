import React from 'react';
import './css';
import { Request } from './styled';

export const PersonalizedShoutout = () => (
  <Request.Wrapper>
    <Request>  
      <Request.InputFieldsWrapper>
        <Request.InputWrapper>
          <Request.Label>What’s your question ?</Request.Label>
          <Request.WrapsInput>
            <Request.InputQuestion
              placeholder="Best to start your question with “What”, “How” or “Why”."
            />
            <Request.ErrorMsg></Request.ErrorMsg>
          </Request.WrapsInput>         
        </Request.InputWrapper>
      </Request.InputFieldsWrapper>
      <Request.OptionWrapper>
        <Request.QuestionButton>Record Question</Request.QuestionButton>
        <Request.CheckBoxWrapper>
          <Request.Label id="checkbox_container">
            <span>Make video private?</span>
            <Request.CheckBox id="private_video" type="checkbox" />
            <Request.Span htmlFor="private_video" id="checkmark" />
          </Request.Label>
        </Request.CheckBoxWrapper>
      </Request.OptionWrapper>
    </Request>
  </Request.Wrapper>
);
