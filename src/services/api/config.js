import axios from 'axios';

const configAPI = async (
    endpoint,
    method = 'get',
    payload = {},
) => {
    const headers = {
        'Content-Type':
            String(method).toLowerCase() === 'delete'
                ? 'application/x-www-form-urlencoded'
                : 'application/json',
    };

    const serviceURL = process.env.REACT_APP_SERVICE_URL;

    const url = `${serviceURL}${endpoint}`;

    const options = {
        url,
        method,
        headers,
    };

    if (String(method).toLowerCase() === 'post' || String(method).toLowerCase() === 'put') {
        options.data = payload;
    } else {
        options.params = payload;
    }

    try {
        const response = await axios(options);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export default configAPI;
