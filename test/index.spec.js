import {expect} from 'chai'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import uri, {listenUri, updateUriAction, init} from '../src/index'
//see globals.js for further settings

//optional, required if key is not 'uri' and not on first level of state
init({sliceKey:'ui.uri'})

var {dispatch, getState} = createStore(combineReducers({
	ui:combineReducers({
		uri
	})
}), {}, applyMiddleware(thunkMiddleware))

listenUri(dispatch)

describe('redux based read/write of browser URI', () => {
	it('supports arbitrary sliceKey (default is "uri")', () => {
		expect(getState().ui.uri).is.an('object')
	})

	it('supports base-path, initialized by a carrier on import of reducer', () => {
		expect(getState()).to.deep.equal({ui:{
			uri:{
				basePath:'/base',
				query:{},
				subPath:''
			}
		}})
	})
	it('updates state, if browser-uri changes', () => {
		//simulate the uri changee
		global.location.href = 'https://xyz.test.com/base/pageOne?foo=bar'
		global.triggerPopstateEvent()
		expect(getState()).to.deep.equal({ui:{
			uri:{
				basePath:'/base',
				query:{foo:'bar'},
				subPath:'/pageOne'
			}
		}})
	})
	it('offers action to update browser\'s URI and/or query params', () => {
		dispatch(updateUriAction({subPath:'/pageTwo', query:{}}))
		expect(getState()).to.deep.equal({ui:{
			uri:{
				basePath:'/base',
				query:{},
				subPath:'/pageTwo'
			}
		}})
		expect(global.location.href).equal('/base/pageTwo')
		dispatch(updateUriAction({subPath:'/pageTwo', query:{foo:'bar'}}))
		expect(getState()).to.deep.equal({ui:{
			uri:{
				basePath:'/base',
				query:{foo:'bar'},
				subPath:'/pageTwo'
			}
		}})
		//update the same
		dispatch(updateUriAction({subPath:'/pageTwo', query:{foo:'bar'}}))
		expect(getState()).to.deep.equal({ui:{
			uri:{
				basePath:'/base',
				query:{foo:'bar'},
				subPath:'/pageTwo'
			}
		}})
	})
	it('Offers param "replace", if set true histories "replaceState" is used', () => {
		dispatch(updateUriAction({subPath:'/pageOne', query:{}, replace:true}))
		expect(getState()).to.deep.equal({ui:{
			uri:{
				basePath:'/base',
				query:{},
				subPath:'/pageOne'
			}
		}})
	})
	it('adds origin if needed for location.href', () => {
		dispatch(updateUriAction({subPath:'/firefox', query:{}}))
		expect(getState()).to.deep.equal({ui:{
			uri:{
				basePath:'/base',
				query:{},
				subPath:'/firefox'
			}
		}})
	})
})
