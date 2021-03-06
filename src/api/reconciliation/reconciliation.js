import fetch from 'node-fetch';
import { determineError } from '../../services/errors';
import http from '../../services/http';
import { setInstrumentType } from '../../services/validation';

/**
 * Class dealing with the /reporting endpoint
 *
 * @export
 * @class Reconciliation
 */
export default class Reconciliation {
    constructor(config) {
        this.config = config;
    }

    /**
     * Returns a JSON report containing all payments within your specified parameters
     *
     * @memberof Reconciliation
     * @param {Object} body Reconciliation request body.
     * @return {Promise<Object>} A promise to the request reconciliation response.
     */
    async getPayments(body) {
        try {
            let url = `${this.config.host}/reporting/payments`;

            if (body) {
                var queryString = Object.keys(body)
                    .map(key => key + '=' + body[key])
                    .join('&');
                url += '?' + queryString;
            }
            const response = await http(
                fetch,
                { timeout: this.config.timeout },
                {
                    method: 'get',
                    url: url,
                    headers: { Authorization: this.config.sk }
                }
            );
            return await response.json;
        } catch (err) {
            const error = await determineError(err);
            throw error;
        }
    }

    /**
     * Returns a JSON payment report containing all of the data related to a specific payment,
     * based on the payment's identifier.
     *
     * @memberof Reconciliation
     * @param {String} paymentId Payment id.
     * @return {Promise<Object>} A promise to the request reconciliation response.
     */
    async getPayment(paymentId) {
        try {
            const response = await http(
                fetch,
                { timeout: this.config.timeout },
                {
                    method: 'get',
                    url: `${this.config.host}/reporting/payments/${paymentId}`,
                    headers: { Authorization: this.config.sk }
                }
            );
            return await response.json;
        } catch (err) {
            const error = await determineError(err);
            throw error;
        }
    }

    /**
     * Returns a JSON report containing all payments within your specified parameters
     *
     * @memberof Reconciliation
     * @param {Object} body Reconciliation request body.
     * @return {Promise<Object>} A promise to the request reconciliation response.
     */
    async getPaymentsCsv(body) {
        try {
            let url = `${this.config.host}/reporting/payments/download`;

            if (body) {
                var queryString = Object.keys(body)
                    .map(key => key + '=' + body[key])
                    .join('&');
                url += '?' + queryString;
            }
            const response = await http(
                fetch,
                { timeout: this.config.timeout, csv: true },
                {
                    method: 'get',
                    url: url,
                    headers: { Authorization: this.config.sk }
                }
            );
            return await response.csv;
        } catch (err) {
            const error = await determineError(err);
            throw error;
        }
    }

    /**
     * Returns a JSON report containing all statements within your specified parameters.
     * Please note that the timezone for the request will be UTC.
     *
     * @memberof Reconciliation
     * @param {Object} body Reconciliation request body.
     * @return {Promise<Object>} A promise to the request reconciliation response.
     */
    async getStatements(body) {
        try {
            let url = `${this.config.host}/reporting/statements`;

            if (body) {
                var queryString = Object.keys(body)
                    .map(key => key + '=' + body[key])
                    .join('&');
                url += '?' + queryString;
            }
            const response = await http(
                fetch,
                { timeout: this.config.timeout },
                {
                    method: 'get',
                    url: url,
                    headers: { Authorization: this.config.sk }
                }
            );
            return await response.json;
        } catch (err) {
            const error = await determineError(err);
            throw error;
        }
    }

    /**
     * Downloads a CSV statement report containing all of the data related to a specific
     * statement, based on the statement's identifier.
     *
     * @memberof Reconciliation
     * @param {String} statementId Statement id.
     * @return {Promise<Object>} A promise to the request reconciliation response.
     */
    async getStatementCsv(statementId) {
        try {
            const response = await http(
                fetch,
                { timeout: this.config.timeout, csv: true },
                {
                    method: 'get',
                    url: `${this.config.host}/reporting/statements/${statementId}/payments/download`,
                    headers: { Authorization: this.config.sk }
                }
            );
            return await response.csv;
        } catch (err) {
            const error = await determineError(err);
            throw error;
        }
    }
}
