import { TrashIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

import { Button, Alert } from '~/components';
import { validateEmail, getUId } from '~/utils';
import { useStore } from '~/store/hooks';
import { addWorkspace } from '~/services/apis/workspace';

type IErrorMessage = {
    title: string;
    visible: boolean;
};

export default function NewWorkSpaceForm({ showNewWorkspaceForm }: { showNewWorkspaceForm: () => void }) {
    const { getUser } = useStore();
    const [emails, setEmails] = useState<Array<string>>([]);
    const [email, setEmail] = useState<string>('');
    const [workspaceName, setWorkspaceName] = useState<string>('Untitled');

    const [errorMgs, setErrorMgs] = useState<IErrorMessage>({
        title: '',
        visible: false,
    });

    const inviteHandle = () => {
        if (validateEmail(email)) {
            if (emails.includes(email)) {
                setErrorMgs({
                    title: 'Email has already existed',
                    visible: true,
                });
            } else {
                setEmails([email, ...emails]);
                setEmail('');
            }
        } else {
            setErrorMgs({
                title: 'Email invalided',
                visible: true,
            });
        }
    };

    useEffect(() => {
        if (errorMgs.visible) {
            const timer = setTimeout(
                () =>
                    setErrorMgs({
                        title: '',
                        visible: false,
                    }),
                3000,
            );

            return () => {
                clearTimeout(timer);
            };
        }
    }, [errorMgs]);

    const deleteHandle = (email: string) => {
        setEmails(emails.filter((e) => e != email));
    };

    const saveHandle = () => {
        const { email } = getUser();

        const newWorkSpace = {
            emails: [email, ...emails],
            workspaceName,
            workspaceId: getUId(),
        };
        addWorkspace(newWorkSpace);
    };

    return (
        <div className="flex justify-center absolute top-0 bottom-0 left-0 right-0 py-20 px-96 text-primary">
            <div className="relative z-10 bg-white w-2/3 h-full rounded-md shadow-md p-10 overflow-y-auto overflow-x-hidden">
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Workspace name..."
                        className="mt-1 mr-1 px-4 py-2 block w-full font-bold rounded-md text-lg border-b-2"
                        onChange={(e) => setWorkspaceName(e.target.value)}
                        value={workspaceName}
                    />
                    <div className="flex items-center">
                        <Button text="Cancel" outline className="mx-2" onClick={showNewWorkspaceForm} />
                        <Button text="Save" outline={false} className="" onClick={saveHandle} />
                    </div>
                </div>

                {errorMgs.visible && <Alert message={errorMgs.title} alertType="ERROR" />}

                <div className="flex items-center mt-4 mb-4">
                    <input
                        type="text"
                        placeholder="Email..."
                        className="mt-1 mr-1 px-4 py-2 block w-full rounded-md border-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                inviteHandle();
                            }
                        }}
                    />
                    <Button text="Invite" onClick={inviteHandle} className="ml-1" outline={false} />
                </div>

                {emails.map((email) => (
                    <EmailItem email={email} key={email} deleteHandle={deleteHandle} />
                ))}
            </div>
        </div>
    );
}

type EmailItemProps = {
    email: string;
    deleteHandle: (e: string) => void;
};

function EmailItem({ email, deleteHandle }: EmailItemProps) {
    return (
        <div className="flex w-full px-4 py-0.5 my-1 rounded-md shadow-md justify-between">
            <p>{email}</p>
            <TrashIcon className="h-5 w-5 m-1 cursor-pointer" onClick={() => deleteHandle(email)} />
        </div>
    );
}
