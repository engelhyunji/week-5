import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Main() {
    const location = useLocation();
    const userToken = location.state?.userToken;
    const userId = location.state?.userId;
    const navigate = useNavigate();

    const handleLogout = () => {
        clearAuthData();
        navigate('/');
    };

    const clearAuthData = () => {
    };

    if (!userToken) {
        navigate('/login');
        return null; 
    }

    return (
        <div>
            <h2>Main</h2>
            <div>
                <p>{`환영합니다, ${userId} 님!`}</p>
                <p>User Information:</p>
                <p>Token: {userToken}</p>
                <button onClick={handleLogout}>로그아웃</button>
            </div>
        </div>
    );
}

export default Main;
