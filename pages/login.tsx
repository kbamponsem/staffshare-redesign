import Link from "next/link";
import styles from "../styles/Commons.module.css";
import Button, { Already, AlternativeLogin } from "./__components/button";
import FormContainer from "./__components/form_container";
import Input from "./__components/input";
import { useState } from "react";
import { connectAPI, setSession } from "./__shared/services";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { headInfo } from ".";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [promptMessage, setPromptMessage] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptType, setPromptType] = useState<"success" | "error" | "warning">(
    "success"
  );

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLoginRouting = (data: {
    email: string;
    username: string;
    id: string;
  }) => {
    console.log("Received data", data);
    setSession({
      type: "credentials",
      user: {
        email: data.email,
        username: data.username,
        id: data.id,
      },
    });

    router.push("/dashboard");
  };
  const handleLogin = async () => {
    setShowPrompt(false);
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      // Set session token
      router.push("/dashboard");
    }
    if (res?.error) {
      setLoading(false);
      setPromptMessage("Invalid email or password");
      setShowPrompt(true);
      setPromptType("error");
    }
  };
  return (
    <>
      <title>Login to your StaffShare account</title>
      <main className={styles.formWrapper}>
        <FormContainer
          promptMessage={promptMessage}
          showPrompt={showPrompt}
          promptType={promptType}
          setShowPrompt={setShowPrompt}
          onSubmit={handleLogin}
          title="Log In to Your StaffShare Account"
        >
          <Input
            value={email}
            setValue={(e) => setEmail(e.target.value)}
            title="Email/Username"
            required
            type="email"
            placeholder="Enter your email or username"
            wrapperStyle={inputStyle}
          />
          <Input
            value={password}
            setValue={(e) => setPassword(e.target.value)}
            title="Password"
            required={true}
            type="password"
            placeholder="Enter your password"
            wrapperStyle={inputStyle}
          />

          <Button loading={loading} onClick={handleLogin}>
            Login
          </Button>

          <AlternativeLogin />
          <Already to="/register" linkText="Register now">
            Don't have an account yet?
          </Already>
        </FormContainer>
      </main>
    </>
  );
}
const inputStyle = {
  marginBottom: "1.2rem",
};
