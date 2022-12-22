import { AppBar, IconButton, Toolbar, Typography, Stack, Button } from '@mui/material';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Link } from 'react-router-dom';
import { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserData, userAction } from '../store/userSlice';
import type { AppDispatch, RootState } from '../store/store';
import { get } from '../api/API';

const NavBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(loginUserData());
  }, []);
  const isLogin = useSelector<RootState>((state) => state.userReducer.isLogin);

  const logout = async () => {
    await get('/api/auth/logout');
    dispatch(userAction.logout());
  };

  const fetchMyParty = async () => {
    const myPartyList = await get('/api/parties/likedParty');
    console.log(myPartyList);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/">
          <IconButton>
            <FastfoodIcon />
          </IconButton>
        </Link>
        <Typography fontSize={30} component="div" sx={{ flexGrow: 1 }}>
          Bobhub
        </Typography>
        <Stack direction="row" spacing={2}>
          <Link to="/userGuide" style={{ color: 'white', textDecoration: 'none' }}>
            <Button color="inherit">밥허브 이용가이드</Button>
          </Link>
          {isLogin ? (
            <Fragment>
              <Link to="/mypage" style={{ color: 'white', textDecoration: 'none' }}>
                <Button color="inherit">마이페이지</Button>
              </Link>
              <Button color="inherit" onClick={fetchMyParty}>
                찜 목록
              </Button>
            </Fragment>
          ) : (
            <div></div>
          )}
          {isLogin ? (
            <Button onClick={logout} color="inherit">
              로그아웃
            </Button>
          ) : (
            <Fragment>
              <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
                <Button color="inherit">로그인</Button>
              </Link>
              <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>
                <Button color="inherit">회원가입</Button>
              </Link>
            </Fragment>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
