import React, { Component } from 'react';
import {Wrap, Items, Link} from './style';
import {connect} from 'react-redux';

const ListItems = (rp)=>{
    let {array,selected} = rp;
    console.log(selected)
    return array.splice(0,4).map((ex,k)=><Items key={k}>
        <Link>
            {ex.name} @{ex.screen_name}
        </Link>
    </Items>)
};
class List extends Component{
    render(){
        if(this.props.list.data.length === 0){
            return  null;
        }
        return <Wrap open={this.props.toggleDropList.open}> 
            <ListItems array={this.props.list.data} selected={0}/>
        </Wrap>;
    }
}

export default connect(store=>store)(List);