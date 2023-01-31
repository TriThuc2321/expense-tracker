import React, { useEffect, useState, Fragment } from 'react';
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

type IAlert = {
    message: string;
    alertType: 'SUCCESS' | 'ERROR' | 'WARNING' | 'INFO';
    visible: boolean;
};

function Alert({ message, alertType }: IAlertProps) {
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

const useAlert = () => {
    const [alert, setAlert] = useState<IAlert>({
        message: '',
        alertType: 'SUCCESS',
        visible: false,
    });

    const showAlert = (alertProps: IAlertProps) => {
        setAlert({ ...alertProps, visible: true });
    };

    useEffect(() => {
        if (alert.visible) {
            const timer = setTimeout(
                () =>
                    setAlert({
                        ...alert,
                        visible: false,
                    }),
                3000,
            );

            return () => {
                clearTimeout(timer);
            };
        }
    }, [alert]);

    return {
        showAlert,
        Alert: () => (alert.visible ? <Alert message={alert.message} alertType={alert.alertType} /> : <Fragment />),
    };
};

export default useAlert;
