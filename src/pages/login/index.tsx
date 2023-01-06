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
        <div className="App">
            <h1>Expense tracker</h1>
            <p>Beware of little expenses. A small leak will sink a great ship.</p>
            <div id="signInDiv"></div>
        </div>
    );
}

export default Login;
