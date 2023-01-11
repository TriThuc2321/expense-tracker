import './index.css';

export default function Loader() {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="loader">
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
            </div>
        </div>
    );
}
