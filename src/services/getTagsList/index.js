import axios from 'axios';
import Api from '../../lib/api';
import { fetch } from '../fetch';

const parseResult = (results) => {
  let taglist = [];
  results.forEach((searchItem) => {
    const list ={
      label: searchItem._source.tag_name,
      value: searchItem._id,
    }
    taglist.push(list);
  });
  return taglist;
} 

export const fetchTagsList = (searchParam, configData)  => {
  const query = {
      "query" : {
          "prefix" : { "tag_name" : searchParam }
      }
  };
  return axios.get(`${configData.elastic_search_endpoint}/_search?size=10000`, {
    params: {
      source: JSON.stringify(query),
      source_content_type: 'application/json',
    },
  }).then((resp) => {
    if (resp.data && resp.data.hits && resp.data.hits.hits) {
      return parseResult(resp.data.hits.hits);
    }
  }).catch((exception) => {
    console.log(exception);
  })
};

export const setNewTag = (newTag) => {
  const obj = {
    tags: [{name: newTag}]
  }
  return fetch.post(Api.setTags, {
    ...obj,
  }).then(resp => resp.data);
}