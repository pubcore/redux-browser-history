import qs from 'qs'
import root from 'window-or-global'

export default ({basePath, subPath, query}) => {
	var q = qs.stringify(query),
		uri = basePath + subPath + (q ? '?' + q : '')

	if(uri !== root.location.pathname + root.location.search) {
		try {
			root.history.pushState(null, '', uri)
		} catch(e) {
			// Firefox needs the origin prefixed in some cases.
			root.history.pushState(null, '', root.location.origin + uri)
		}
	}
}
