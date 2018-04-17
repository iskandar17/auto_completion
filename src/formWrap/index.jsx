//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../form';
import {store} from '../helpers/store';

const setRequest = (val)=>{
    store.dispatch({
        type: "SEARCH",
        state: {
          query: val
        }
      });
};
const setValue = (selected)=>{
    return `${selected.name} @${selected.screen_name}`
}

class FormWraper extends Component<any> {
    render(){
        return <Form request={setRequest} setValue={setValue} data={this.props.data}/>
    }
}

export default connect(store => ({ data: store.list.data }))(FormWraper);