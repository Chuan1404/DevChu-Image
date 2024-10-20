import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Banner, MediaList, Tags } from "../components";
import { fileService } from "../services";
import queryLocation from "../utils/queryLocation";
import { useDispatch, useSelector } from "react-redux";
import { setOptions } from "../store/slices/searchSlice"

export default function Home() {
  const dispatcher = useDispatch()
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fromPriceRef = useRef(null);
  const toPriceRef = useRef(null);
  const options = useSelector(store => store.search.options)

  const handleChange = (payload) => {
    dispatcher(setOptions({...payload}))
  }

  // handle get search result
  useEffect(() => {
    (async () => {
      setIsLoading(true);

      let query = `?${queryLocation.toString(options)}`;
      let res = await fileService.getFiles(query);
      if (!res.error)
        setData(res);
      setIsLoading(false);
    })();
  }, [options]);

  const handlePriceFilter = () => {
    let fromPrice = fromPriceRef.current.value;
    let toPrice = toPriceRef.current.value;
    if (fromPrice != "" && toPrice != "" && fromPrice > toPrice)
      [fromPrice, toPrice] = [toPrice, fromPrice];

    fromPriceRef.current.value = fromPrice;
    toPriceRef.current.value = toPrice;
    handleChange({
      ...options,
      fromPrice,
      toPrice,
    });
  };

  const handleTypeFilter = (value, isCheck) => {
    isCheck
      ? handleChange({ ...options, type: [...options.type, value] })
      : handleChange({
          ...options,
          type: options.type.filter((item) => item != value),
        });
  };

  return (
    <main id="home_page">
      <Banner class="banner" />
      <Box px={2}>
        <Grid container spacing={2}>
          <Grid item sm={12} textAlign={"center"} justifyContent={"center"}>
            <Stack
              sx={{
                mt: 2,
                py: 1,
                borderRadius: "1rem",
                backgroundColor: "#fff",
              }}
            >
              <Typography variant="h4" mb={2} color={"primary"}>
                Chủ đề phổ biến
              </Typography>
              <Tags options={options} setOptions={handleChange} />
            </Stack>
          </Grid>

          {/* <Grid item md={2} xs={12} > */}
          <Grid item xs={12} lg={2}>
            <Stack direction={{xs: "row", lg: "column"}} justifyContent={"space-between"}>
              <Box bgcolor={"#fff"} p={2} borderRadius={"1rem"} width={'100%'} mr={{xs: 2, lg: 0}}>
                <Typography variant="h6" mb={2}>
                  Giá
                </Typography>
                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                  <TextField
                    type="number"
                    size="small"
                    placeholder="VNĐ"
                    inputRef={fromPriceRef}
                  />
                  <Typography>-</Typography>
                  <TextField
                    type="number"
                    size="small"
                    placeholder="VNĐ"
                    inputRef={toPriceRef}
                  />
                </Stack>
                <Button sx={{ marginTop: 2 }} onClick={handlePriceFilter}>
                  Xác nhận
                </Button>
              </Box>

              <Divider sx={{ marginY: 2 }} />

              <Box bgcolor={"#fff"} p={2} borderRadius={"1rem"} width={'100%'}>
                <Typography variant="h6" mb={2}>
                  Loại file
                </Typography>
                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          onChange={(e) =>
                            handleTypeFilter("PNG", e.target.checked)
                          }
                        />
                      }
                      label="PNG"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          onChange={(e) =>
                            handleTypeFilter("JPEG", e.target.checked)
                          }
                        />
                      }
                      label="JPEG"
                    />
                  </FormGroup>
                </Stack>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} lg={10} >
            <MediaList
              data={data}
              options={options}
              setOptions={handleChange}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
