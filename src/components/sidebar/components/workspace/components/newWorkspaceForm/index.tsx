import { TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Button, useAlert } from '~/components';
import { validateEmail, getUId } from '~/utils';
import { useStore } from '~/store/hooks';
import { addWorkspace } from '~/services/apis/workspace';
import { getUserById } from '~/services/apis/user';
import { IUser } from '~/interfaces';

interface INewWorkSpaceFormProps {
    toggleNewWorkspaceForm: (success: boolean) => void;
}

export default function NewWorkSpaceForm({ toggleNewWorkspaceForm }: INewWorkSpaceFormProps) {
    const { getUser } = useStore();
    const { showAlert, Alert } = useAlert();
    const [users, setUsers] = useState<Array<IUser>>([]);
    const [email, setEmail] = useState<string>('');
    const [workspaceName, setWorkspaceName] = useState<string>('Untitled');

    const [inviteLoading, setInviteLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);

    const inviteHandle = async () => {
        setInviteLoading(true);
        if (validateEmail(email)) {
            const userEmail = getUser().email;

            if (users.find((e) => e.email == email) || email === userEmail) {
                showAlert({
                    message: 'Email has already existed',
                    alertType: 'ERROR',
                });
            } else {
                const { status, data } = await getUserById(email);

                if (status == 'SUCCESS' && data) {
                    setUsers([data, ...users]);
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
        setInviteLoading(false);
    };

    const deleteHandle = (email: string) => {
        setUsers(users.filter((e) => e.email != email));
    };

    const saveHandle = async () => {
        setSaveLoading(true);
        if (!workspaceName) {
            showAlert({
                message: 'Please enter workspace name',
                alertType: 'ERROR',
            });
            return;
        }
        const { email } = getUser();

        const newWorkSpace = {
            emails: [email, ...users.map((e) => e.email)],
            workspaceName,
            workspaceId: getUId(),
            email,
        };
        const { status } = await addWorkspace(newWorkSpace);

        if (status == 'SUCCESS') {
            toggleNewWorkspaceForm(true);
        } else {
            toggleNewWorkspaceForm(false);
        }
        setSaveLoading(false);
    };

    return (
        <div className="flex justify-center absolute top-0 bottom-0 left-0 right-0 py-20 px-96 text-primary z-10 bg-primary03">
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
                        <Button
                            text="Cancel"
                            outline
                            status="ACTIVE"
                            className="mx-2"
                            onClick={() => toggleNewWorkspaceForm(false)}
                        />
                        <Button
                            text="Save"
                            outline={false}
                            status={saveLoading ? 'LOADING' : 'ACTIVE'}
                            className=""
                            onClick={saveHandle}
                        />
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
                    <Button
                        text="Invite"
                        status={inviteLoading ? 'LOADING' : 'ACTIVE'}
                        onClick={inviteHandle}
                        className="ml-1"
                        outline={false}
                    />
                </div>

                {users.map((user) => (
                    <UserItem user={user} key={user.email} deleteHandle={deleteHandle} />
                ))}
            </div>
        </div>
    );
}

type UserItemProps = {
    user: IUser;
    deleteHandle: (e: string) => void;
};

function UserItem({ user, deleteHandle }: UserItemProps) {
    return (
        <div className="flex w-full px-4 py-0.5 my-1 rounded-md shadow-md justify-between">
            <div className="flex">
                <img src={user?.picture} className="h-6 w-6 rounded-full mr-2" />
                <p>{user.email}</p>
            </div>
            <TrashIcon className="h-5 w-5 m-1 cursor-pointer" onClick={() => deleteHandle(user.email)} />
        </div>
    );
}
