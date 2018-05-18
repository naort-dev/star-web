import React from 'react';
import Collection from './styled';
import { ImageRender } from '../ImageRender';

export default class ImageCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <Collection>
        <Collection.item>
          <ImageRender />
        </Collection.item>
        <Collection.item>
          <ImageRender />
        </Collection.item>
        <Collection.item>
          <ImageRender />
        </Collection.item>
      </Collection>
    );
  }
}
