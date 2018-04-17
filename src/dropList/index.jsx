//@flow
import React, { Component } from 'react';
import { Wrap, Items, Link } from './style';
import { connect } from 'react-redux';
import { MAX_ITEMS_IN_LIST } from '../helpers/constants';
type ItemsType = {
	array: Array<Object>,
	selected: number,
	isPopUp: boolean,
	itemSelected: any
}

const ItemsInner = (arg: {
	isPopUp: boolean,
	ex: Object
}) => {
	let { isPopUp, ex } = arg;
	if (!isPopUp) {
		return <Link href={ex.url} target="_blank">
			{ex.name} @{ex.screen_name}
		</Link>
	}
	return `${ex.name} @${ex.screen_name}`;
};
const ListItems = (rp: ItemsType) => {
	let { array, selected, isPopUp, itemSelected } = rp,
		list: Array<Object> = isPopUp ? [...array].splice(0, MAX_ITEMS_IN_LIST) : [...array];
	return list.map((ex, k) => <Items popUp={isPopUp} onClick={(e) => { itemSelected(k) }} className={selected === k && isPopUp ? 'selected' : 'none'} key={k}>
		<ItemsInner isPopUp={isPopUp} ex={ex} />
	</Items>)
};
class List extends Component<any>{
	itemSelected(indx: number) {
		this.props.dispatch({
			type: "LIST_MOVE",
			state: indx
		});
	}
	render() {
		let toggle: boolean = this.props.toggleBlock ? this.props.toggleDropList.open : true,
			isPopUp: boolean = this.props.toggleBlock;
		if (this.props.list.data.length === 0) {
			return null;
		}
		return <Wrap open={toggle} popUp={isPopUp}>
			<ListItems itemSelected={this.itemSelected.bind(this)} isPopUp={isPopUp} array={this.props.list.data} selected={this.props.moveList.index} />
		</Wrap>;
	}
}

export default connect(store => store)(List);