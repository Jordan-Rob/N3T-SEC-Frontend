/*
const dev = {
  API_ENDPOINT_URL: ' https://case-api-test.eygo.biz'
};
*/
const dev = {
	API_ENDPOINT_URL: ' http://localhost:5000/api'
  };

const prod = {
  API_ENDPOINT_URL: 'https://casemed.herokuapp.com/api'
};

const test = {
  API_ENDPOINT_URL: 'https://api.test.com'
};

const getEnv = () => {
	switch (process.env.NODE_ENV) {
		case 'development':
			return dev
		case 'production':
			return prod
		case 'test':
			return test
		default:
			break;
	}
}

export const env = getEnv()
