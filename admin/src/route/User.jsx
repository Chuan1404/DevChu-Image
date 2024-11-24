import {
  Autocomplete,
  Avatar,
  Button,
  Chip,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Authenticated, Table } from "../components";
import useQuery from "../hooks/useQuery";
import { userService } from "../services";
import { closeForm } from "../store/slices/pageSlice";
import { ErrorMessage } from "@hookform/error-message";
import { ACCOUNT_STATUS, ROLES } from "../assets/js/constants";

export default function User({ role }) {
  const { search } = useLocation();
  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Avatar",
        accessorKey: "avatar",
        Cell: ({ row }) => {
          return <Avatar src={row.original.avatar} />;
        },
      },
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Role",
        accessorKey: "role",
        Cell: ({ row }) => {
          return (
            <Stack spacing={1}>
              <Chip
                size="small"
                label={row.original.role.split("_")[1]}
                color={
                  row.original.role === "ROLE_CUSTOMER"
                    ? "success"
                    : row.original.role === "ROLE_EDITOR"
                    ? "info"
                    : "error"
                }
              />
            </Stack>
          );
        },
      },
      {
        header: "Created at",
        accessorKey: "createdAt",

        Cell: ({ row }) => {
          return row.original.createdAt;
        },
      },
      {
        header: "Account status",
        accessorKey: "accountStatus",
        Cell: ({ row }) => {
          let status = row.original.accountStatus;
          return (
            <Chip
              size="small"
              label={status}
              color={
                status === "VERIFIED"
                  ? "success"
                  : status === "BANNED"
                  ? "error"
                  : "default"
              }
            />
          );
        },
      },
    ],
    []
  );
  const {
    data: userData,
    fetching: isLoading,
    setData: setUserData,
  } = useQuery(() => userService.getUsers(search, role), [search, role]);

  const handleDelete = async (id) => {
    const res = await userService.deleteUser(id);
    if (!res.error) {
      let filterData = userData.data.filter((item) => item.id != id);
      setUserData({ ...userData, data: filterData });
    } else {
      alert(res.error);
    }
  };

  const handleEdit = (id, updateRole) => {
    const updatedData = userData.data.map((item) =>
      item.id === id ? { ...item, role: updateRole } : item
    );

    setUserData({
      ...userData,
      data: updatedData.filter((user) => user.role === role),
    });
  };

  return (
    <Authenticated>
      <main id="user_page">
        <Typography textAlign={"center"} variant="h3">
          Account list
        </Typography>
        <Divider sx={{ marginTop: 2, marginBottom: 4 }} />
        <Table
          columns={columns}
          data={userData?.data || []}
          isLoading={isLoading}
          FormEdit={FormEdit}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </main>
    </Authenticated>
  );
}

function FormEdit({ defaultValues = {}, handleEdit = () => {} }) {
  const [avatar, setAvatar] = useState(defaultValues.avatar);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: defaultValues,
  });

  const handleChangeAvatar = (e) => {
    let file = e.currentTarget.files[0];
    setValue("avatar", file);
    setAvatar(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    if (!data.role) return setError("role", ["Required"]);

    const formData = new FormData();
    typeof data.avatar !== "string" &&
      data.avatar != null &&
      formData.append("avatar", data.avatar);
    formData.append("name", data.name);
    formData.append("accountStatus", data.accountStatus);
    formData.append("role", data.role);

    const response = await userService.updateUser(data.id, formData);
    if (!response.error) {
      handleEdit(data.id, data.role);
      dispatch(closeForm());
    }
  };
  return (
    <Stack
      component={"form"}
      width={400}
      sx={{ background: "white" }}
      padding={3}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h4">Update account</Typography>
      <Button
        component="label"
        sx={{ margin: "auto", width: "fit-content", borderRadius: "50%" }}
      >
        <Avatar src={avatar} sx={{ width: 80, height: 80 }} />
        <input
          type="file"
          multiple={false}
          hidden
          {...register("avatar")}
          onChange={handleChangeAvatar}
        />
      </Button>
      <TextField
        size="small"
        defaultValue={getValues("name")}
        label={"name"}
        {...register("name", { required: "This is required." })}
        margin="normal"
      />
      <ErrorMessage
        errors={errors}
        name={"name"}
        render={({ message }) => (
          <Typography color="primary">{message}</Typography>
        )}
      />
      <Autocomplete
        disablePortal
        options={ACCOUNT_STATUS}
        defaultValue={getValues("accountStatus")}
        onKeyDown={(e) => {
          e.preventDefault();
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            margin="normal"
            label="accountStatus"
            {...register("accountStatus", { required: "This is required." })}
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name={"accountStatus"}
        render={({ message }) => (
          <Typography color="primary">{message}</Typography>
        )}
      />
      <Autocomplete
        disablePortal
        options={ROLES}
        defaultValue={getValues("role")}
        onKeyDown={(e) => {
          e.preventDefault();
        }}
        {...register("role")}
        onChange={(e, value) => {
          setValue("role", value);
        }}
        renderInput={(params) => (
          <TextField {...params} size="small" margin="normal" label="role" />
        )}
        renderTags={(tagValues) => {
          return tagValues.map((option, index) => {
            return (
              <Chip
                key={index}
                sx={{ marginY: 1, marginRight: 0.5 }}
                label={option}
                color={
                  option === "ROLE_CUSTOMER"
                    ? "success"
                    : option === "ROLE_EDITOR"
                    ? "info"
                    : "error"
                }
              />
            );
          });
        }}
      />
      <ErrorMessage
        errors={errors}
        name={"role"}
        render={({ message }) => (
          <Typography color="primary">{errors.role?.[0]}</Typography>
        )}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Stack>
  );
}
