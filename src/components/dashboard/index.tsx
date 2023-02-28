import React, { useEffect, useState } from 'react';
import { useSearchParams, Outlet } from 'react-router-dom';
import { Header } from './components';

export default function Dashboard() {
    const [searchParams, setSearchparams] = useSearchParams();
    const popup = searchParams.get('popup');
    const [showNewBill, setShowNewBill] = useState(false);

    const showBillHandle = () => {
        setShowNewBill(!showNewBill);
    };

    useEffect(() => {
        if (popup === 'create-bill') {
            setShowNewBill(true);
        } else {
            setShowNewBill(false);
        }
    }, [popup]);

    return (
        <div className="w-full">
            <Header />
            <Outlet />
        </div>
    );
}
