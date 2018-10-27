import setUri from '../carrier/setUri'
import get from 'lodash.get'
import getSk from '../carrier/sliceKey'

export default ({subPath, query}) => (dp, getState) => {
	//update state
	dp({type:'SET_BROWSER_URI', subPath, query})
	//and update external resources
	setUri( {...get(getState(), getSk()), ...{subPath, query}} )
}
