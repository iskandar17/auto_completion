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

export function showResults(state={show:false},action){
	switch (action.type) {
		case 'SHOW_RESULTS':
			return Object.assign({},state, action.state);
		default:
			return state;
	}
}