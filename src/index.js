import React, {Fragment}from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import {store} from './helpers/store';
import FormWraper from './formWrap';
import Results from './results';

render(
    <Provider store={store}>
        <Fragment>
            <FormWraper />
            <h2>Results</h2>
            <Results />
        </Fragment>
    </Provider>
, document.getElementById('root'));
