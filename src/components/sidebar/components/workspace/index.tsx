import { Fragment, useRef, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, PlusIcon } from '@heroicons/react/24/solid';
import { PencilSquareIcon, EllipsisHorizontalIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';

import { deleteWorkspace, getMyWorkspace } from '~/services/apis/workspace';
import { NewWorkSpaceForm, EditWorkspaceForm } from './components';
import { useStore } from '~/store/hooks';
import { useAlert, useConfirmAlert } from '~/components';
import { useOutsideHandle } from '~/hooks';
import { IWorkspace } from '~/interfaces';

function Workspace() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    useOutsideHandle(wrapperRef, () => setShowMenu(false));

    const [searchParams, setSearchparams] = useSearchParams();
    const navigate = useNavigate();
    const { workspaceId } = useParams();
    const popup = searchParams.get('popup');

    const { setWorkspaces, getWorkspaces } = useStore();
    const workspaces = getWorkspaces();

    const { showAlert, Alert } = useAlert();
    const { showConfirmAlert, ConfirmAlert } = useConfirmAlert();
    const [selected, setSelected] = useState(workspaces[0]);
    const [showNewWorkspace, setShowNewWorkspace] = useState(false);
    const [showEditWorkspace, setShowEditWorkspace] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const deleteWorkspaceHandle = () => {
        const resolve = async () => {
            const data = await deleteWorkspace(selected._id);

            if (data.deleteWorkspace.type == 'SUCCESS') {
                const { myWorkspaces } = await getMyWorkspace();

                setWorkspaces(myWorkspaces);
                if (myWorkspaces.length >= 1) {
                    navigate(`workspace/${myWorkspaces[0]._id}`);
                } else {
                    navigate('/');
                }

                showAlert({
                    message: data.deleteWorkspace.message,
                    alertType: 'SUCCESS',
                });
            } else {
                showAlert({
                    message: data.deleteWorkspace.message,
                    alertType: 'ERROR',
                });
            }
        };

        const reject = () => {};

        showConfirmAlert({
            message: 'Are you sure you want to delete this workspace?',
            reject,
            resolve,
        });
    };

    useEffect(() => {
        if (popup === 'create-workspace') {
            setShowNewWorkspace(true);
        } else {
            setShowNewWorkspace(false);
        }
        if (popup === 'edit-workspace') {
            setShowEditWorkspace(true);
        } else {
            setShowEditWorkspace(false);
        }
    }, [popup]);

    useEffect(() => {
        if (workspaceId) {
            const workspace = workspaces.find((e) => e._id === workspaceId);
            if (workspace) {
                setSelected(workspace);
            } else {
                throw Error('Workspace not found');
            }
        } else {
            if (workspaces.length > 0) {
                navigate(`workspace/${workspaces[0]._id}`);
            }
        }
    }, [workspaceId, workspaces]);

    return (
        <div className="relative mt-4">
            <Alert />
            <ConfirmAlert />
            {showNewWorkspace && <NewWorkSpaceForm />}
            {selected && showEditWorkspace && <EditWorkspaceForm workspace={selected} />}

            {workspaces?.length == 0 ? (
                <p className="cursor-pointer" onClick={() => setSearchparams({ popup: 'create-workspace' })}>
                    Create new workspace
                </p>
            ) : (
                <Listbox value={selected} onChange={(value) => navigate(`/workspace/${value._id}`)}>
                    <div className="relative mt-1">
                        <Listbox.Button className="relative flex w-full cursor-pointer rounded-lg bg-primary py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block truncate font-bold">{selected?.name}</span>
                        </Listbox.Button>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <EllipsisHorizontalIcon
                                className="h-5 w-5 text-white cursor-pointer"
                                aria-hidden="true"
                                onClick={() => setShowMenu(!showMenu)}
                            />
                        </span>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-unselected py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {workspaces?.map((workspace, workspaceIdx) => (
                                    <Listbox.Option
                                        key={workspaceIdx}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active ? 'bg-amber-100 text-amber-900 font-bold' : 'text-gray-900'
                                            }`
                                        }
                                        value={workspace}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selected ? 'font-bold' : 'font-normal'
                                                    }`}
                                                >
                                                    {workspace?.name}
                                                </span>
                                                {selected ? (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            )}

            {showMenu && (
                <div
                    className="flex flex-col absolute top-10 left-0 right-0 rounded-md bg-gray-600 px-4 py-2"
                    ref={wrapperRef}
                >
                    <div
                        className="my-2 flex items-center justify-end cursor-pointer"
                        onClick={() => setSearchparams({ popup: 'create-workspace' })}
                    >
                        <p>New workspace</p>
                        <PlusIcon className="h-5 w-5 text-white ml-2" aria-hidden="true" />
                    </div>

                    <div
                        className="my-2 flex items-center justify-end cursor-pointer"
                        onClick={() => setSearchparams({ popup: 'edit-workspace' })}
                    >
                        <p>Edit workspace</p>
                        <PencilSquareIcon className="h-5 w-5 text-white ml-2" aria-hidden="true" />
                    </div>

                    <div className="my-2 flex items-center justify-end cursor-pointer" onClick={deleteWorkspaceHandle}>
                        <p>Delete workspace</p>
                        <TrashIcon className="h-5 w-5 text-white ml-2" aria-hidden="true" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Workspace;
