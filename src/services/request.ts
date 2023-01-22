import { BASE_URL } from '~/constants';

export const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

export const request = async (url = '', method = METHODS.GET, payload = {}, header = {}) => {
    if (localStorage.getItem('accessToken')) {
        let body = {};

        if (method != METHODS.GET) {
            body = {
                body: JSON.stringify(payload),
            };
        }

        const res = await fetch(`${BASE_URL}/${url}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                ...header,
            },
            ...body,
        });

        if (!res.ok) {
            if (res.status === 403) {
                return null;
            }
        }

        const data = await res.json();
        return data;
    }

    return null;
};
