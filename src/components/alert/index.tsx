import React from 'react';
import clsx from 'clsx';
import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/outline';

type IAlertProps = {
    message: string;
    alertType: 'SUCCESS' | 'ERROR' | 'WARNING' | 'INFO';
};

export default function Alert({ message, alertType }: IAlertProps) {
    return (
        <div
            className={clsx(
                { ['bg-success']: alertType == 'SUCCESS' },
                { ['bg-error']: alertType == 'ERROR' },
                { ['bg-warning']: alertType == 'WARNING' },
                { ['bg-info']: alertType == 'INFO' },
                'flex items-center justify-between w-1/5 px-4 py-2 rounded-md text-white fixed bottom-4 left-4',
            )}
        >
            <p>{message}</p>

            {alertType == 'SUCCESS' ? (
                <CheckCircleIcon className="w-5 h-5" />
            ) : alertType == 'ERROR' ? (
                <ExclamationCircleIcon className="w-5 h-5" />
            ) : alertType == 'WARNING' ? (
                <ExclamationTriangleIcon className="w-5 h-5" />
            ) : alertType == 'INFO' ? (
                <InformationCircleIcon className="w-5 h-5" />
            ) : null}
        </div>
    );
}
