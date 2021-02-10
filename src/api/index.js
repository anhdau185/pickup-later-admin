import { schemes, httpMethods, headers } from './staticEntries';

const scheme = schemes.HTTPS;
const host = 'def4867b084a.ngrok.io';
const basePath = '/api/v1';
const paths = {
  get: {
    orders: '/orders',
    products: '/products',
    stores: '/stores',
    groups: '/groups'
  },
  post: {
    orders: '/orders',
    login: '/mobile/users/login',
    authenticate: '/start_session',
    products: '/products',
    groups: '/groups'
  }
};

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
  const apiPath = getApiPath(paths.get.orders, params);
  const configurations = getConfigurations(httpMethods.GET);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const fetchOrder = async orderId => {
  const apiPath = getApiPath(paths.get.orders, orderId);
  const configurations = getConfigurations(httpMethods.GET);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const updateOrder = async orderData => {
  const apiPath = getApiPath(paths.post.orders);
  const configurations = getConfigurations(httpMethods.PUT, orderData);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const accountLogin = async authentication => {
  const apiPath = getApiPath(paths.post.login, null, false);
  const configurations = getConfigurations(httpMethods.POST, authentication);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const authenticateUser = async authToken => {
  const apiPath = getApiPath(paths.post.authenticate);
  let configurations = getConfigurations(httpMethods.POST, null, authToken);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const getProducts = async params => {
  const apiPath = getApiPath(paths.get.products, {
    page: params.page,
    perPage: params.perPage
  });
  let configurations = getConfigurations(httpMethods.GET, null, params.token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const getProductById = async params => {
  const apiPath = getApiPath(paths.get.products, params.productId);
  let configurations = getConfigurations(httpMethods.GET, null, params.token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const updateProduct = async params => {
  const apiPath = getApiPath(paths.post.products, params.productId);
  let configurations = getConfigurations(httpMethods.PUT, params.productData, params.token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const getStores = async params => {
  const apiPath = getApiPath(paths.get.stores, {
    page: params.page,
    perPage: params.perPage
  });
  let configurations = getConfigurations(httpMethods.GET, null, params.token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const getStoreById = async params => {
  const apiPath = getApiPath(paths.get.stores, params.storeId);
  let configurations = getConfigurations(httpMethods.GET, null, params.token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const updateStore = async params => {
  const apiPath = getApiPath(paths.get.stores, params.storeId);
  let configurations = getConfigurations(httpMethods.GET, null, params.token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const getCategories = async ({ page, perPage, token }) => {
  const apiPath = getApiPath(paths.get.groups, { page, perPage });
  let configurations = getConfigurations(httpMethods.GET, null, token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const getCategoryById = async ({ categoryId, token }) => {
  const apiPath = getApiPath(paths.get.groups, categoryId);
  let configurations = getConfigurations(httpMethods.GET, null, token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const updateCategory = async ({categoryId, categoryData, token}) => {
  const apiPath = getApiPath(paths.post.groups, categoryId);
  let configurations = getConfigurations(httpMethods.PUT, categoryData, token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};
