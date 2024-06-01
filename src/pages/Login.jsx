import {
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const toast = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "test@gmail.com" && password === "Password") {
      localStorage.setItem("authenticated", "true");
      navigate("/");
      toast({
        title: "Login Successful",
        description: "We've logged in your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Incorrect password",
        description: "Sorry, please enter correct password.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Center height={"100vh"}>
      <Container
        maxW="xl"
        border="1px"
        borderRadius={10}
        borderColor="gray.200"
        px={10}
        py={10}
      >
        <Heading>
          <Center mb={3}>Login</Center>
          <form onSubmit={handleLogin}>
            <FormControl mb={6}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </FormControl>
            <FormControl mb={6}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </FormControl>
            <FormControl display={"grid"} mb={6}>
              <Button type="submit" colorScheme="blue">
                Login
              </Button>
            </FormControl>
          </form>
        </Heading>
      </Container>
    </Center>
  );
};

export default Login;
