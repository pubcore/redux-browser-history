Maintain browser's URI in state based on redux  

## Prerequisites
* Knowledge of redux-actions and -reducers
* thunk-middleware is applied to redux-store

## Example

#### State

	{
	 	uri:{
			basePath:'/todolist'
			subPath:'/items',
			query:{
				id: 1
			}
		}
	}

#### app's main

	import {createStore, combineReducers, applyMiddleware} from 'redux'
	import thunkMiddleware from 'redux-thunk'
	import uri, {listenUri, init} from '@pubcore/redux-browser-history'

	// optional, required if key is not 'uri' and not on first level of state
	// init({sliceKey:'ui.uri'})

	var {dispatch, getState} = createStore(combineReducers({
		uri
	}), {}, applyMiddleware(thunkMiddleware))

	//watch changes of browser's uri
	listenUri(dispatch)

#### action to navigate between app's screens

	import {updateUriAction} from '@pubcore/redux-browser-history'

	export default navigate = page => dispatch => {
		dispatch(updateUriAction({subPath: '/' + page}))
		//...
	}

#### update some query params
	import get from 'lodash.get'
	import {updateUriAction} from '@pubcore/redux-browser-history'
	//[...]

	const current = get(getState(), 'uri.query')
	//[...]

	//updateUriAction's query param must be "complete" => ther 's no merge
	updateUriAction({ query:{...current, id: 3} })

	// to remove all query params
	// updateUriAction({ query:{} })

	// to remove some query params, use "undefined"
	// updateUriAction({ query:{..current, foo: undefined, bar: undefined} })
