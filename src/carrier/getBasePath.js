import getUri from './getUri'
import url from 'url'

export default () => url.parse(getUri()).pathname.match(/^\/[^/]*/i)[0]
