/*
 * Copyright (c) 2025, Polarity.io, Inc.
 */

const { version: packageVersion } = require("../package.json");
const request = require("postman-request");
const { getLogger } = require("./logger");
const { NetworkError } = require("./errors");

const USER_AGENT = `userstack-polarity-integration-v${packageVersion}`;

const defaults = {
  json: true,
  headers: {
    "User-Agent": USER_AGENT,
  },
};

class PolarityRequest {
  constructor() {
    this.requestWithDefaults = request.defaults(defaults);
  }

  async request(requestOptions) {
    return new Promise(async (resolve, reject) => {
      this.requestWithDefaults(requestOptions, (err, response) => {
        if (err) {
          return reject(
            new NetworkError("Unable to complete network request", {
              cause: err,
              requestOptions,
            })
          );
        }
        resolve(response);
      });
    });
  }
}

module.exports = new PolarityRequest();
