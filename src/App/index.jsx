//@flow
import React, { Component } from 'react';
import {SearchWrap,Input,Button} from './style';
import {store} from '../helpers/store';
import {MAX_ITEMS_IN_LIST} from '../helpers/constants';
import {connect} from 'react-redux';
class Search extends Component<any,{
      oldValue:string,
      isListOpen:boolean,
      index:number,
      value:string,
      resetSearch:boolean
    }> {
  constructor(){
    super();
    this.state = {
      oldValue:'',
      isListOpen:false,
      index:-1,
      value:'',
      resetSearch:false
    };
    this.input = null;
  }
  input: ?HTMLInputElement;
  isEmpty(v){
    let check = v.replace(/\s/g,'');
    return check === '' ? true : false;
  }
  isTheSame(o,n){
    let oldVal = o.replace(/\s/g,''),
        newVal = n.replace(/\s/g,'');
    return  oldVal === newVal ? true : false;
  }
  moveList(e){
      let {index} = this.state, 
          selected, 
          value, 
          isCircleMax = false,
          moveCursor = false,
          current = this.input;
      if(e.keyCode === 38 && index > -1){
        moveCursor = true;
        index--;
      };
      if(e.keyCode === 40 && index < MAX_ITEMS_IN_LIST){
        index++;
      };
      if(index === -1 || index === MAX_ITEMS_IN_LIST){
        value = this.state.oldValue;
      }else{
        selected = this.props.data[index];
        value = `${selected.name} @${selected.screen_name}`;
      }
      if(index === MAX_ITEMS_IN_LIST){
        index = -1;
        isCircleMax = true;
      }
      if(index === -1 && !isCircleMax){
        index = MAX_ITEMS_IN_LIST;
      }
      this.setState({
        index:index,
        value:value
      },
      () => {
        if(moveCursor && current){
          current.selectionStart = current.selectionEnd = value.length + 1;
        } 
      });
  }
  keyUp(e:SyntheticKeyboardEvent<HTMLInputElement>){
    let val = e.currentTarget.value;
    e.preventDefault();
    if([38,40].indexOf(e.keyCode) !== -1 && this.state.isListOpen && this.props.data.length !== 0){
      this.moveList(e);
      return;
    }
    if(!this.isEmpty(val)){
      if(!this.isTheSame(this.state.oldValue,val)){
        this.runSearch(val)
      }
    }else{
      if(!this.state.resetSearch){
        this.runSearch(val)
      }
    }
  }
  setValue(e:SyntheticEvent<HTMLInputElement>){
    let val = e.currentTarget.value;
    this.setState({
      value:val
    });
  }
  toggleDropList(state:boolean){
    setTimeout(()=>{
      this.setState({isListOpen:state});
      store.dispatch({
        type:"OPEN_DROP",
        state:state
      });
    },350);
  }
  makeSearch(){
    this.runSearch(this.state.value)
  }
  runSearch(value:string){
      this.setState(({
        oldValue:value,
        value:value,
        index:-1,
        resetSearch:!this.state.resetSearch
      }),()=>{
        store.dispatch({
          type:"SEARCH",
          state:{
            query:this.state.value
          }
        });
        store.dispatch({
          type:"LIST_MOVE",
          state:-1
        });
      });
  }
  componentWillReceiveProps(p:Object){
    if(p.index !== -1){
      let selected = this.props.data[p.index],
          value = `${selected.name} @${selected.screen_name}`;
      this.runSearch(value)
    }
  }
  render() {
    return <SearchWrap>
              <Input 
                    onFocus={(e)=>{this.toggleDropList(true)}}
                    onBlur={(e)=>{this.toggleDropList(false)}}
                    onKeyUp={(e)=>{this.keyUp(e)}}
                    onChange={(e)=>{this.setValue(e)}}
                    value={this.state.value}
                    innerRef={(input)=>{this.input=input}}
                    >
              </Input>
              <Button onClick={(e)=>{this.makeSearch()}}>
                search
              </Button>
            </SearchWrap>;
  }
}

export default connect(store=>({data:store.list.data,index:store.moveList.index}))(Search);
