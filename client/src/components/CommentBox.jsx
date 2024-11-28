import {
  Avatar,
  Box,
  Button,
  Pagination,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import styled from "styled-components";
import useQuery from "../hooks/useQuery";
import commentService from "../services/commentService";

export default function CommentBox({ fileId, user }) {
  const [content, setContent] = useState("");
  // const user = useSelector((store) => store.auth.user);

  const {
    data: comments,
    setData: setComments,
    fetching: isLoading,
  } = useQuery(() => commentService.getCommentOfFile(fileId));
  const handleAddComment = async () => {
    if(!content) return
    const response = await commentService.addComment(fileId, content);

    if (!response.error) {
      const newComment = {
        id: response.data,
        content,
        createAt: new Date(),
        user: user,
      };
      setComments({ ...comments, data: [...comments.data, newComment] });
      setContent("");
    }
  };

  return (
    <Box>
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <Avatar src={user.avatar} />
        <StyledTextarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
          minRows={3}
          placeholder="Leave your comment"
        />
        <Button onClick={handleAddComment}>Send</Button>
      </Stack>
      <Box marginY={3}>
        {!isLoading &&
          comments.data?.map((comment) => (
            <Stack
              direction={"row"}
              spacing={2}
              alignItems={"center"}
              marginY={2}
              key={comment.id}
            >
              <Avatar src={comment?.user?.avatar} />
              <Box>
                <Typography
                  variant="subtitle2"
                  component={"span"}
                  marginRight={2}
                >
                  {comment?.user?.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  component={"span"}
                  sx={{ fontSize: 12, color: "#999" }}
                >
                  {comment.createdAt}
                </Typography>
                <Typography variant="body1" marginTop={2}>
                  {comment.content}
                </Typography>
              </Box>
            </Stack>
          ))}
      </Box>
      {comments.totalPages > 0 && <Pagination count={comments.totalPages} />}
    </Box>
  );
}
const StyledTextarea = styled(TextareaAutosize)(({ theme }) => {
  const myTheme = useTheme();
  return `
        width: 100%;
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 12px;
        border-radius: 12px;
        color: ${grey[900]};
        background: '#fff';
        border: 1px solid ${grey[200]};
        box-shadow: 0px 2px 2px ${grey[50]};
        resize: none;
      
        &:hover {
          border-color: ${myTheme.palette.primary[400]};
        }
        &:focus {
            border-color: ${myTheme.palette.primary[400]};
            box-shadow: 0 0 0 3px ${myTheme.palette.primary[200]};
          }
        
          // firefox
          &:focus-visible {
            outline: 0;
          }
        `;
});
