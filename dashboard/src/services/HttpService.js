import { ROOT_URL } from '../config';
import jwtDecode from 'jwt-decode';

const request = require('superagent');


export class HttpService {

    constructor() {
        this.token = '';
        this.company_id = '';

        this.postPure       = this.postPure.bind(this);
        this.get            = this.get.bind(this);
        this.post           = this.post.bind(this);
        this.createFormBody = this.createFormBody.bind(this);
    }
    /*****
     * POST pure
     * @param httpUrl
     * @param data
     * @param successCb
     * @param errorCb
     */
    postPure(httpUrl,data, successCb, errorCb) {
        let formBody = this.createFormBody(data);
        let status = null;
        return fetch(ROOT_URL+httpUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formBody
        })
            .then((response) => {status = response.status; return response;})
            .then((response) => response.json())
            .then((response) => {
                if(status >= 200 && status < 300){
                    return response;
                }
                throw response;
            })
            .then((response) => {
                if (successCb) {
                    return successCb(response);
                } else {
                    return Promise.resolve(response);
                }
            })
            .catch((error) => {
                if (errorCb) {
                    return errorCb(error);
                } else {
                    return Promise.reject(error);
                }
            });
    }

    /*****
     * GET request with
     * AUTHORIZATION headers ( bearer )
     * @param httpUrl
     * @param data
     * @param successCb
     * @param errorCb
     * @param options
     */
    get(httpUrl,data, successCb, errorCb, options=null) {
        let formBody = this.createFormBody(data);
        let status = null;
        // const token = (options && options.token) ? options.token : this.token;
        return fetch(ROOT_URL+httpUrl+'?'+formBody, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : 'Bearer '+this.token,
                'X-Company-Id': this.company_id
            }
        })
            .then((response) => {status = response.status; return response;})
            .then((response) => response.json())
            .then((response) => {
                if(status >= 200 && status < 300){
                    return response;
                }
                throw response;
            })
            .then((response) => {
                if (successCb) {
                    return successCb(response);
                } else {
                    return Promise.resolve(response);
                }
            })
            .catch((error) => {
                if (errorCb) {

                    return errorCb(error);
                } else {
                    return Promise.reject(error);
                }
            });
    }

    /*****
     * POST request with
     * AUTHORIZATION headers ( bearer )
     * @param httpUrl
     * @param data
     * @param successCb
     * @param errorCb
     */
    post(httpUrl,data, successCb, errorCb) {
        let formBody = this.createFormBody(data);
        let status = null;
        return fetch(ROOT_URL+httpUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : 'Bearer '+this.token,
                'X-Company-Id': this.company_id
            },
            body: formBody
        })
            .then((response) => {status = response.status; return response;})
            .then((response) => response.json())
            .then((response) => {
                if(status >= 200 && status < 300){
                    return response;
                }
                throw response;
            })
            .then((response) => {
                if (successCb) {
                    return successCb(response);
                } else {
                    return Promise.resolve(response);
                }
            })
            .catch((error) => {
                if (errorCb) {
                    return errorCb(error);
                } else {
                    return Promise.reject(error);
                }
            });
    }


    createFormBody(data) {
        let formBody = [];
        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return formBody;
    }

    setToken(token) {
        this.token = token;
    }

    isAuthTokenValid() {
        if ( ! this.token )
        {
            return false;
        }
        const decoded = jwtDecode(this.token);
        const currentTime = Date.now() / 1000;
        if ( decoded.exp < currentTime )
        {
            console.warn('access token expired');
            return false;
        }
        else
        {
            return true;
        }
    };

    uploadFile(data, successCb, errorCb) {
        const url = ROOT_URL+'/upload-files?location=' + data.location + '&entity_id='+ImageData.entity_id+ '&thumbnail='+data.thumbnail; //'&car_id='+data.car_id + '&reservation_id='+data.reservation_id;
        return request
        .post(url)
        .field('file', data.file)
        .set('Authorization', 'Bearer ' + this.token)
        .set('X-Company-Id', this.company_id)
        .then((response) => {
            if (successCb) {
                return successCb(response);
            } else {
                return Promise.resolve(response);
            }
        })
        .catch((error) => {
            if (errorCb) {
                return errorCb(error);
            } else {
                return Promise.reject(error);
            }
        });
    }

    setCompany(id) {
        this.company_id = id;
    }
}

const defaultHttpService = new HttpService();
export default defaultHttpService;
