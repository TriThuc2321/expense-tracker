import React, { useState } from 'react';
import { Bills, Header, NewBillForm } from './components';

export default function Dashboard() {
    const [showNewBill, setShowNewBill] = useState(false);

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
