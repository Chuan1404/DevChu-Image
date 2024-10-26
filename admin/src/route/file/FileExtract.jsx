import { ErrorMessage } from "@hookform/error-message";
import { FilePresent } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import FileSaver from "file-saver";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "styled-components";
import loading from "../../assets/images/loading2.svg";
import { Authenticated } from "../../components";
import { fileService } from "../../services";

const FileExtract = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const handleChange = (e) => {
    if (e.target.files.length > 0) setFile(e.target.files[0]);
  };

  const formSubmit = async (data) => {
    let isSuccess = true;
    if (file == null) {
      setError("file", { message: "Không được để trống" });
      isSuccess = false;
    }

    if (isSuccess) {
      setIsLoading(true);
      let formData = new FormData();

      formData.append("file", file);
      const response = await fileService.extractFile(formData);
      if (response.byteLength > 0) {
        const blob = new Blob([response]);
        FileSaver.saveAs(blob, "extracted.png");
      } else {
        console.log("Error")
      }
      setFile(null)
      setIsLoading(false);
    }
  };
  return (
    <Authenticated>
      <main id="file_extract_page">
        <Typography textAlign={"center"} variant="h3">
          Chọn File để trích xuất
        </Typography>
        <Divider sx={{ marginTop: 2, marginBottom: 4 }} />

        <Box component={"form"} onSubmit={handleSubmit(formSubmit)}>
          <Grid container>
            <Grid item xs>
              <Stack
                width={"100%"}
                height={300}
                alignItems={"center"}
                justifyContent={"center"}
                borderRadius={20}
              >
                <Box
                  height={300}
                  width={300}
                  border={`1px solid ${theme?.palette.primary.main}`}
                  overflow={"hidden"}
                >
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      width: "100%",
                      height: "100%",
                      flexDirection: "column",
                    }}
                    className="f-center"
                    color="primary"
                  >
                    <input
                      type="file"
                      hidden
                      {...register("file")}
                      onChange={handleChange}
                    />
                    {file != null ? (
                      <img
                        src={URL.createObjectURL(file)}
                        style={{ width: "100%", objectFit: "contain" }}
                      />
                    ) : (
                      <>
                        <FilePresent sx={{ fontSize: "7rem !important" }} />
                        <Typography variant="h6" color={"white"}>
                          Upload File
                        </Typography>
                      </>
                    )}
                  </Button>
                </Box>
                <ErrorMessage
                  errors={errors}
                  name={"file"}
                  render={({ message }) => (
                    <Typography color="primary">{message}</Typography>
                  )}
                />
                {isLoading ? (
                  <Stack style={{marginTop: 10}} alignItems={"center"}>
                    <img src={loading} width={50} />
                  </Stack>
                ) : (
                  <Button style={{marginTop: 10, marginLeft: 'auto' }} variant="contained" type="submit">
                    Xác nhận
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </main>
    </Authenticated>
  );
};

export default FileExtract;
