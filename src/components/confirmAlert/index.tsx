import { useState, Fragment } from 'react';

import { CheckIcon, XMarkIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface IAlertProps {
    message: string;
    resolve: () => void;
    reject: () => void;
}

interface IAlert extends IAlertProps {
    visible: boolean;
}

function Alert({ message, resolve, reject }: IAlertProps) {
    return (
        <div className="flex items-center justify-center w-1/4 px-4 py-2 rounded-md text-white bg-warning fixed bottom-4 left-4 z-10">
            <p>{message}</p>
            <div className="flex">
                <XMarkIcon
                    className="w-5 h-5 border rounded-md hover:text-warning hover:bg-white cursor-pointer"
                    onClick={reject}
                />
                <CheckIcon
                    className="ml-1 w-5 h-5 border rounded-md hover:text-warning hover:bg-white cursor-pointer"
                    onClick={resolve}
                />
            </div>
        </div>
    );
}

const useConfirmAlert = () => {
    const [alert, setAlert] = useState<IAlert>({
        message: '',
        visible: false,
        resolve: () => {},
        reject: () => {},
    });

    const showConfirmAlert = (alertProps: IAlertProps) => {
        setAlert({ ...alertProps, visible: true });
    };

    const resolveHandle = () => {
        alert.resolve();

        setAlert({
            ...alert,
            visible: false,
        });
    };

    const rejectHandle = () => {
        alert.reject();

        setAlert({
            ...alert,
            visible: false,
        });
    };

    return {
        showConfirmAlert,
        ConfirmAlert: () =>
            alert.visible ? (
                <Alert message={alert.message} resolve={resolveHandle} reject={rejectHandle} />
            ) : (
                <Fragment />
            ),
    };
};

export default useConfirmAlert;
