import { useEffect } from 'react';

function Login() {
    const handleCallbackGoogle = (res) => {
        console.log(res.credential);
    };
    useEffect(() => {
        google.accounts.id.initialize({
            client_id: '515743923635-rk2onecrrhetov5iadhjqaeq71i8ua41.apps.googleusercontent.com',
            callback: handleCallbackGoogle,
        });

        google.accounts.id.renderButton(document.getElementById('signInDiv'), {
            theme: 'ouline',
            size: 'large',
        });
    }, []);

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="w-1/3 px-6 py-8 bg-primary">
                <h1>Expense tracker</h1>
                <p className="mt-2">Beware of little expenses. A small leak will sink a great ship.</p>
                <div className="mt-6" id="signInDiv"></div>
            </div>
        </div>
    );
}

export default Login;
