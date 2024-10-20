import { Box, Stack, Typography } from "@mui/material";
import myImage from "../assets/images/10.jpg";
import { Search } from "./";

export default function Banner({ image }) {
  return (
    <Box
      className="banner"
      bgcolor="secondary"
      sx={{ backgroundImage: `url(${myImage})` }}
    >
      <Stack
        justifyContent="center"
        alignItems={"center"}
        className="banner__content"
        sx={{ width: "100%", height: "100%" }}
        padding={2}
        borderRadius={15}
      >
        <Typography
          variant="body1"
          style={{
            color: "white",
            fontSize: 40,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Welcome to our website
        </Typography>
        <Search
          bgColor="white"
          width={"50%"}
        />
      </Stack>
      {/* <img className="position-center" src={image ? image : myImage} alt="" /> */}
    </Box>
  );
}
