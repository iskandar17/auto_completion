//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListWrap from '../dropList';

class Results extends Component<any> {
    render(){
        if(!this.props.showResults.show){
            return null;
        }
       return <ListWrap  toggleBlock={false} list={this.props.list.data}/>
    }
}
export default connect(store => store)(Results);