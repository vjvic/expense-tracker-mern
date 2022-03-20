import React, { useEffect } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link as routerLink, useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const Signup = () => {
  const inputs = [
    {
      id: 1,
      name: "Username",
      type: "text",
      placeholder: "Enter username",
      register: "username",
    },
    {
      id: 2,
      name: "Email",
      type: "email",
      placeholder: "Enter email",
      register: "email",
    },
    {
      id: 3,
      name: "Password",
      type: "password",
      placeholder: "Enter password",
      register: "password",
    },
    {
      id: 4,
      name: "Confirm Password",
      type: "password",
      placeholder: "Confirm password",
      register: "confirmPassword",
    },
  ];

  const {
    register: reg,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSuccess } = useSelector((state) => state.auth);

  const onSubmit = (data, e) => {
    dispatch(
      register({
        name: data.username,
        email: data.email,
        password: data.password,
      })
    );

    e.target.reset();
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      dispatch(reset());
    }
  }, [isSuccess, navigate, dispatch]);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up to your account
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4} as="form" onSubmit={handleSubmit(onSubmit)}>
            {inputs.map((input) => (
              <FormControl
                key={input.id}
                isInvalid={errors?.[input.register]?.message.length > 0}
              >
                <FormLabel>{input.name}</FormLabel>
                <Input
                  /* value={formData[input.name]} */
                  {...reg(input.register)}
                  placeholder={input.placeholder}
                  type={input.type}
                />

                <FormErrorMessage>
                  {errors?.[input.register]?.message}
                </FormErrorMessage>
              </FormControl>
            ))}

            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
              >
                Sign up
              </Button>
            </Stack>

            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link color={"blue.400"} as={routerLink} to="/signin">
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Signup;
