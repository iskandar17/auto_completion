import React, {Fragment} from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import {store} from './helpers/store';
import Search from './App';
import ListWrap from './dropList';
render(
    <Provider store={store}>
        <Fragment>
            <Search />
            <ListWrap />
        </Fragment>
    </Provider>
, document.getElementById('root'));
