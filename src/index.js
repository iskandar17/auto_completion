import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import {store} from './helpers/store';
import Search from './App';
import ListWrap from './dropList';
import {WrapAutoComp} from './style';
render(
    <Provider store={store}>
        <WrapAutoComp>
            <Search />
            <ListWrap />
        </WrapAutoComp>
    </Provider>
, document.getElementById('root'));
