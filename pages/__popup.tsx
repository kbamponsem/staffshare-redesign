import { useState } from "react";
import FormContainer from "./__components/form_container";
import Input from "./__components/input";
import Button from "./__components/button";

type PopupProps = {
  title: string;
  opened: boolean;
  setOpened: (opened: boolean) => void;
};
export default function Popup({ title, opened, setOpened }: PopupProps) {
  const [promptMessage, setPromptMessage] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptType, setPromptType] = useState<"success" | "error" | "warning">(
    "success"
  );

  return opened ? (
    <div
      onClick={(e: any) => {
        if (e.target !== e.currentTarget) return;
        setOpened(false);
      }}
      onKeyDown={(e: any) => {
        if (e.key === "Escape") setOpened(false);
      }}
      className="popup"
    >
      <FormContainer
        promptMessage={promptMessage}
        showPrompt={showPrompt}
        promptType={promptType}
        setShowPrompt={setShowPrompt}
        title="Upload Sheet Music"
      >
        <Input
          autoFocus
          required
          title="Title"
          type="text"
          placeholder="The Lord is My Shepherd"
        />
        <Input title="Subtitle" type="text" placeholder="Psalm 23" />
        <Input
          title="Composer"
          required
          type="text"
          placeholder="James Varrick Armah"
        />
        <Input
          required
          title="Uploaded by"
          type="text"
          placeholder="James Varrick Armah"
        />
        <Button style={{ margin: 0, marginTop: "0.6rem" }}> Upload </Button>
      </FormContainer>
    </div>
  ) : null;
}
