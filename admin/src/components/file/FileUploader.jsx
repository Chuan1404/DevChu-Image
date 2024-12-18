import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FileProcess from "./FileProcess";
import { v4 as uuidv4 } from "uuid";
import loading from "../../assets/images/loading2.svg";
import { API } from "../../assets/js/constants";
import { callWithToken } from "../../utils/fetchData";
import fileService from "../../services/fileService";

const FileUploader = ({ width = "100%" }) => {
  const [files, setFiles] = useState([]);
  const [stack, setStack] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // add file need to load
  const handleChange = (e) => {
    if (e.target.files?.length > 0) {
      let currentFiles = [...files];
      [...e.target.files].forEach((file) => {
        currentFiles.unshift({
          id: uuidv4(),
          file,
        });
      });
      setFiles(currentFiles);
      setIsLoading(true);
    }
  };

  // delete handled file
  const handleDelete = (file) => {
    setStack((prestate) => prestate.filter((item) => item.id !== file.id));
  };

  // handle when input file changes
  useEffect(() => {
    let fileHandle = [];
    files.forEach(async function (item) {
      let formData = new FormData();
      formData.append("file", item.file);
      let result = await fileService.checkFiles(formData);
      fileHandle.unshift({ ...item, result });

      // add handled file to stack
      if (stack.findIndex((loaded) => loaded.id === item.id) < 0) {
        setStack([...fileHandle, ...stack]);
      }
    });
  }, [files]);

  useEffect(() => {
    if (files.length != 0) {
      setFiles([]);
      setIsLoading(false);
    }
  }, [stack]);

  return (
    <Box className="FileUploader">
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={2}
        color={"#7D8893"}
        bgcolor={"#F8F9F9"}
        border={"1px dashed rgba(43, 59, 74, 0.3)"}
        borderRadius={3}
        width={width}
        className="FileUploader__loader"
      >
        <Typography variant="body1">Hãy upload file của bạn</Typography>
        <Button variant="contained" component="label">
          <input type="file" hidden onChange={handleChange} multiple />
          Upload
        </Button>
      </Stack>
      <Box className="FileUploader__list">
        {isLoading && <img className="imgLoading" src={loading} />}
        {stack.map((item) => (
          <FileProcess
            key={item.id}
            handleDelete={() => handleDelete(item)}
            data={item}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FileUploader;
