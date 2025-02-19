import { useAuthStore } from "../../store/app.store";
import { Button, TextInput, Card, Text, Group } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, isAuthenticated } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleLogin = () => {
    setEmailError(null);
    setPasswordError(null);
    setLoginError(null);

    if (!email) {
      setEmailError("Email is required");
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
    }

    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    }

    if (!email || !password || emailError || passwordError) {
      return; // Stop if there are validation errors
    }

    if (email === "test@user.com" && password === "password") {
      login(btoa("test@user.com"));
      navigate("/launches"); // Redirect after login
    } else {
      setLoginError("Invalid email or password");
    }
  };

  return (
    <Card shadow="sm" padding="lg" style={{ maxWidth: 400, margin: 'auto' }}>
      <Text size="xl">Welcome Back</Text>
      <TextInput
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={emailError}
        mb="sm"
      />
      <TextInput
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={passwordError}
        mb="sm"
      />
      {loginError && <Text color="red" size="sm" mb="sm">{loginError}</Text>}
      <Button onClick={handleLogin} mt="sm" fullWidth>
        Login
      </Button>
    </Card>
  );
}
