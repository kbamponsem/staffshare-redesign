import FormContainer from "./__components/form_container";
import styles from "../styles/Commons.module.css";
import Button, { Already, AlternativeLogin } from "./__components/button";
import Input from "./__components/input";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [username, setUsername] = useState("");

  const handleRegister = async () => {
    console.log(email, password, retypePassword, username);
  };

  return (
    <>
      <main className={styles.formWrapper}>
        <FormContainer
          onSubmit={handleRegister}
          title="Create Your StaffShare Account"
        >
          <Input
            value={username}
            setValue={(e) => setUsername(e.target.value)}
            title="Username"
            required={true}
            type="email"
            placeholder="Username"
          />
          <Input
            value={email}
            setValue={(e) => setEmail(e.target.value)}
            title="Email"
            required={true}
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
          <Input
            value={retypePassword}
            setValue={(e) => setRetypePassword(e.target.value)}
            title="Retype Password"
            required={true}
            type="password"
            placeholder="Retype Password"
          />

          <Button onClick={handleRegister}>Register</Button>

          <AlternativeLogin />
          <Already to="/login" linkText="Login now">
            Already have an account?
          </Already>
        </FormContainer>
      </main>
    </>
  );
}
