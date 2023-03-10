import { Navigate, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';

import { addNewUser } from '~/services/apis/user';

function Login() {
    const navigate = useNavigate();
    if (localStorage.getItem('accessToken')) {
        return <Navigate to="/" />;
    }

    const auth = getAuth();

    const handleLoginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        const {
            user: { uid, displayName, email, photoURL },
        } = await signInWithPopup(auth, provider);

        const newUser = {
            name: displayName,
            uid,
            email: email ? email : '',
            picture: photoURL,
        };

        addNewUser(newUser);
        navigate('/');
    };

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="w-1/3 px-6 py-8 bg-primary">
                <p style={{ fontSize: '26px', fontWeight: 'bold' }}>Expense tracker</p>
                <p className="mt-2">Beware of little expenses. A small leak will sink a great ship.</p>

                <div
                    className="flex rounded-xl bg-white items-center mt-6 cursor-pointer p-2 justify-center"
                    onClick={handleLoginWithGoogle}
                >
                    <img className="h-6 w-6 " src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="" />
                    <p className="ml-4 text-primary font-bold">Login with google</p>
                </div>
            </div>
        </div>
    );
}

export default Login;
