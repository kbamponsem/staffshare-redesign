import Link from "next/link";
import styles from "../styles/Commons.module.css";
import Button, { Already, AlternativeLogin } from "./__components/button";
import FormContainer from "./__components/form_container";
import Input from "./__components/input";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log(email, password);
  };
  return (
    <>
      <main className={styles.formWrapper}>
        <FormContainer
          onSubmit={handleLogin}
          title="Log In to Your StaffShare Account"
        >
          <Input
            value={email}
            setValue={(e) => setEmail(e.target.value)}
            title="Email/Username"
            required
            type="email"
            placeholder="Email"
          />
          <Input
            value={password}
            setValue={(e) => setPassword(e.target.value)}
            title="Password"
            required={true}
            type="password"
            placeholder="Password"
          />

          <Button onClick={handleLogin}>Login</Button>

          <AlternativeLogin />
          <Already to="/register" linkText="Register now">
            Don't have an account yet?
          </Already>
        </FormContainer>
      </main>
    </>
  );
}
