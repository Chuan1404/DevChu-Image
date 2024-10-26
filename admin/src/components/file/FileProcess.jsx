import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import notSupport from "../../assets/images/errors/not-support.gif";
import loading from "../../assets/images/loading2.svg";
import { API } from "../../assets/js/constants";
import { openAlert } from "../../store/slices/pageSlice";
import { callWithToken } from "../../utils/fetchData";
import InputTags from "../InputTags";
import fileService from "../../services/fileService";

const FileProcess = ({ handleDelete = () => {}, ...props }) => {
  let tagRef = useRef(null);
  let titleRef = useRef(null);
  let priceRef = useRef(0);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(props.data);
  const [tags, setTags] = useState({});

  // upload file to server
  const handleSubmit = async () => {
    if (
      titleRef.current.value == "" ||
      priceRef.current.value < 10000
      // || tagRef.current.value == ""
    )
      return;
    // let tags = {
    //   names: [...data.result.predict.names, ...data.result.colors.names],
    //   probs: [...data.result.predict.probs, ...data.result.colors.probs],
    // };

    // get final probs
    // let probs = tagRef.current.value.split(",").map((item) => {
    //   let index = tags.names.indexOf(item);
    //   return index >= 0 ? tags.probs[index] : 1;
    // });

    setIsLoading(true);
    let form = new FormData();
    form.append("file", data.file);
    form.append("title", titleRef.current.value);
    form.append("price", priceRef.current.value);
    // form.append("tags", tagRef.current.value);
    // form.append("probs", JSON.stringify(probs).slice(1, -1));

    let response = await fileService.uploadFiles(form);

    if (!response.error) {
      handleDelete({ ...data, message: "uploaded" });
      setIsLoading(false);
      dispatch(openAlert({ type: "success", message: "Upload thành công" }));
    } else {
      handleDelete({ ...data, message: "failed" });
      setIsLoading(false);
      dispatch(openAlert({ type: "error", message: "Upload thất bại" }));
    }
  };

  // const hexToRgb = (hex) => {
  //   var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  //   return result
  //     ? {
  //         r: parseInt(result[1], 16),
  //         g: parseInt(result[2], 16),
  //         b: parseInt(result[3], 16),
  //       }
  //     : null;
  // };

  // const getColor = async () => {
  //   if (!window.EyeDropper) {
  //     alert("Your browser does not support this feature");
  //   }

  //   // Creating a new instance of EyeDropper
  //   let cloneData = { ...data };
  //   const eyeDropper = new window.EyeDropper();
  //   let colorHex = await eyeDropper.open();
  //   let result = await utilsService.getColor(hexToRgb(colorHex.sRGBHex));
  //   let currentColors = !!data.result ? data.result.colors : [];
  //   currentColors.names = [...currentColors.names, result.cname];
  //   currentColors.probs = [...currentColors.probs, 1];
  //   currentColors.values = [...currentColors.values, result.cvalue];

  //   cloneData.result.colors = currentColors;
  //   setData(cloneData);
  // };

  // useEffect(() => {
  //   let { result } = data;
  //   let newTags = {};
  //   if (!!result.predict && !!result.colors) {
  //     result.predict.values = result.predict.names.map(() => "");
  //     newTags = {
  //       names: [...result.predict.names, ...result.colors.names],
  //       probs: [...result.predict.probs, ...result.colors.probs],
  //       colors: [...result.predict.values, ...result.colors.values],
  //     };
  //   }
  //   setTags({ ...newTags });
  // }, [data]);
  return (
    <Stack className="FileProcess" direction={"row"} spacing={2}>
      <Box className="file">
        {data?.file?.type.startsWith("image/") ? (
          <img
            id="preview"
            src={URL.createObjectURL(data.file)}
            style={{ borderRadius: 20 }}
            alt=""
          />
        ) : (
          <img src={notSupport} />
        )}
      </Box>

      <Box className="process" padding={2}>
        {data.result?.error ? (
          <Stack justifyContent={"space-between"}>
            <Typography color="primary" variant="h6">
              {data.result.error}
            </Typography>
          </Stack>
        ) : isLoading ? (
          <img src={loading} className="imgLoading" alt="" />
        ) : (
          <Stack justifyContent={"flex-start"} flexGrow={1}>
            <Typography variant="h6" marginBottom={2}>
              Chia sẻ với mọi người
            </Typography>
            <TextField
              inputRef={titleRef}
              label="Tiêu đề"
              size="small"
              sx={{ marginBottom: 4, width: 300 }}
            />

            <TextField
              inputRef={priceRef}
              type="number"
              label="Giá (Tối thiểu 10.000 VNĐ)"
              size="small"
              sx={{ marginBottom: 4, width: 300 }}
            />

            {/* <InputTags
              ref={tagRef}
              defaultValue={tags?.names}
              colors={tags?.colors}
              data={data}
              setData={setData}
            /> */}

            <Stack
              direction={"row"}
              spacing={2}
              marginTop={"auto"}
              marginLeft={"auto"}
            >
              <Button variant="text" color="secondary" onClick={handleDelete}>
                Xóa
              </Button>
              {/* <Button variant="text" color="secondary" onClick={getColor}>
                Lấy màu từ hình ảnh
              </Button> */}
              <Button variant="contained" onClick={handleSubmit}>
                Xác nhận
              </Button>
            </Stack>
          </Stack>
        )}
      </Box>
    </Stack>
  );
};

export default FileProcess;
