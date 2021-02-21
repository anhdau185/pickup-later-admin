import { schemes, httpMethods, headers } from './staticEntries';

const scheme = schemes.HTTPS;
const host = 'f6d49fc4a67d.ngrok.io';
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

export const getProducts = async ({ page, perPage, token }) => {
  const apiPath = getApiPath('/products', { page, perPage });
  let configurations = getConfigurations(httpMethods.GET, null, token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const getProductById = async ({ productId, token }) => {
  const apiPath = getApiPath('/products', productId);
  let configurations = getConfigurations(httpMethods.GET, null, token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const updateProduct = async ({ productId, productData, token }) => {
  const apiPath = getApiPath('/products', productId);
  let configurations = getConfigurations(httpMethods.PUT, productData, token);
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

export const getStores = async ({ page, perPage, token }) => {
  const apiPath = getApiPath('/stores', { page, perPage });
  let configurations = getConfigurations(httpMethods.GET, null, token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const getStoreById = async ({ storeId, token }) => {
  const apiPath = getApiPath('/stores', storeId);
  let configurations = getConfigurations(httpMethods.GET, null, token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const updateStore = async ({ storeId, storeData, token }) => {
  const apiPath = getApiPath('/stores', storeId);
  let configurations = getConfigurations(httpMethods.PUT, storeData, token);
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

export const getCombos = async ({ page, perPage, token }) => {
  const apiPath = getApiPath('/combos', { page, perPage });
  let configurations = getConfigurations(httpMethods.GET, null, token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const getComboById = async ({ comboId, token }) => {
  const apiPath = getApiPath('/combos', comboId);
  let configurations = getConfigurations(httpMethods.GET, null, token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const getCampaigns = async ({ page, perPage, token }) => {
  const apiPath = getApiPath('/campaigns', { page, perPage });
  let configurations = getConfigurations(httpMethods.GET, null, token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const getCampaignById = async ({ campaignId, token }) => {
  const apiPath = getApiPath('/campaigns', campaignId);
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
  let configurations = getConfigurations(httpMethods.GET, null, token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const getLocations = async ({ page, perPage, token }) => {
  const apiPath = getApiPath('/locations', { page, perPage });
  let configurations = getConfigurations(httpMethods.GET, null, token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const getLocationById = async ({ locationId, token }) => {
  const apiPath = getApiPath('/locations', locationId);
  let configurations = getConfigurations(httpMethods.GET, null, token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const getBuildings = async ({ page, perPage, token }) => {
  const apiPath = getApiPath('/buildings', { page, perPage });
  let configurations = getConfigurations(httpMethods.GET, null, token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const getBuildingById = async ({ buildingId, token }) => {
  const apiPath = getApiPath('/buildings', buildingId);
  let configurations = getConfigurations(httpMethods.GET, null, token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const getVouchers = async ({ page, perPage, token }) => {
  const apiPath = getApiPath('/vouchers', { page, perPage });
  let configurations = getConfigurations(httpMethods.GET, null, token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const getVoucherById = async ({ voucherId, token }) => {
  const apiPath = getApiPath('/vouchers', voucherId);
  let configurations = getConfigurations(httpMethods.GET, null, token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const getCustomers = async ({ page, perPage, token }) => {
  const apiPath = getApiPath('/customers', { page, perPage });
  let configurations = getConfigurations(httpMethods.GET, null, token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const getCustomerById = async ({ customerId, token }) => {
  const apiPath = getApiPath('/customers', customerId);
  let configurations = getConfigurations(httpMethods.GET, null, token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};

export const getDashboardData = async token => {
  const apiPath = getApiPath('/admin/dashboard');
  let configurations = getConfigurations(httpMethods.GET, null, token);
  const response = await fetch(apiPath, configurations);
  const data = await response.json();
  return data;
};
