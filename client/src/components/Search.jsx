import { Close, ImageOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useQuery from "../hooks/useQuery";
import { tagService } from "../services";
import { setOptions } from "../store/slices/searchSlice";

const Search = ({ bgColor = "transparent", ...props }) => {
  const options = useSelector((store) => store.search.options);
  const [kw, setKw] = useState(options.kw);
  const [isShow, setIsShow] = useState(false);
  const { data: tags, fetching: isLoading } = useQuery(
    () => tagService.getByKw(kw),
    [kw]
  );
  const dispatcher = useDispatch();

  const inputRef = useRef(null);

  const handleSearch = (value = null) => {
    if (value != null) dispatcher(setOptions({ ...value }));
    else dispatcher(setOptions({ ...options, kw: kw }));

    setIsShow(false)
  };

  const handleClear = () => {
    setKw('')
    inputRef.current.focus()
  }

  const windowClick = (e) => {
    if(e.target != inputRef.current && isShow)
      setIsShow(false)
  }
  useEffect(() => {
    window.addEventListener('click', windowClick)

    return () => {
      window.removeEventListener('click', windowClick)
    }
  })

  return (
    <Box className={`search ${isShow && "isDropDown"}`}>
      <Box className="search__input">
        <input
          onFocus={() => setIsShow(true)}
          ref={inputRef}
          value={kw}
          onKeyDown={(e) => {
            e.key == "Enter" && handleSearch();
          }}
          onChange={(e) => setKw(e.target.value)}
          placeholder="Keyword"
        />
        <Box className="search__close">
          <Close onClick={handleClear}/>
        </Box>
        <Box className="search__icon">
          <ImageOutlined />
        </Box>
      </Box>

      <Box className="search__dropdown">
        {tags.length > 0 &&
          tags.map((tag, index) => (
            <div
              key={index}
              className="search__dropdown--item"
              onClick={() => {
                handleSearch({ ...options, kw: tag })
                setIsShow(false)
                setKw(tag)
              }}
            >
              {tag}
            </div>
          ))}
      </Box>
    </Box>
  );
};

export default Search;
