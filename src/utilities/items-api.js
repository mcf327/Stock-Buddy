import sendRequest from './send-request';

const BASE_URL = '/api/items';

export async function getAll() {
    return sendRequest(BASE_URL);
}

export async function getItemsByVendorId(vendorId) {
    const url = `${BASE_URL}/byVendor/${vendorId}`;
    return sendRequest(url);
  }