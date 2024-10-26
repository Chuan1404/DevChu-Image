import { Close } from "@mui/icons-material";
import { Chip, Stack, TextField, Typography } from "@mui/material";
import React, { forwardRef, useEffect, useRef, useState } from "react";

const InputTags = forwardRef(
  (
    { defaultValue = [], colors = [], data = {}, setData = () => {}, ...props },
    inputRef
  ) => {
    const [tags, setTags] = useState([...defaultValue]);
    const tagRef = useRef(null);

    // add tag
    const handleOnSubmit = (e) => {
      e.preventDefault();
      if (
        tagRef.current.value.trim() == "" ||
        tags.includes(tagRef.current.value.trim())
      ) {
        tagRef.current.value = "";
        return;
      }
      setTags([...tags, tagRef.current.value]);

      let cloneData = { ...data };
      let currentPredict = !!data.result ? data.result.predict : [];
      currentPredict.names = [...currentPredict.names, tagRef.current.value];
      currentPredict.probs = [...currentPredict.probs, 1];
      currentPredict.values = [...currentPredict.values, ""];

      cloneData.result.predict = currentPredict;
      setData(cloneData);

      tagRef.current.value = "";
    };

    // delete tag
    const handleDelete = (value) => {
      let itemIndex = -1;
      let cloneData = { ...data };
      let predict = !!data.result ? data.result.predict : {};
      let colors = !!data.result ? data.result.colors : {};
      let newtags = tags.filter((val, index) => {
        let condition = val.replace("_", " ") == value;
        if (condition) itemIndex = index;
        return !condition
      });

      if (!!predict && itemIndex < predict.names.length) {
        predict = {
          names: predict.names.filter((item, index) => index != itemIndex),
          probs: predict.probs.filter((item, index) => index != itemIndex),
          values: predict.values.filter((item, index) => index != itemIndex),
        };
      } else {
        itemIndex = itemIndex - predict.names.length;
        colors = {
          names: colors.names.filter((item, index) => index != itemIndex),
          probs: colors.probs.filter((item, index) => index != itemIndex),
          values: colors.values.filter((item, index) => index != itemIndex),
        };
      }
      cloneData.result.predict = predict;
      cloneData.result.colors = colors;
      setTags(newtags);
      setData({ ...cloneData });
    };

    useEffect(() => {
      setTags([...defaultValue]);
    }, [defaultValue]);

    return (
      <Stack flexGrow={1} width={"100%"} bgcolor={"white"}>
        <form onSubmit={handleOnSubmit}>
          {tags?.map((tag, index) => (
            <Tag
              handleDelete={handleDelete}
              bgColor={colors[index]}
              data={tag.replace("_", " ")}
              key={index}
            />
          ))}
          <TextField
            inputRef={tagRef}
            variant="standard"
            size="small"
            margin="none"
            placeholder="Enter tags here"
          />
        </form>
        <input
          {...props}
          ref={inputRef}
          readOnly
          value={tags.join(",")}
          hidden
          type="text"
        />
      </Stack>
    );
  }
);

function Tag({ data, handleDelete, bgColor }) {
  return (
    <Chip
      sx={{ margin: "0 0.5rem 0.5rem 0", backgroundColor: bgColor }}
      label={
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <Typography style={{ color: "white", mixBlendMode: "difference" }}>
            {data}
          </Typography>
          <Close
            style={{
              cursor: "pointer",
              fontSize: "1rem",
              color: "white",
              mixBlendMode: "difference",
            }}
            onClick={() => {
              handleDelete(data);
            }}
          />
        </Stack>
      }
    />
  );
}
export default InputTags;
