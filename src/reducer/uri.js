import {createReducer} from 'redux-create-reducer'
import uriParse from './case/uriParse'
import getBrowserUri from '../carrier/getUri'
import getBasePath from '../carrier/getBasePath'

export const type2reducer = {
	SET_BROWSER_URI:(slice, {uri, subPath, query}) =>
		({...slice, ...(uri ? uriParse(slice.basePath, uri) : {subPath, query})}),
}

var basePath = getBasePath()
export default createReducer(
	{basePath, ...uriParse(basePath, getBrowserUri())},
	type2reducer
)
