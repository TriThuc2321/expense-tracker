import { BASE_URL } from '~/constants';

export const request = async (url = '', method = 'GET', options = {}, header = {}) => {
    if (localStorage.getItem('accessToken')) {
        const res = await fetch(`${BASE_URL}/${url}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                ...header,
            },
            ...options,
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
