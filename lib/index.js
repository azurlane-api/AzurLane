'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));

class ApiError extends Error {
    constructor(response) {
        super(response.message);
        this.statusCode = response.statusCode;
        this.statusMessage = response.statusMessage;
        this.message = response.message;
        this.error = response.error;
    }
}

class AzurLane {
    /**
     *
     * @param {IOptions} options Constructor options
     * @param {string} [options.userAgent] UA to use when making http requests
     */
    constructor(options) {
        this.baseUrl = "https://azurlane-api.appspot.com/v1";
        this.options = options ? options : {};
        this.options.userAgent = (options && options.userAgent) ? options.userAgent : `AzurLane/v1.0.0 (https://www.npmjs.com/package/azurlane)`;
        this._axiosOptions = {
            headers: {
                "User-Agent": this.options.userAgent
            }
        };
    }
    /**
     * @since 0.0.1
     *
     * Get information about a ship by name
     *
     * @param {string} name The name of the ship
     * @returns {Promise<IShip>}
     */
    async getShipByName(name) {
        try {
            const response = await axios.get(`${this.baseUrl}/ship?name=${name}`, this._axiosOptions);
            return response.data.ship;
        }
        catch (error) {
            if (error.response && error.response.data) {
                throw new ApiError(error.response.data);
            }
            else {
                throw error;
            }
        }
    }
    /**
     * @since 0.1.0
     *
     * Get information about a ship by id
     *
     * @param {number} id The id of the ship
     * @returns {Promise<IShip>}
     */
    async getShipById(id) {
        try {
            const response = await axios.get(`${this.baseUrl}/ship?id=${id}`, this._axiosOptions);
            return response.data.ship;
        }
        catch (error) {
            if (error.response && error.response.data) {
                throw new ApiError(error.response.data);
            }
            else {
                throw error;
            }
        }
    }
    /**
     * @since 0.0.1
     *
     * Get ship names matching the given construction time
     *
     * @param {string} time The construction time
     * @returns {Promise<IConstruction>}
     */
    async getBuildInfo(time) {
        try {
            const response = await axios.get(`${this.baseUrl}/build?time=${time}`, this._axiosOptions);
            return response.data.construction;
        }
        catch (error) {
            if (error.response && error.response.data) {
                throw new ApiError(error.response.data);
            }
            else {
                throw error;
            }
        }
    }
}

exports.ApiError = ApiError;
exports.AzurLane = AzurLane;
exports.default = AzurLane;