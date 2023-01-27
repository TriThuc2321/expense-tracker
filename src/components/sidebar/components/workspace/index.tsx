import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, PlusIcon } from '@heroicons/react/20/solid';

import { getWorkspaceByEmail } from '~/services/apis/workspace';
import { NewWorkSpaceForm } from './components';
import { useStore } from '~/store/hooks';
import { IWorkspace } from '~/interfaces';

function Workspace() {
    const { getUser } = useStore();
    const [workspaces, setWorkspaces] = useState<Array<IWorkspace>>([]);
    const [selected, setSelected] = useState<IWorkspace>({ workspaceId: '1', workspaceName: '' });
    const [showNewWorkspace, setShowNewWorkspace] = useState(false);

    useEffect(() => {
        const getWorkspaces = async () => {
            const { email } = getUser();
            const workspaces = await getWorkspaceByEmail(email);
            setWorkspaces(workspaces);
            setSelected(workspaces[0]);
        };
        getWorkspaces();
    }, []);
    const showNewWorkspaceForm = () => {
        setShowNewWorkspace(!showNewWorkspace);
    };

    return (
        <div>
            {showNewWorkspace && <NewWorkSpaceForm showNewWorkspaceForm={showNewWorkspaceForm} />}
            {workspaces.length == 0 ? (
                <p className="cursor-pointer" onClick={showNewWorkspaceForm}>
                    Create new workspace
                </p>
            ) : (
                <Listbox value={selected} onChange={setSelected}>
                    <div className="relative mt-1">
                        <Listbox.Button className="relative flex w-full cursor-pointer rounded-lg bg-primary py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block truncate font-bold">{selected?.workspaceName}</span>
                        </Listbox.Button>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <PlusIcon
                                className="h-5 w-5 text-white cursor-pointer"
                                aria-hidden="true"
                                onClick={showNewWorkspaceForm}
                            />
                        </span>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-unselected py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {workspaces.map((workspace, workspaceIdx) => (
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
                                                    {workspace?.workspaceName}
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
        </div>
    );
}

export default Workspace;
