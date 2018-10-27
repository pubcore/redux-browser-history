import qs from 'qs'
import root from 'window-or-global'

export default ({basePath, subPath, query, replace}) => {
	var q = qs.stringify(query),
		uri = basePath + subPath + (q ? '?' + q : ''),
		changeState = replace ? root.history.pushState : root.history.replaceState

	if(uri !== root.location.pathname + root.location.search) {
		try {
			changeState(null, '', uri)
		} catch(e) {
			// Firefox needs the origin prefixed in some cases.
			changeState(null, '', root.location.origin + uri)
		}
	}
}
