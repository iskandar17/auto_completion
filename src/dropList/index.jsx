import React, { Component } from 'react';
import {Wrap} from './style';
import {connect} from 'react-redux';
class List extends Component{
    render(){
        console.log(this.props)
        return <Wrap open={false}> 

        </Wrap>;
    }
}

export default connect(store=>store)(List);