import {HttpClient, Api} from 'tonapi-sdk-js'

export const REQUEST_AUTH = `Bearer AHQBWJ7MZXCADZIAAAAJPYXDQ7NDSGLGTZRMCWWO2NBBRBD6NBMG5VTBM2W6HKKTJGYSATI`

const httpClient = new HttpClient({
	baseUrl: 'https://tonapi.io',
	baseApiParams: {
		headers: {
			Authorization: REQUEST_AUTH,
			'Content-type': 'application/json'
		}
	},
})

export const client = new Api(httpClient)
