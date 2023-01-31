import React from 'react';

import { Menu, Footer, Header } from './components';

export default function Sidebar() {
    return (
        <div className="bg-primary min-w-max h-screen p-6">
            <Header />
            <Menu />
            <Footer />
        </div>
    );
}
