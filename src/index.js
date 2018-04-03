import React, {Fragment}from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import {store} from './helpers/store';
import Search from './App';
import ListWrap from './dropList';
import {WrapAutoComp} from './style';
render(
    <Provider store={store}>
        <Fragment>
            <WrapAutoComp>
                <Search />
                <ListWrap toggleBlock={true}/>
            </WrapAutoComp>
            <h2>Results</h2>
            <ListWrap toggleBlock={false}/>
        </Fragment>
    </Provider>
, document.getElementById('root'));
