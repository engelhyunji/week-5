import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import backgroundImage from '../img/Photo.jpeg';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

    const defaultTheme = createTheme();

    const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
        email: data.get('email'),
        password: data.get('password'),
    });
    };

    const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const fetchUser = async () => {
        try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL_2}/user`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log('User Data:', response.data);
        } catch (error) {
        console.error('Failed to fetch user data:', error);
        }
    };

    const handleLogin = async () => {
        try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL_2}/login`, {
            id: id,
            password: password,
        });

        const user = response.data;

        if (user && user.token) {
            console.log('로그인 성공:', user);
            setError(null);
            setToken(user.token);
            setIsLoggedIn(true);
            alert('로그인에 성공했습니다.');

            const time = 3600;
            const expiration = new Date(Date.now() + time * 1000);
            Cookies.set('token', user.token, {
            path: '/',
            secure: true,
            sameSite: 'none',
            expires: expiration,
            });

            setTimeout(() => {
            alert('토큰이 만료됐습니다. 다시 로그인해주세요');
            }, time * 1000);

            return <Navigate to="/main" state={{ userToken: user.token, userId: id }} replace />;
        } else {
            console.error('로그인 실패: 유저를 찾을 수 없음');
            alert('로그인에 실패했습니다. 다시 시도해주세요.');
        }
        } catch (error) {
        console.error('에러 발생:', error);
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const onButtonClick = () => {
        if (isLoggedIn) {
        fetchUser();
        } else {
        handleLogin();
        }
    };

    if (isLoggedIn) {
        return <Navigate to="/main" state={{ userToken: token, userId: id }} replace />;
    }

    return (
        <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
                sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                💜Login💜
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    type="text"
                    id="id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                {isLoggedIn ? 'User 정보 확인' : '로그인'}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={onButtonClick}
                >
                    Login
                </Button>
                <Grid container>
                    <Grid item xs>
                    {/* ... */}
                    </Grid>
                    <Grid item>
                    <Link component={RouterLink} to="/join" variant="body2">
                        {"아직 계정이 없으신가요? 회원가입"}
                    </Link>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    </Grid>
                </Grid>
                <Box mt={5}>
                    {/* ... */}
                </Box>
                </Box>
            </Box>
            </Grid>
        </Grid>
        </ThemeProvider>
    );
    };

    export default Login;
