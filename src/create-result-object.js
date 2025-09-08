const { getLogger } = require('./logger');

/**
 *
 * @param entities
 * @param apiResponse
 * @returns {*[]}
 */
const createResultObject = (entity, apiResponse, options) => {
  if (apiResponse && apiResponse.type !== 'unknown') {
    return {
      entity,
      data: {
        summary: createSummary(apiResponse, options),
        details: {
          useragent: apiResponse
        }
      }
    };
  } else {
    return {
      entity,
      data: null
    };
  }
};

/**
 * Creates the Summary Tags (currently just tags for ports)
 * @param match
 * @returns {string[]}
 */
const createSummary = (apiResponse, options) => {
  const tags = [];

  if (apiResponse.os && apiResponse.os.name) {
    tags.push(apiResponse.os.name);
  }

  if (apiResponse.browser && apiResponse.browser.name) {
    tags.push(apiResponse.browser.name);
  }

  if (apiResponse.crawler && apiResponse.crawler.is_crawler) {
    tags.push('Is Crawler');
  }

  if (tags.length === 0) {
    tags.push('1 Result');
  }

  return tags;
};

module.exports = {
  createResultObject
};
