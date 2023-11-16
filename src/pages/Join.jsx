import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
import backgroundImage from '../img/Photo.jpeg'; 

// function Copyright(props) {
//     return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//         {'Copyright © '}
//         <Link color="inherit" href="https://mui.com/">
//         Your Website
//         </Link>{' '}
//         {new Date().getFullYear()}
//         {'.'}
//     </Typography>
//     );
// }

    const defaultTheme = createTheme();


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
        email: data.get('email'),
        password: data.get('password'),
        });
    };
    

function Join() {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoggedInStatus = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL_2}/check-login`);
                setIsLoggedIn(response.data.isLoggedIn);
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };

        checkLoggedInStatus();
    }, []);

    const onJoinHandler = async () => {
        if (isLoggedIn) {
            alert('이미 로그인되어 있습니다.');
            return <Navigate to="/main" />;
        }

        if (!id || !password) {
            alert('아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL_2}/register`, {
                id: id,
                password: password,
            });

            console.log("Registration successful:", response.data);

            alert("회원가입에 성공했습니다. 로그인을 해주세요.");

            setIsRegistrationSuccess(true);
            navigate('/');
        } catch (error) {
            const errorData = error.response.data;

            if (error.response.status === 201) {
                console.log("Registration successful. Token:", errorData.token);
            } else if (error.response.status === 401) {
                if (errorData === "id 또는 password가 존재하지 않습니다.") {
                    alert("id 또는 password가 존재하지 않습니다.");
                } else if (errorData === "id 또는 password가 string이 아닙니다.") {
                    alert("id 또는 password가 string이 아닙니다.");
                } else if (errorData === "Duplicate entry for key 'PRIMARY'") {
                    alert("이미 존재하는 아이디입니다.");
                } else {
                    alert("이미 존재하는 아이디입니다.");
                }

                console.error("Registration failed:", errorData);
            }
        }
    };

    if (isRegistrationSuccess) {
        return <Navigate to="/" />;
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
            💜Sign in💜
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
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={onJoinHandler}
            >
                Sign In
            </Button>
            <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                <Link component={RouterLink} to="/" variant="body2">
                    {"이미 계정이 있으신가요? 로그인"}
                </Link>
                </Grid>
            </Grid>
            <Box mt={5}>
            </Box>
            </Box>
        </Box>
        </Grid>
    </Grid>
    </ThemeProvider>
    );
}

    

export default Join;
