import React, { useEffect, useState } from 'react';
import { Bills, Header, NewBillForm } from './components';

import { request } from '~/services/request';

export default function Dashboard() {
    const [showNewBill, setShowNewBill] = useState(false);
    useEffect(() => {
        const getUser = async () => {
            request('user', 'GET');
            const data = await request('user', 'GET');
            console.log(data);
        };

        getUser();
    }, []);

    const showBillHandle = () => {
        setShowNewBill(!showNewBill);
    };

    return (
        <div className="w-full">
            <Header />
            <Bills showBillHandle={showBillHandle} />
            {showNewBill && <NewBillForm showBillHandle={showBillHandle} />}
        </div>
    );
}
