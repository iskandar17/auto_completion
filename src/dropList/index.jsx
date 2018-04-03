//@flow
import React, { Component } from 'react';
import {Wrap, Items, Link} from './style';
import {connect} from 'react-redux';
type ItemsType = {
    array:Array<Object>,
    selected:number
}

const ListItems = (rp:ItemsType)=>{
    let {array,selected} = rp,
        list = new Array(...array);
    return list.splice(0,4).map((ex,k)=><Items key={k}>
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
        //this.props.toggleDropList.open
        return <Wrap open={true}> 
            <ListItems array={this.props.list.data} selected={0}/>
        </Wrap>;
    }
}

export default connect(store=>store)(List);