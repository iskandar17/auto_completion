import React, { Component } from 'react';
import {SearchWrap,Input,Button} from './style';
import {store} from '../helpers/store';


class Search extends Component {
  constructor(){
    super();
    this.state = {
      oldValue:''
    };
  }
  isEmpty(v){
    let check = v.replace(/\s/g,'');
    return check === '' ? true : false;
  }
  isTheSame(o,n){
    let oldVal = o.replace(/\s/g,''),
        newVal = n.replace(/\s/g,'');
    return  oldVal === newVal ? true : false;
  }
  keyUp(e){
    let val = e.target.value;
    if(!this.isEmpty(val)){
      if(!this.isTheSame(this.state.oldValue,val)){
        this.setState({
          oldValue:val
        });
        store.dispatch({
          type:"SEARCH",
          state:{
            query:val
          }
        });
      }
    }else{
      
    }
  }
  toggleDropList(state){
    store.dispatch({
      type:"OPEN_DROP",
      state:state
    });
  }
  render() {
    return <SearchWrap>
              <Input 
                    onFocus={(e)=>{this.toggleDropList(true)}}
                    onBlur={(e)=>{this.toggleDropList(false)}}
                    onKeyUp={(e)=>{this.keyUp(e)}}
                    >
              </Input>
              <Button>
                search
              </Button>
            </SearchWrap>;
  }
}

export default Search;
