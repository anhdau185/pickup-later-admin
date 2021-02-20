import { schemes, httpMethods, headers } from './staticEntries';

const scheme = schemes.HTTPS;
const host = 'a91086d5b623.ngrok.io';
const basePath = '/api/v1';

function toQueryString(params) {
  if (typeof params !== 'object') return '';
  const keys = Object.keys(params);
  if (keys.length === 0) return '';
  return '?' + keys.map(key => `${key}=${encodeURIComponent(`${params[key]}`)}`).join('&');
};

function getApiPath(path, params = null, hasBasePath = true) {
  let apiPath = scheme + host + (hasBasePath ? basePath : '') + path;
  if (params) {
    const type = typeof params;
    if (type === 'number' || type === 'string') {
      apiPath += `/${params}`;
    }
    if (type === 'object') {
      const queryString = toQueryString(params);
      apiPath += queryString;
    }
  }
  return apiPath;
}

function getConfigurations(method, data = null, token = null) {
  let configurations = {
    method,
    headers
  };
  if (data) {
    configurations.body = JSON.stringify(data);
  }
  if (token) {
    configurations.headers['Authorization'] = token;
  }
  return configurations;
}

export const fetchOrders = async params => {
  const apiPath = getApiPath('/orders', params);
  const configurations = getConfigurations(httpMethods.GET);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const fetchOrder = async orderId => {
  const apiPath = getApiPath('/orders', orderId);
  const configurations = getConfigurations(httpMethods.GET);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const updateOrder = async orderData => {
  const apiPath = getApiPath('/orders');
  const configurations = getConfigurations(httpMethods.PUT, orderData);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const accountLogin = async authentication => {
  const apiPath = getApiPath('/mobile/users/login', null, false);
  const configurations = getConfigurations(httpMethods.POST, authentication);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const authenticateUser = async authToken => {
  const apiPath = getApiPath('/start_session');
  let configurations = getConfigurations(httpMethods.POST, null, authToken);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const getProducts = async params => {
  const apiPath = getApiPath('/products', {
    page: params.page,
    perPage: params.perPage
  });
  let configurations = getConfigurations(httpMethods.GET, null, params.token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const getProductById = async params => {
  const apiPath = getApiPath('/products', params.productId);
  let configurations = getConfigurations(httpMethods.GET, null, params.token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const updateProduct = async params => {
  const apiPath = getApiPath('/products', params.productId);
  let configurations = getConfigurations(httpMethods.PUT, params.productData, params.token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const productSearch = async ({ keyword, token }) => {
  const apiPath = getApiPath('/product/search', { keyword });
  let configurations = getConfigurations(httpMethods.GET, null, token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const comboSearch = async ({ keyword, token }) => {
  const apiPath = getApiPath('/combo/search', { keyword });
  let configurations = getConfigurations(httpMethods.GET, null, token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const getStores = async params => {
  const apiPath = getApiPath('/stores', {
    page: params.page,
    perPage: params.perPage
  });
  let configurations = getConfigurations(httpMethods.GET, null, params.token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const getStoreById = async params => {
  const apiPath = getApiPath('/stores', params.storeId);
  let configurations = getConfigurations(httpMethods.GET, null, params.token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const updateStore = async params => {
  const apiPath = getApiPath('/stores', params.storeId);
  let configurations = getConfigurations(httpMethods.GET, null, params.token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const getCategories = async ({ page, perPage, token }) => {
  const apiPath = getApiPath('/groups', { page, perPage });
  let configurations = getConfigurations(httpMethods.GET, null, token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const getCategoryById = async ({ categoryId, token }) => {
  const apiPath = getApiPath('/groups', categoryId);
  let configurations = getConfigurations(httpMethods.GET, null, token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const updateCategory = async ({ categoryId, categoryData, token }) => {
  const apiPath = getApiPath('/groups', categoryId);
  let configurations = getConfigurations(httpMethods.PUT, categoryData, token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const categorySearch = async ({ keyword, token }) => {
  const apiPath = getApiPath('/group/search', { keyword });
  let configurations = getConfigurations(httpMethods.GET, null, token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const getOrders = async (params, token) => {
  const apiPath = getApiPath('/orders', params);
  let configurations = getConfigurations(httpMethods.GET, null, token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const getOrderById = async ({ orderId, token }) => {
  const apiPath = getApiPath('/orders', orderId);
  console.log(apiPath);
  let configurations = getConfigurations(httpMethods.GET, null, token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};
