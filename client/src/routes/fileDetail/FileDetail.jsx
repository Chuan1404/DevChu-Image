import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import ImageZoom from "react-image-zooom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import loading from "../../assets/images/loading2.svg";
import { CommentBox } from "../../components";
import useQuery from "../../hooks/useQuery";
import { fileService } from "../../services";
import { addFile } from "../../store/slices/cartSlice";
import { openAlert, openAuth } from "../../store/slices/pageSlice";

export default function FileDetail() {
  const dispatch = useDispatch();
  const { isLogin, user } = useSelector((store) => store.auth);
  const { id } = useParams();
  const { data: file, fetching: isLoading } = useQuery(
    () => fileService.getFile(id),
    [id]
  );

  const addProductToCart = () => {
    if (isLogin) {
      dispatch(addFile({ userId: user.id, file: file.data }));
      dispatch(
        openAlert({ type: "success", message: "Add product into cart successfully" })
      );
    } else {
      dispatch(openAuth());
    }
  };

  const handleViewComment = () => {
    dispatch(openAuth());
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  console.log(file?.data);
  return (
    <main id="filepage">
      <Container sx={{ pt: 7 }}>
        {file?.data?.id ? (
          <FormControl fullWidth>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Stack
                  sx={{ height: "auto" }}
                  marginBottom={2}
                  justifyContent={"center"}
                  alignContent={"center"}
                  spacing={2}
                >
                  {isLoading && (
                    <img
                      src={loading}
                      style={{ height: 40, userSelect: "none" }}
                    />
                  )}
                  {!isLoading && (
                    <ImageZoom src={file?.data?.high} alt="" zoom="200" />
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography align="center" variant="h6">
                  {file?.data?.title}
                </Typography>

                <Box padding={2}>
                  {/* <Stack direction={"row"} spacing={2}> */}
                  {/* <Button fullWidth startIcon={<FavoriteBorder />}>
                    32
                  </Button>
                  <Button fullWidth>
                    <Share />
                  </Button> */}
                  {/* </Stack> */}

                  <Divider sx={{ my: 2 }} />

                  {/* table info */}
                  <TableContainer sx={{ my: 2 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <Typography variant="h6" component={"span"}>
                              Attribute
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h6" component={"span"}>
                              Value
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <Typography>Price</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body1">
                              {file?.data?.price?.toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Typography>Resolution</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body1">
                              {file?.data?.width} x {file?.data?.height}
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Typography>File type</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body1">
                              {file?.data?.fileType}
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Typography>Size</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body1">
                              {Math.round(
                                (file?.data?.size / 8 / Math.pow(2, 20)) * 100
                              ) / 100}{" "}
                              MB
                            </Typography>
                          </TableCell>
                        </TableRow>

                        {/* <TableRow>
                        <TableCell>
                          <Typography>Chủ sở hữu</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1">
                            <Stack direction={"row"} spacing={2}>
                              <Avatar src={file.user?.avatar} />
                              {file.user?.name}
                            </Stack>
                          </Typography>
                        </TableCell>
                      </TableRow> */}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* end table info */}

                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<AddShoppingCartIcon />}
                    onClick={addProductToCart}
                  >
                    Add to cart
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Stack>
                  {isLogin ? (
                    <CommentBox fileId={id} user={user} />
                  ) : (
                    <Button
                      onClick={handleViewComment}
                      size="small"
                      sx={{ width: "fit-content", alignSelf: "center" }}
                    >
                      <Typography>Login to view comment</Typography>
                    </Button>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </FormControl>
        ) : (
          <Typography>Không tìm thấy sản phẩm</Typography>
        )}
      </Container>
    </main>
  );
}
