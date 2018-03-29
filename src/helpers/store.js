import { createStore, combineReducers, applyMiddleware,compose} from 'redux';
import * as reducers from './redusers';
import createSagaMiddleware from 'redux-saga';
import sagaActions from './sagaActions';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const middleWares = ()=>{
   let mArr = [sagaMiddleware];
  if(process.env.NODE_ENV === 'production'){
    return applyMiddleware(...mArr);
  }else{
    return composeEnhancers(
      applyMiddleware(...mArr)
    )
  }
};
export const store = createStore(
  combineReducers({...reducers}), 
  middleWares()
);
sagaMiddleware.run(sagaActions)
