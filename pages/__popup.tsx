import { useState } from "react";
import FormContainer from "./__components/form_container";
import Input from "./__components/input";
import Button from "./__components/button";
import { set } from "cypress/types/lodash";
import { connectAPI } from "./api/services";
import { useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

type PopupProps = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
};

type UploadObject = {
  title: string;
  subtitle: string;
  composer: string;
  file: File | null;
  fileUrl?: string;
};
export default function Popup({ opened, setOpened }: PopupProps) {
  const [promptMessage, setPromptMessage] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptType, setPromptType] = useState<"success" | "error" | "warning">(
    "success"
  );
  const [upload, setUpload] = useState<UploadObject>({
    title: "",
    subtitle: "",
    composer: "",
    file: null,
    fileUrl: "",
  });
  const [uploading, setUploading] = useState(false);
  const handleChange = (field: string) => (e: any) => {
    setShowPrompt(false);
    setUpload({
      ...upload,
      [field]: e.target.value,
    });
  };

  const validateUploade = () => {
    if (!upload.title) {
      setPromptMessage("Title is required");
      setShowPrompt(true);
      setPromptType("error");
      return false;
    }
    if (!upload.composer) {
      setPromptMessage("Composer is required");
      setShowPrompt(true);
      setPromptType("error");
      return false;
    }
    if (!upload.file) {
      setPromptMessage("File is required");
      setShowPrompt(true);
      setPromptType("error");
      return false;
    }
    return true;
  };

  const { data } = useSession();
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
          value={upload.title}
          setValue={handleChange("title")}
          autoFocus
          required
          title="Title"
          type="text"
          placeholder="The Lord is My Shepherd"
        />
        <Input
          value={upload.subtitle}
          setValue={handleChange("subtitle")}
          title="Subtitle"
          type="text"
          placeholder="Psalm 23"
        />
        <Input
          setValue={handleChange("composer")}
          value={upload.composer}
          title="Composer"
          required
          type="text"
          placeholder="James Varrick Armah"
        />

        <div className="uploader-btn-wrapper">
          <button
            onClick={() => {
              document.getElementById("uploader")?.click();
            }}
            className="uploader-btn"
          >
            Add Sheet
          </button>
          <span className="uploader-text">
            {upload.file ? upload.file.name : "No file selected"}
          </span>
        </div>
        <input
          id="uploader"
          onChange={(e) => {
            if (e.target.files) {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.readAsDataURL(file as Blob);
              reader.onload = () => {
                const base64 = reader.result;
                setUpload({
                  ...upload,
                  fileUrl: base64 as string,
                  file: file,
                });
              };
            }
          }}
          className={"uploader"}
          type="file"
          accept="image/*,.pdf"
        />
        <Button
          onClick={async () => {
            setUploading(true);
            setShowPrompt(false);
            if (validateUploade()) {
              // Convert file to base64

              try {
                let result = await connectAPI(
                  "/add_sheet",
                  "POST",
                  {
                    title: upload.title,
                    subtitle: upload.subtitle,
                    composer: upload.composer,
                    uploaded_by: data?.user?.name,
                    time_signature: "",
                    key_signature: "",
                    pdf: upload.fileUrl,
                  },
                  data?.user?.access_token
                );

                setUploading(false);
                setPromptMessage("Sheet music uploaded successfully");
                setShowPrompt(true);
                setPromptType("success");

                setOpened(false);
              } catch (e: any) {
                console.log(e);
                setUploading(false);
                setPromptMessage(e.message);
                setShowPrompt(true);
                setPromptType("error");
              }
            }
          }}
          style={{ margin: 0, marginTop: "1rem", width: "50%" }}
        >
          {" "}
          Upload{" "}
        </Button>
      </FormContainer>
    </div>
  ) : null;
}
