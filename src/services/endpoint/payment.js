import configAPI from '../api/config';

const endpoint = {
    pay: (id) => `pay/${id}`,
};

export const payInvoice = (id, payload) => configAPI(endpoint.pay(id), 'POST', payload);
export const getPayment = (id) => configAPI(endpoint.pay(id));
