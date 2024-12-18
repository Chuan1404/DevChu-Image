import { ErrorMessage } from "@hookform/error-message";
import { People } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "styled-components";
import { Authenticated } from "../../components";
import { userService } from "../../services";
import loading from "../../assets/images/loading2.svg";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../assets/js/constants";

const EmployeeCreate = () => {
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm();

  const formItems = [
    {
      type: "text",
      label: "Employee name",
      ...register("name", { required: "Required" }),
    },
    {
      type: "email",
      label: "Email",
      ...register("email", { required: "Required" }),
    },
    {
      type: "password",
      label: "Input your password",
      ...register("password", { required: "Required" }),
    },
    {
      type: "password",
      label: "Confirm your password",
      ...register("confirm", { required: "Required" }),
    },
    {
      type: "file",
      label: "Avatar",
    },
    { type: "autocomplete", label: "Role" },
  ];
  const theme = useTheme();

  const handleChange = (e) => {
    if (e.target.files.length > 0) setAvatar(e.target.files[0]);
  };

  const formSubmit = async (data) => {
    let isSuccess = true;
    if (data.password != data.confirm) {
      setError("confirm", { message: "Confirm password fail" });
      isSuccess = false;
    }

    if (avatar == null) {
      setError("file", { message: "Required" });
      isSuccess = false;
    }

    if (!data.role) {
      setError("role", { message: "Account must have role" });
      isSuccess = false;
    }

    if (isSuccess) {
      setIsLoading(true);
      let formData = new FormData();

      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("role", data.role);
      formData.append("avatar", avatar);
      const response = await userService.addUser(formData);

      if (!response.error) {
        navigate("/");
      } else {
        setError("name", { message: response.error });
      }
      setIsLoading(false);
    }
  };
  return (
    <Authenticated>
      <main id="employee_create_page">
        <Box>
          <Typography variant="h3">Add account</Typography>
        </Box>
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
                  height={250}
                  width={250}
                  borderRadius={"50%"}
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
                    {avatar != null ? (
                      <img
                        src={URL.createObjectURL(avatar)}
                        style={{ borderRadius: "50%" }}
                      />
                    ) : (
                      <>
                        <People sx={{ fontSize: "7rem !important" }} />
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
              </Stack>
            </Grid>

            <Grid item xs={7} paddingX={4}>
              {formItems.map((item, index) => {
                if (
                  item.type == "text" ||
                  item.type == "password" ||
                  item.type == "email"
                )
                  return (
                    <>
                      <TextField
                        margin="normal"
                        key={index}
                        fullWidth
                        {...item}
                      />
                      <ErrorMessage
                        errors={errors}
                        name={item.name}
                        render={({ message }) => (
                          <Typography color="primary">{message}</Typography>
                        )}
                      />
                    </>
                  );
                if (item.type == "autocomplete")
                  return (
                    <>
                      <Autocomplete
                        key={index}
                        options={ROLES}
                        {...register("role")}
                        onChange={(e, value) => {
                          setValue("role", value);
                        }}
                        renderInput={(param) => (
                          <TextField
                            margin="normal"
                            {...param}
                            label={item.label}
                          />
                        )}
                      />
                      <ErrorMessage
                        errors={errors}
                        name={"role"}
                        render={({ message }) => (
                          <Typography color="primary">{message}</Typography>
                        )}
                      />
                    </>
                  );
              })}
              {isLoading ? (
                <Stack alignItems={"center"}>
                  <img src={loading} width={50} />
                </Stack>
              ) : (
                <Button fullWidth variant="contained" type="submit">
                  Submit
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </main>
    </Authenticated>
  );
};

export default EmployeeCreate;
