//@flow
type mainStateType = {
	error:boolean,
	data:Array<Object>
};
const MainInitState = {
    error:false,
    data:[]
};
export function list(
		state:mainStateType=MainInitState, 
		action:{
			state:mainStateType,
			type:string
		}
	){
	switch (action.type) {
		case 'SEARCH_DATA':
			return Object.assign({},state, action.state);
		default:
			return state;
	}
}

export function toggleDropList(state:{
		['open']:boolean
	}={
		open:false
	},
	action:{
		state:boolean,
		type:string
	}) {
	switch (action.type) {
        case 'OPEN_DROP':
			return Object.assign({},state, {open:action.state});
		default:
			return state;
	}
}