import React, { useState } from "react"; import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

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

    // Handlers for the input
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            title: event.target.value,
        }));
    };

    const handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            body: event.target.value,
        }));
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            file: event.target.files ? event.target.files[0] : null,
        }));
    };
    /*       const handleSubmit = async () => {
             const formData = new FormData();
             formData.append("title", formValues.title);
             formData.append("body", formValues.body);
             formValues.image && formData.append("image", formValues.image);

             const response = await axios.post(<YOUR-API-ENDPOINT>, formData, {
                 headers: {
                 "Content-Type": "multipart/form-data",
             },
             });

                 return response.data

                 };*/


    return (
        <Box
            display="flex"
            height="100%"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Box marginY={2}>
                <TextField
                    onChange={handleTitleChange}
                    value={formValues.title}
                    label="Post Title"
                    name="title"
                />
            </Box>
            <Box marginY={2}>
                <TextField
                    onChange={handleBodyChange}
                    multiline
                    minRows={5}
                    label="Post Body"
                    name="body"
                />
            </Box>

            <Button variant="contained" component="label">
                {formValues.file?.name ?? "Upload File"}
                <input type="file" onChange={handleImageChange} hidden />
            </Button>

            <Box marginY={3}>
                <Button onClick={() => console.log("submit")}>Submit Post </Button>
            </Box>
        </Box>
    );
};

export default FileUploadForm;