import updateUriAction from './action/updateUri'
import uriReducer from './reducer/uri'
import listenUri from './carrier/listenUri'
import {setSliceKey} from './carrier/sliceKey'

export const init = ({sliceKey}) => {
	setSliceKey(sliceKey)
}

export {updateUriAction, uriReducer, listenUri}
export default uriReducer
