import { TrashIcon } from '@heroicons/react/24/outline';
import { useState, useEffect, useRef } from 'react';

import { Button, useAlert } from '~/components';
import { validateEmail } from '~/utils';
import { useStore } from '~/store/hooks';
import { updateWorkspace } from '~/services/apis/workspace';
import { getUserByEmail } from '~/services/apis/user';
import { IUser, IWorkspace } from '~/interfaces';
import { useOutsideHandle } from '~/hooks';

interface IEditWorkSpaceFormProps {
    toggleEditWorkspaceForm: (success: boolean) => void;
    workspace: IWorkspace;
}

export default function EditWorkspaceForm({ toggleEditWorkspaceForm, workspace }: IEditWorkSpaceFormProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    useOutsideHandle(wrapperRef, () => toggleEditWorkspaceForm(false));

    const { getUser } = useStore();
    const { showAlert, Alert } = useAlert();
    const [users, setUsers] = useState<Array<IUser>>([]);
    const [email, setEmail] = useState<string>('');
    const [workspaceName, setWorkspaceName] = useState<string>(workspace.name || '');

    const [inviteLoading, setInviteLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);

    useEffect(() => {
        setUsers(workspace.collaborators);
    }, []);

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
                const data = await getUserByEmail(email);

                if (data.user) {
                    setUsers([data.user, ...users]);
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

    const deleteHandle = (user: IUser) => {
        setUsers(users.filter((e) => e.email != user.email));
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
        const { _id } = workspace;

        const newWorkspace = {
            collaborators: users.map((e) => e._id),
            name: workspaceName,
            _id,
        };

        const data = await updateWorkspace(newWorkspace);

        if (data.updateWorkspace) {
            toggleEditWorkspaceForm(true);
        } else {
            toggleEditWorkspaceForm(false);
        }
        setSaveLoading(false);
    };

    return (
        <div className="flex justify-center fixed top-0 bottom-0 left-0 right-0 py-0 tablet:py-20 px-0 tablet:px-20 desktop:px-96 text-primary z-10 bg-primary03">
            <Alert />
            <div
                className="relative z-10 bg-white w-full desktop:w-2/3 h-full rounded-md shadow-md p-10 overflow-y-auto overflow-x-hidden"
                ref={wrapperRef}
            >
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Workspace name..."
                        className="mr-1 px-4 py-2 block w-full font-bold rounded-md text-lg border-b-2"
                        onChange={(e) => setWorkspaceName(e.target.value)}
                        value={workspaceName}
                    />
                    <div className="fixed bottom-4 right-0 left-0 px-4 tablet:px-0 tablet:relative tablet:pt-4 flex items-center">
                        <Button
                            text="Cancel"
                            outline
                            status="ACTIVE"
                            className="w-1/2 mr-2"
                            onClick={() => toggleEditWorkspaceForm(false)}
                        />
                        <Button
                            text="Update"
                            outline={false}
                            status={saveLoading ? 'LOADING' : 'ACTIVE'}
                            className="w-1/2 ml-2"
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
    deleteHandle: (e: IUser) => void;
};

function UserItem({ user, deleteHandle }: UserItemProps) {
    return (
        <div className="flex w-full px-4 py-0.5 my-1 rounded-md shadow-md justify-between">
            <div className="flex">
                <img src={user.picture || ''} className="h-6 w-6 rounded-full mr-2" />
                <p>{user.email}</p>
            </div>
            <TrashIcon className="h-5 w-5 m-1 cursor-pointer" onClick={() => deleteHandle(user)} />
        </div>
    );
}
