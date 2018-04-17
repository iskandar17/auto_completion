import React, {Fragment}from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import {store} from './helpers/store';
import FormWrap from './form';
// import ListWrap from './dropList';List
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
render(
    <Provider store={store}>
        <Fragment>
            <FormWrap request={setRequest} setValue={setValue}/>
            <h2>Results</h2>
            
        </Fragment>
    </Provider>
, document.getElementById('root'));
