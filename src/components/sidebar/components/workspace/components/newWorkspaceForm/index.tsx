import { TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

import { Button, useAlert } from '~/components';
import { validateEmail, getUId } from '~/utils';
import { useStore } from '~/store/hooks';
import { addWorkspace } from '~/services/apis/workspace';
import { checkEmailExisted } from '~/services/apis/user';

interface INewWorkSpaceFormProps {
    toggleNewWorkspaceForm: (success: boolean) => void;
}

export default function NewWorkSpaceForm({ toggleNewWorkspaceForm }: INewWorkSpaceFormProps) {
    const { getUser } = useStore();
    const { showAlert, Alert } = useAlert();
    const [emails, setEmails] = useState<Array<string>>([]);
    const [email, setEmail] = useState<string>('');
    const [workspaceName, setWorkspaceName] = useState<string>('Untitled');

    const inviteHandle = async () => {
        if (validateEmail(email)) {
            if (emails.includes(email)) {
                showAlert({
                    message: 'Email has already existed',
                    alertType: 'ERROR',
                });
            } else {
                const { status, message } = await checkEmailExisted(email);

                if (status == 'SUCCESS' && message) {
                    setEmails([email, ...emails]);
                    setEmail('');
                } else {
                    showAlert({
                        message: 'Email was not registered',
                        alertType: 'ERROR',
                    });
                }
            }
        } else {
            showAlert({
                message: 'Email invalided',
                alertType: 'ERROR',
            });
        }
    };

    const deleteHandle = (email: string) => {
        setEmails(emails.filter((e) => e != email));
    };

    const saveHandle = async () => {
        if (!workspaceName) {
            showAlert({
                message: 'Please enter workspace name',
                alertType: 'ERROR',
            });
            return;
        }
        const { email } = getUser();

        const newWorkSpace = {
            emails: [email, ...emails],
            workspaceName,
            workspaceId: getUId(),
        };
        const { status } = await addWorkspace(newWorkSpace);

        if (status == 'SUCCESS') {
            toggleNewWorkspaceForm(true);
        } else {
            toggleNewWorkspaceForm(false);
        }
    };

    return (
        <div className="flex justify-center absolute top-0 bottom-0 left-0 right-0 py-20 px-96 text-primary">
            <Alert />
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
                        <Button text="Cancel" outline className="mx-2" onClick={() => toggleNewWorkspaceForm(false)} />
                        <Button text="Save" outline={false} className="" onClick={saveHandle} />
                    </div>
                </div>

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
