import React, { useState } from "react"; import Box from "@mui/material/Box";
import Button from "@mui/material/Button";


interface PostData {
    title: string;
    body: string;
    file: File | null;
}

const FileUploadForm: React.FunctionComponent = () => {
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
        <div>

            <input  id="selectedFile" readOnly value={formValues.file?.name ?? "No File selected.."}/>

            <Button variant="contained" component="label" className="UploadButton">
                Upload File

                <input type="file" onChange={handleFileChange} hidden />

            </Button>

            <Box marginY={3}>
                <Button onClick={() => console.log("submit")}>Submit Post </Button>
            </Box>

        </div>
    );
};

export default FileUploadForm;