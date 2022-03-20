import React from "react";
import {
  Container,
  Box,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const path = location.pathname;

  if (path === "/signin" || path === "/signup") return "";

  return (
    <Box as="header" h="60px" borderBottom="1px solid rgba(0,0,0,0.1)">
      <Container
        maxW="container.lg"
        h="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Heading as="h1" size="md">
          ExpenseTracker
        </Heading>

        <Menu>
          <MenuButton as={Button} rightIcon={<BsChevronDown />}>
            {user && user.name}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Container>
    </Box>
  );
};

export default Header;
