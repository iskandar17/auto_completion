//@flow
import React, { Component } from 'react';
import { SearchWrap, Input, Button, WrapAutoComp } from './style';
import { store } from '../helpers/store';
import { MAX_ITEMS_IN_LIST } from '../helpers/constants';
import { connect } from 'react-redux';
import ListWrap from '../dropList';
type stateType = {
  oldValue: string,
  isListOpen: boolean,
  index: number,
  value: string
}
class Search extends Component<any, stateType> {
  constructor() {
    super();
    this.state = {
      oldValue: '',
      isListOpen: false,
      index: -1,
      value: ''
    };
    this.input = null;
  }
  input: ?HTMLInputElement;

  isSameStrs(a: string, b: string) {
    return this.trimSpace(a) === this.trimSpace(b) ? true : false;
  }
  trimSpace(str: string) {
    return str.replace(/\s/g, '');
  }

  moveList(e: SyntheticKeyboardEvent<HTMLInputElement>) {
    let { index } = this.state,
      selected,
      value,
      isCircleMax = false,
      moveCursor = false,
      current = this.input;
    if (e.keyCode === 38 && index > -1) {
      moveCursor = true;
      index--;
    };
    if (e.keyCode === 40 && index < MAX_ITEMS_IN_LIST) {
      index++;
    };
    if (index === -1 || index === MAX_ITEMS_IN_LIST) {
      value = this.state.oldValue;
    } else {
      selected = this.props.data[index];
      let val = this.props.setValue(selected);
      if(!val){
        this.valError();
      }
      value = val;
    }
    if (index === MAX_ITEMS_IN_LIST) {
      index = -1;
      isCircleMax = true;
    }
    if (index === -1 && !isCircleMax) {
      index = MAX_ITEMS_IN_LIST;
    }
    this.setState({
      index: index,
      value: value
    },
      () => {
        if (moveCursor && current) {
          current.selectionStart = current.selectionEnd = value.length + 1;
        }
      });
  }
  keyUp(e: SyntheticKeyboardEvent<HTMLInputElement>) {
    let val = e.currentTarget.value;
    e.preventDefault();
    if ([38, 40].indexOf(e.keyCode) !== -1 && this.state.isListOpen && this.props.data.length !== 0) {
      this.moveList(e);
      return;
    }
    if (!this.isSameStrs(val, '')) {
      if (!this.isSameStrs(this.state.oldValue, val)) {
        this.runSearch(val)
      }
    } else {
        this.runSearch(val)
    }
  }
  setValue(e: SyntheticEvent<HTMLInputElement>) {
    let val = e.currentTarget.value;
    this.setState({
      value: val
    });
  }
  toggleDropList(state: boolean) {
    setTimeout(() => {
      this.setState({ isListOpen: state });
    }, 350);
  }
  makeSearch(e) {
    e.preventDefault();
    this.runSearch(this.state.value)
  }
  valError(){
    throw new Error('function setValue must resturn a string');
  }
  runSearch(value: string) {
    this.setState(({
      oldValue: value,
      value: value,
      index: -1,
    }), () => {
      this.props.request(value)
    });
  }
  moveListSet(indx:number){
    let  selected = this.props.data[indx], val = this.props.setValue(selected);
    if(!val){
      this.valError();
    }
    this.setState({
      index: indx,
      value: val
    })
  }
  render() {
    return <WrapAutoComp>
      <SearchWrap onSubmit={this.makeSearch.bind(this)}>
        <Input
          onFocus={(e) => { this.toggleDropList(true) }}
          onBlur={(e) => { this.toggleDropList(false) }}
          onKeyUp={(e) => { this.keyUp(e) }}
          onChange={(e) => { this.setValue(e) }}
          value={this.state.value}
          innerRef={(input) => { this.input = input }}
        >
        </Input>
        <Button type="submit" value="">
          search
              </Button>
      </SearchWrap>
      <ListWrap
        popUpToggle={this.state.isListOpen}
        toggleBlock={true}
        moveList={this.moveListSet.bind(this)}
        selected={this.state.index}
        list={this.props.data} />
    </WrapAutoComp>;
  }
}

export default connect(store => ({ data: store.list.data }))(Search);
