import qs from 'qs'

export default (basePath, uri) => {
	var match = uri.match(new RegExp(basePath + '?([^?]*)\\??([\\s\\S]*)$'))
	return {
		subPath:match && match[1],
		query:(match && match[2] && qs.parse(match[2])) || {}
	}
}
