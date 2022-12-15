import { Fragment, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
} from '@mui/material';
import { UserType } from './Users';
import UserModal from './UserModal';
import styled from 'styled-components';

let selectUser: UserType | undefined;

interface UserTableProps {
  users: UserType[];
  fetchUserData: () => void;
}

const UserTable = ({ users, fetchUserData }: UserTableProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = (user: UserType) => {
    selectUser = user;
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const createUserData = (name: string, email: string, id: string, auth: string) => {
    return { name, email, id, auth };
  };

  const rowData = users.map((user) => createUserData(user.name, user.email, user.id, user.auth));
  return (
    <Fragment>
      <UserModal
        fetchUserData={fetchUserData}
        handleClose={handleClose}
        open={open}
        user={selectUser}
      />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">권한</TableCell>
              <TableCell align="center">수정</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((user) => (
              <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.auth}</TableCell>
                <TableCell align="center">
                  <button onClick={() => handleOpen(user)}>정보 조회</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default UserTable;
