'use strict';

const ResponseFactory = () => {

	let defaultResponseObject = () => {
		return {};
	};

	let fail = (code, errorMessage = null) => {
		var responseObject = defaultResponseObject();

		responseObject.success = false;
		responseObject.code    = code;
		responseObject.message = errorMessage;

		return responseObject;
	};

	let success = (responseData = null) => {
		return responseData;
	};

	return {
		fail: fail,
		success: success
	};
}

module.exports = ResponseFactory();