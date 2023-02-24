import { XMarkIcon } from '@heroicons/react/24/outline';
import logo from '~/assets/logo.png';
import { useStore } from '~/store/hooks';

function Header({ setHideMenu }: { setHideMenu: (arg0: boolean) => void }) {
    const { getUser } = useStore();
    const user = getUser();

    return (
        <div>
            <div className="flex items-center">
                <div
                    className=" flex justify-center items-center cursor-pointer w-full"
                    onClick={() => {
                        window.location.reload();
                    }}
                >
                    <img className="w-10 h-10" src={logo} alt="Expense tracker" />
                    <p className="font-bold mx-4">EXPENSE TRACKER</p>
                </div>
                <XMarkIcon
                    className="block tablet:hidden cursor-pointer"
                    width={24}
                    height={24}
                    onClick={() => setHideMenu(true)}
                />
            </div>

            <div className="flex mt-2">
                <img src={user.picture || ''} className="h-6 w-6 rounded-full mr-2" />
                <p>{user.name}</p>
            </div>
        </div>
    );
}

export default Header;
