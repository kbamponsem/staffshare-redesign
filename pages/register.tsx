import FormContainer from "./__components/form_container";
import styles from "../styles/Commons.module.css";
import Button, { Already, AlternativeLogin } from "./__components/button";
import Input from "./__components/input";
import Link from "next/link";
import { useState } from "react";
import { connectAPI } from "./__shared/services";
import { useRouter } from "next/router";
import { headInfo } from ".";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [username, setUsername] = useState("");

  const [promptMessage, setPromptMessage] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptType, setPromptType] = useState<"success" | "error" | "warning">(
    "success"
  );
  const router = useRouter();

  const handleRegister = async () => {
    // Check if password and retype password are the same
    if (password !== retypePassword) {
      setShowPrompt(true);
      setPromptMessage("Password and retype password are not the same");
      setPromptType("error");
      return;
    }

    // Check if email is valid
    const emailRegex = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
    );

    if (!emailRegex.test(email)) {
      setShowPrompt(true);
      setPromptMessage("Email is not valid");
      setPromptType("error");
      return;
    }

    setShowPrompt(false);
    const res = await connectAPI("/register", "POST", {
      email,
      password,
      username,
    });

    console.log("Results", res);
    if (res.status === 200) {
      // Redirect to confirmation page
      router.push(`/confirmation?email=${email}`);
    } else {
      setShowPrompt(true);
      setPromptMessage(res.message);
      setPromptType("error");
    }
  };

  return (
    <>
      {headInfo({ subinfo: "Register your StaffShare account" })}
      <main className={styles.formWrapper}>
        <FormContainer
          promptMessage={promptMessage}
          showPrompt={showPrompt}
          promptType={promptType}
          setShowPrompt={setShowPrompt}
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
