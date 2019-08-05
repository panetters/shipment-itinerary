import axios from 'axios';

const baseURL = 'https://dev-api.shipwell.com';

export const addressValidation = async address => {
  try {
    const res = await axios.post(`${baseURL}/v2/locations/addresses/validate/`, {
      formatted_address: address,
    });
    return res;
  } catch (err) {
    throw new Error(err);
  }
};
