global.location = {
	href:'/base',
	origin:'https://xyz.test.com',
	pathname:'/base/pageTwo',
	search:'?foo=bar'
}
global.history = {
	pushState(...args){
		if(args[2] && args[2].match(/firefox/) && !args[2].match(/http/)){
			throw TypeError('test')
		}
		global.location.href = args[2]
	}
}
global.addEventListener = (...[,callback]) => {
	global.triggerPopstateEvent = () => callback()
}
