import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { stringify } from 'query-string';

const API_URL: string = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const parseEndpoint = (endpoint: string, params?: any): string => {
  const url = endpoint.indexOf('http') === 0 ? endpoint : API_URL + endpoint;
  const queryString = params ? `?${stringify(params)}` : ``;
  return `${url}${queryString}`;
};

export interface ISResponse {
  code: string;
  description: string;
  response: any;
}
interface RequestHeaders {
  'Access-Control-Allow-Origin': string;
  Accept: string;
  'Content-Type': string;
  'Accept-Language': string;
  Authorization?: string | undefined;
  [key: string]: any;
}
type ISRequestHeaders = AxiosRequestHeaders | RequestHeaders;

export interface Api {
  settings: { headers: ISRequestHeaders };
  setToken(token: string): void;
  unsetToken(): void;
  get(endpoint: string): Promise<ISResponse>;
  post(endpoint: string, body?: any): Promise<ISResponse>;
  upload(endpoint: string, data: any): Promise<ISResponse>;
  put(endpoint: string, body?: any): Promise<ISResponse>;
  delete(endpoint: string): Promise<ISResponse>;
}

const initialHeaders = {
  'Access-Control-Allow-Origin': '*',
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Accept-Language': 'ko',
}

class ApiImpl implements Api {
  settings: { headers: ISRequestHeaders } = {
    headers: initialHeaders,
  };
  setToken(token: string): void {
    this.settings.headers = {
      ...this.settings.headers,
      Authorization: `Bearer ${token}`
    };
  }
  unsetToken(): void {
    this.settings.headers = initialHeaders;
  }
  async get(endpoint: string): Promise<ISResponse> {
    try {
      const response: AxiosResponse = await axios.get(parseEndpoint(endpoint), {
        headers: this.settings.headers,
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  async post(endpoint: string, body?: any): Promise<ISResponse> {
    try {
      const response: AxiosResponse = await axios.post(
        parseEndpoint(endpoint),
        { request: body },
        { headers: this.settings.headers },
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  async upload(endpoint: string, data: any): Promise<ISResponse> {
    try {
      const headers: ISRequestHeaders = {
        ...this.settings.headers,
        'Content-Type': 'multipart/form-data',
      }
      const response: AxiosResponse = await axios.post(parseEndpoint(endpoint), data, { headers });
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  async put(endpoint: string, body: any): Promise<ISResponse> {
    try {
      const response: AxiosResponse = await axios.put(
        parseEndpoint(endpoint),
        body,
        { headers: this.settings.headers },
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  async delete(endpoint: string): Promise<ISResponse> {
    try {
      const response: AxiosResponse = await axios.delete(
        parseEndpoint(endpoint),
        { headers: this.settings.headers },
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
}

const api = new ApiImpl();

export default api;
