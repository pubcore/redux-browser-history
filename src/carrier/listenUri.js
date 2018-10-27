import root from 'window-or-global'

export default dispatch => {
	root.addEventListener(
		'popstate',
		() => dispatch({type:'SET_BROWSER_URI', uri:root.location.href})
	)
}
