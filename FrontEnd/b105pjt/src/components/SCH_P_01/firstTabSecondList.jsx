import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { Box } from "@mui/material";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray({
  tagDataList,
  bigTagData,
  setTagDataList,
  smallTagData,
  smallTagList,
  setSmallTagData,
}) {
  const AllClick = (key) => {
    setSmallTagData(Object.keys(smallTagList));
  };

  const handleClick = (key) => {
    setSmallTagData((prevSelectedChips) => {
      if (smallTagData.length === smallTagList.length) {
        return [key];
      } else {
        if (prevSelectedChips.includes(key)) {
          return prevSelectedChips.filter((chipKey) => chipKey !== key);
        } else {
          return [...prevSelectedChips, key];
        }
      }
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {bigTagData ? (
        <ListItem key="All">
          <Chip
            label="All"
            variant="outlined"
            onClick={() => AllClick()}
            color={
              smallTagData.length === smallTagList.length
                ? "primary"
                : "default"
            }
          />
        </ListItem>
      ) : null}
      {smallTagList.map((data) => {
        const isSelected = smallTagData.includes(data.key);

        return (
          <ListItem key={data.key}>
            <Chip
              label={data.label}
              onClick={() => handleClick(data.key)}
              variant="outlined"
              color={
                smallTagData.length !== smallTagList.length &&
                smallTagData.includes(data.key)
                  ? "primary"
                  : "default"
              }
              sx={{
                color: isSelected ? "primary" : "default",
              }}
            />
          </ListItem>
        );
      })}
    </Box>
  );
}
