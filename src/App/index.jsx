//@flow
import React, { Component } from 'react';
import { SearchWrap, Input, Button } from './style';
import { store } from '../helpers/store';
import { MAX_ITEMS_IN_LIST } from '../helpers/constants';
import { connect } from 'react-redux';
type stateType = {
  oldValue: string,
  isListOpen: boolean,
  index: number,
  value: string,
  resetSearch: boolean
}
class Search extends Component<any, stateType> {
  constructor() {
    super();
    this.state = {
      oldValue: '',
      isListOpen: false,
      index: -1,
      value: '',
      resetSearch: false
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
      value = `${selected.name} @${selected.screen_name}`;
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
      if (!this.state.resetSearch) {
        this.runSearch(val)
      }
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
      store.dispatch({
        type: "OPEN_DROP",
        state: state
      });
    }, 350);
  }
  makeSearch(e) {
    e.preventDefault();
    this.runSearch(this.state.value)
  }
  runSearch(value: string) {
    this.setState(({
      oldValue: value,
      value: value,
      index: -1,
      resetSearch: !this.state.resetSearch
    }), () => {
      store.dispatch({
        type: "SEARCH",
        state: {
          query: this.state.value
        }
      });
      store.dispatch({
        type: "LIST_MOVE",
        state: -1
      });
    });
  }
  componentWillReceiveProps(p: Object) {
    if (p.index !== -1) {
      let selected = this.props.data[p.index],
        value = `${selected.name} @${selected.screen_name}`;
      this.runSearch(value)
    }
  }
  render() {
    return <SearchWrap onSubmit={this.makeSearch.bind(this)}>
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
    </SearchWrap>;
  }
}

export default connect(store => ({ data: store.list.data, index: store.moveList.index }))(Search);
