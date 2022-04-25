import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface PostData {
  title: string;
  body: string;
  file: File | null;
}

export default function BatchTransfer() {
  const [formValues, setFormValues] = useState<PostData>({
    title: "",
    body: "",
    file: null,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      file: event.target.files ? event.target.files[0] : null,
    }));
  };

  return (
    <div className="Uploader">
      {
        <input
          id="selectedFile"
          readOnly
          value={formValues.file?.name ?? "No File selected.."}
        />
      }

      <Button variant="contained" component="label" size="small">
        Upload File
        <input type="file" onChange={handleFileChange} hidden />
      </Button>

      <Box marginY={3}>
        <Button variant="contained" onClick={() => console.log("submit")}>
          Submit Post{" "}
        </Button>
      </Box>
    </div>
  );
}
