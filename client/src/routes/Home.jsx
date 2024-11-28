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
import { useDispatch, useSelector } from "react-redux";
import { Banner, MediaList, Tags } from "../components";
import { fileService } from "../services";
import { setOptions } from "../store/slices/searchSlice";
import queryLocation from "../utils/queryLocation";

export default function Home() {
  const dispatcher = useDispatch();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const minRef = useRef(null);
  const maxRef = useRef(null);
  const options = useSelector((store) => store.search.options);

  const handleChange = (payload) => {
    dispatcher(setOptions({ ...payload }));
  };

  // handle get search result
  useEffect(() => {
    (async () => {
      setIsLoading(true);

      let query = `?${queryLocation.toString(options)}`;
      let res = await fileService.getFiles(query);
      if (!res.error) {
        setData(res.data);
      }
      setIsLoading(false);
    })();
  }, [options]);

  const handlePriceFilter = () => {
    let min = minRef.current.value;
    let max = maxRef.current.value;
    if (Number(min) > Number(max)) [min, max] = [max, min];

    minRef.current.value = min;
    maxRef.current.value = max;
    handleChange({
      ...options,
      min,
      max,
    });
  };

  const handleTypeFilter = (value, isCheck) => {
    const filteredType = isCheck
      ? [...options.type, value]
      : options.type.filter((item) => item != value);
    handleChange({ ...options, type: filteredType });
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
                Most popular
              </Typography>
              <Tags options={options} setOptions={handleChange} />
            </Stack>
          </Grid>

          {/* <Grid item md={2} xs={12} > */}
          <Grid item xs={12} lg={2}>
            <Stack
              direction={{ xs: "row", lg: "column" }}
              justifyContent={"space-between"}
            >
              <Box
                bgcolor={"#fff"}
                p={2}
                borderRadius={"1rem"}
                width={"100%"}
                mr={{ xs: 2, lg: 0 }}
              >
                <Typography variant="h6" mb={2}>
                  Price
                </Typography>
                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                  <TextField
                    type="number"
                    size="small"
                    placeholder="VNĐ"
                    inputRef={minRef}
                  />
                  <Typography>-</Typography>
                  <TextField
                    type="number"
                    size="small"
                    placeholder="VNĐ"
                    inputRef={maxRef}
                  />
                </Stack>
                <Button sx={{ marginTop: 2 }} onClick={handlePriceFilter}>
                  Search
                </Button>
              </Box>

              <Divider sx={{ marginY: 2 }} />

              <Box bgcolor={"#fff"} p={2} borderRadius={"1rem"} width={"100%"}>
                <Typography variant="h6" mb={2}>
                  File type
                </Typography>
                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          onChange={(e) =>
                            handleTypeFilter("png", e.target.checked)
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
                            handleTypeFilter("jpeg", e.target.checked)
                          }
                        />
                      }
                      label="JPEG"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          onChange={(e) =>
                            handleTypeFilter("jpg", e.target.checked)
                          }
                        />
                      }
                      label="JPG"
                    />
                  </FormGroup>
                </Stack>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} lg={10}>
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
