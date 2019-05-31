import qs from 'qs'
import root from 'window-or-global'

export default ({basePath, subPath, query, replace}) => {
	var q = qs.stringify(query),
		uri = basePath + subPath + (q ? '?' + q : '')

	if(uri !== root.location.pathname + root.location.search) {
		try {
			replace ?
				root.history.replaceState(null, '', uri)
				: root.history.pushState(null, '', uri)
		} catch(e) {
			// Firefox needs the origin prefixed in some cases.
			replace ?
				root.history.replaceState(null, '', root.location.origin + uri)
				: root.history.pushState(null, '', root.location.origin + uri)
		}
	}
}
