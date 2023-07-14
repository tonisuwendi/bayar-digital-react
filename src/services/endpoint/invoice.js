import configAPI from '../api/config';

const endpoint = {
    invoice: (id) => `invoice/${id}`,
};

export const getInvoice = (id) => configAPI(endpoint.invoice(id));
