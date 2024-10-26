import { ErrorMessage } from "@hookform/error-message";
import {
  Button,
  Chip,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Authenticated, Table } from "../../components";
import useQuery from "../../hooks/useQuery";
import { fileService } from "../../services";
import { closeForm, openAlert } from "../../store/slices/pageSlice";

const FileList = () => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const {
    data: fileData,
    fetching: isLoading,
    setData: setFileData,
  } = useQuery(() => fileService.getFiles(search), [search]);

  const { user } = useSelector((store) => store.auth);
  const columns = useMemo(
    () => [
      {
        header: "Display",
        accessorKey: "display",
        Cell: ({ row }) => {
          if (!row) return "";
          return <img src={row.original.display} width={200} alt="" />;
        },
      },
      {
        header: "Tiêu đề",
        accessorKey: "title",
        Cell: ({ row }) => (
          <Typography variant="h6" fontSize={15}>
            {row.original.title}
          </Typography>
        ),
      },
      {
        header: "Giá",
        accessorKey: "price",
      },
      // {
      //   header: "Người chỉnh sửa",
      //   Cell: ({ row }) => {
      //     if (row.original.user != null) {
      //       let { avatar, id, name } = row.original.user;
      //       return (
      //         <Stack direction={"row"} alignItems={"center"} spacing={1}>
      //           <Avatar src={avatar} />
      //           <Typography variant="h6">{name}</Typography>
      //         </Stack>
      //       );
      //     } else {
      //       return <Typography>Đã xóa</Typography>;
      //     }
      //   },
      // },
      {
        header: "Trạng thái",
        accessorKey: "status",
        Cell: ({ row }) => {
          let status = row.original.status;
          return (
            <Chip
              size="small"
              label={status === "ACTIVE" ? "Sẵn sàng" : "Chưa sẵn sàng"}
              color={status === "ACTIVE" ? "success" : "error"}
            />
          );
        },
      },
      {
        header: "",
        accessorKey: "id",
        Cell: () => <div style={{ display: "none" }}></div>,
      },
    ],
    []
  );

  const handleEdit = (editedData) => {
    let newData = fileData.data.map((item) =>
      item.id === editedData.id ? editedData : item
    );
    setFileData({
      ...fileData,
      data: [...newData],
    });
  };

  const handleDelete = async (id) => {
    let res = await fileService.deleteFile(id);
    if (!res.error) {
      let newData = fileData.data.filter((item) => item.id !== id);
      setFileData({ ...fileData, data: newData });
      dispatch(openAlert({ type: "success", message: "Xóa thành công" }));
    } else {
      dispatch(
        openAlert({
          type: "error",
          message: "Xóa không thành công do có khách hàng đã thanh toán",
        })
      );
    }
  };

  return (
    <Authenticated>
      <main id="file_page">
        <Typography textAlign={"center"} variant="h3">
          Danh sách File
        </Typography>
        <Divider sx={{ marginTop: 2, marginBottom: 4 }} />
        <Table
          columns={columns}
          data={fileData.data}
          isLoading={isLoading}
          FormEdit={FormEdit}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          disableDelete={!user.role === "ROLE_ADMIN"}
        />
      </main>
    </Authenticated>
  );
};

function FormEdit({ defaultValues = {}, handleEdit = () => {} }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(defaultValues.status === "ACTIVE");

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  const onSubmit = async (data) => {
    let response = await fileService.updateFiles(data.id, data);
    if (!response.error) {
      handleEdit(data);
    }
    dispatch(closeForm());
  };
  return (
    <Stack width={400} sx={{ background: "white" }} padding={3}>
      <Typography variant="h4">Chỉnh sửa file</Typography>
      <TextField
        size="small"
        defaultValue={getValues("title")}
        label={"Tiêu đề"}
        {...register("title", { required: "Không được để trống" })}
        margin="normal"
      />
      <ErrorMessage
        errors={errors}
        name={"title"}
        render={({ message }) => (
          <Typography color="primary">{message}</Typography>
        )}
      />

      <TextField
        size="small"
        defaultValue={getValues("price")}
        label={"Giá (VNĐ)"}
        type="number"
        {...register("price", {
          min: { value: 10000, message: "Tối thiểu 10.000 VNĐ" },
        })}
        margin="normal"
      />
      <ErrorMessage
        errors={errors}
        name={"price"}
        render={({ message }) => (
          <Typography color="primary">{message}</Typography>
        )}
      />
      <FormControlLabel
        control={
          <Switch
            // {...register("status")}
            value={getValues("status") === "ACTIVE"}
            checked={status}
            onChange={(e, value) => {
              setStatus(value);
              setValue("status", value ? "ACTIVE" : "INACTIVE");
            }}
          />
        }
        label="Trạng thái"
      />

      {/* <InputTags
        defaultValue={getValues("tags")}
        {...register("tags")}
        ref={tagRef}
      /> */}
      <Button
        type="submit"
        variant="contained"
        sx={{ marginTop: 2 }}
        onClick={handleSubmit(onSubmit)}
      >
        Xác nhận
      </Button>
    </Stack>
  );
}

export default FileList;
