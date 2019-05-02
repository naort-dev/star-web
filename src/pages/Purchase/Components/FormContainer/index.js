import React, { Component } from 'react';
import Dropdown from '../../../../components/Dropdown';
import Button from '../../../../components/PrimaryButton';
import { FlexCenter } from '../../../../styles/CommonStyled';
import { Layout } from './styled';

class FormContainer extends Component {
  onSelectOccasion = (occasion) => {
    // this.props.detailList.filter((item) => {
    //   if (item.id === occasion.value) {
    //     switchTemplate(item.type);
    //   }
    // });
  };
  render() {
    const { children, detailList, ...rest } = { ...this.props };
    const optionsList = detailList.map((item) => ({
      label: item.title,
      key: item.id,
    }));
    return (
      <Layout>
        <FlexCenter>
          <Dropdown
            options={optionsList}
            labelKey="label"
            valueKey="key"
            placeHolder="What is the occasion?"
            className="custom"
            handleChange={(occasion) => this.onSelectOccasion(occasion)}
          />
        </FlexCenter>
        {React.cloneElement(children, {
          ...rest,
        })}
        <FlexCenter>
          <Button>Continue</Button>
        </FlexCenter>
      </Layout>
    );
  }
}

export default FormContainer;
