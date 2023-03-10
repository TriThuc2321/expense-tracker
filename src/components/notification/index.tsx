import { createClient } from 'graphql-ws';
import { useEffect, useState } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { BellAlertIcon } from '@heroicons/react/24/solid';
import { GRAPHQL_SUBSCRIPTION_ENDPOINT } from '~/services/constants';

const client = createClient({
    url: GRAPHQL_SUBSCRIPTION_ENDPOINT,
});

const query = `subscription PushNotification {
    notification {
      message
    }
  }`;

export default function Notification() {
    const [hasNewNoti, setHasNewNoti] = useState(false);
    const [showNoti, setShowNoti] = useState(false);
    const [noti, setNoti] = useState('');

    const handleBellClick = () => {
        setShowNoti(!showNoti);
        setHasNewNoti(false);
    };

    useEffect(() => {
        (async () => {
            const onNext = (data: any) => {
                const message = data?.data?.notification?.message;
                setNoti(message);
                setHasNewNoti(true);
            };

            await new Promise((resolve, reject) => {
                client.subscribe(
                    {
                        query,
                    },
                    {
                        next: onNext,
                        error: reject,
                        complete: resolve,
                    },
                );
            });
        })();
    }, []);
    return (
        <div>
            {hasNewNoti ? (
                <BellAlertIcon width={24} height={24} onClick={handleBellClick} />
            ) : (
                <BellIcon width={24} height={24} onClick={handleBellClick} />
            )}

            {showNoti && (
                <div className="absolute w-2/3 bg-white z-10 right-6 px-4 py-2 rounded-lg">
                    <p className="text-primary">{noti}</p>
                </div>
            )}
        </div>
    );
}
