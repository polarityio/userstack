const polarityRequest = require('./polarity-request');
const { ApiRequestError } = require('./errors');
const { getLogger } = require('./logger');
const SUCCESS_CODES = [200];

async function searchUserAgent(entity, options) {
  const Logger = getLogger();

  const requestOptions = {
    uri: `https://api.userstack.com/api/detect`,
    qs: {
      access_key: options.accessKey,
      ua: entity.value,
      output: 'json'
    }
  };

  Logger.trace({ requestOptions }, 'Request Options');

  const apiResponse = await polarityRequest.request(requestOptions);

  Logger.trace({ apiResponse }, 'Search Userstack API Response');

  if (!SUCCESS_CODES.includes(apiResponse.statusCode)) {
    throw new ApiRequestError(
      `Unexpected status code ${apiResponse.statusCode} received when making request to the Userstack API`,
      {
        statusCode: apiResponse.statusCode,
        requestOptions,
        responseBody: apiResponse.body
      }
    );
  }

  return apiResponse.body;
}

module.exports = {
  searchUserAgent
};
