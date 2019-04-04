import React, { Component } from 'react';
import Dropdown from '../../../../components/Dropdown';
import Button from '../../../../components/PrimaryButton';
import { FlexCenter } from '../../../../styles/CommonStyled';
import { Layout } from './styled';

const list = [{ label: 'Birthday', key: 1 }, { label: 'Other', key: 2 }];
class FormContainer extends Component {
  render() {
    const { children, ...rest } = { ...this.props };
    return (
      <Layout>
        <FlexCenter>
          <Dropdown
            options={[{ title: 'Featured', id: 0 }, ...list]}
            labelKey="label"
            valueKey="key"
            placeHolder="What is the occasion?"
            className="custom"
          />
        </FlexCenter>
        {React.cloneElement(children, {
          ...rest,
        })}
        <FlexCenter>
          <Button onClick={this.props.submitClick}>Continue</Button>
        </FlexCenter>
      </Layout>
    );
  }
}

export default FormContainer;
