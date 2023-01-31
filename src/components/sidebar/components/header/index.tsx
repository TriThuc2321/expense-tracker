import logo from '~/assets/logo.png';
import { useStore } from '~/store/hooks';

function Header() {
    const { getUser } = useStore();
    const user = getUser();

    return (
        <div>
            <div
                className=" flex justify-center items-center cursor-pointer w-full"
                onClick={() => {
                    window.location.reload();
                }}
            >
                <img className="w-10 h-10" src={logo} alt="Expense tracker" />
                <p className="font-bold ml-4">EXPENSE TRACKER</p>
            </div>

            <div className="flex mt-2">
                <img src={user.picture || ''} className="h-6 w-6 rounded-full mr-2" />
                <p>{user.fullName}</p>
            </div>
        </div>
    );
}

export default Header;
