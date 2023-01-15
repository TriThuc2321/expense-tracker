import React from 'react';

import logo from '~/assets/logo.png';
import { Menu, Footer } from './components';

export default function Sidebar() {
    return (
        <div className="bg-primary min-w-max h-screen p-6">
            <div
                className=" flex justify-center items-center cursor-pointer w-full"
                onClick={() => {
                    window.location.reload();
                }}
            >
                <img className="w-10 h-10" src={logo} alt="Expense tracker" />
                <p className="font-bold ml-4">EXPENSE TRACKER</p>
            </div>

            <Menu />
            <Footer />
        </div>
    );
}
