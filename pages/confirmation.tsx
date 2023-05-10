import FormContainer from "./__components/form_container";
import Input from "./__components/input";
import styles from "../styles/Commons.module.css";
import Button from "./__components/button";
import { useState } from "react";
import { connectAPI } from "./api/services";
import { Router, useRouter } from "next/router";
import { headInfo } from ".";

export default function Confirmation() {
  const [code, setCode] = useState("");
  const [promptMessage, setPromptMessage] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptType, setPromptType] = useState<"success" | "error" | "warning">(
    "success"
  );

  const router = useRouter();
  const handleVerify = async () => {
    const { email } = router.query;
    const res = await connectAPI("/verify_confirm_code", "POST", {
      code,
      email,
    });

    if (res.status === 200) {
      router.push("/login");
    } else {
      setShowPrompt(true);
      setPromptMessage(res.message);
      setPromptType("error");
    }
  };
  return (
    <>
      {headInfo({ subinfo: "Enter your verification code" })}
      <main className={styles.formWrapper}>
        <FormContainer
          onSubmit={handleVerify}
          noSubtitle={true}
          title={"Enter your verification code"}
          showPrompt={showPrompt}
          setShowPrompt={setShowPrompt}
          promptType={promptType}
          promptMessage={promptMessage}
        >
          <Input
            value={code}
            setValue={(e) => setCode(e.target.value)}
            noTitle
            title="Verify your email"
            required
            type="number"
            placeholder="Code"
          />
          <Button onClick={handleVerify}>Verify</Button>
        </FormContainer>
      </main>
    </>
  );
}
