import React, {Fragment}from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import {store} from './helpers/store';
import FormWraper from './formWrap';
// import ListWrap from './dropList';List

render(
    <Provider store={store}>
        <Fragment>
            <FormWraper />
            <h2>Results</h2>
            
        </Fragment>
    </Provider>
, document.getElementById('root'));
