/* tslint:disable */
/* eslint-disable */
/**
 * API
 * The API Reference
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError, operationServerMap } from './base';

/**
 * 
 * @export
 * @interface AppLoginDto
 */
export interface AppLoginDto {
    /**
     * email
     * @type {string}
     * @memberof AppLoginDto
     */
    'email': string;
    /**
     * password
     * @type {string}
     * @memberof AppLoginDto
     */
    'password': string;
}
/**
 * 
 * @export
 * @interface AppResponseDto
 */
export interface AppResponseDto {
    /**
     * メッセージ
     * @type {string}
     * @memberof AppResponseDto
     */
    'message': string;
}

/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * response test message
         * @summary 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        exampleApi: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * login api
         * @summary 
         * @param {AppLoginDto} appLoginDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        exampleLoginApi: async (appLoginDto: AppLoginDto, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'appLoginDto' is not null or undefined
            assertParamExists('exampleLoginApi', 'appLoginDto', appLoginDto)
            const localVarPath = `/api/login`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(appLoginDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration)
    return {
        /**
         * response test message
         * @summary 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async exampleApi(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AppResponseDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.exampleApi(options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['DefaultApi.exampleApi']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * login api
         * @summary 
         * @param {AppLoginDto} appLoginDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async exampleLoginApi(appLoginDto: AppLoginDto, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.exampleLoginApi(appLoginDto, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['DefaultApi.exampleLoginApi']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    }
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DefaultApiFp(configuration)
    return {
        /**
         * response test message
         * @summary 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        exampleApi(options?: any): AxiosPromise<AppResponseDto> {
            return localVarFp.exampleApi(options).then((request) => request(axios, basePath));
        },
        /**
         * login api
         * @summary 
         * @param {AppLoginDto} appLoginDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        exampleLoginApi(appLoginDto: AppLoginDto, options?: any): AxiosPromise<void> {
            return localVarFp.exampleLoginApi(appLoginDto, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
    /**
     * response test message
     * @summary 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public exampleApi(options?: RawAxiosRequestConfig) {
        return DefaultApiFp(this.configuration).exampleApi(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * login api
     * @summary 
     * @param {AppLoginDto} appLoginDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public exampleLoginApi(appLoginDto: AppLoginDto, options?: RawAxiosRequestConfig) {
        return DefaultApiFp(this.configuration).exampleLoginApi(appLoginDto, options).then((request) => request(this.axios, this.basePath));
    }
}



