import React from 'react';
import { Bills, Header } from './components';

export default function Dashboard() {
    return (
        <div className="w-full">
            <Header />
            <Bills />
        </div>
    );
}
