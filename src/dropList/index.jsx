//@flow
import React, { Component } from 'react';
import { Wrap, Items, Link } from './style';
import { MAX_ITEMS_IN_LIST } from '../helpers/constants';
type ItemsType = {
	list: Array<Object>,
	selected: number,
	toggleBlock: boolean,
	moveList: Function
}
type ItemInnerType = {
	toggleBlock: boolean,
	ex: Object
};
const ItemsInner = (arg: ItemInnerType) => {
	let { toggleBlock, ex } = arg;
	if (!toggleBlock) {
		return <Link href={ex.url} target="_blank">
			{ex.name} @{ex.screen_name}
		</Link>
	}
	return `${ex.name} @${ex.screen_name}`;
};
const ListItems = (rp: ItemsType) => {
	let { list, selected, toggleBlock, moveList } = rp,
		arr: Array<Object> = toggleBlock ? [...list].splice(0, MAX_ITEMS_IN_LIST) : [...list];
	return arr.map((ex, k) => (
		<Items popUp={toggleBlock} onClick={(e) => { moveList(k) }} className={selected === k && toggleBlock ? 'selected' : 'none'} key={k}>
			<ItemsInner toggleBlock={toggleBlock} ex={ex} />
		</Items>
	)
	)
};
class List extends Component<any>{
	render() {
		let toggle: boolean = this.props.toggleBlock ? this.props.popUpToggle : true;
		if (this.props.list.length === 0) {
			return null;
		}
		return (
			<Wrap
				open={toggle}
				popUp={this.props.toggleBlock}>
				<ListItems
					{...this.props} />
			</Wrap>
		);
	}
}

export default List;