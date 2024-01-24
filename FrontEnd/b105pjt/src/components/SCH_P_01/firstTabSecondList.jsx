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
  pickTagList,
  setPickTagList,
}) {
  function changTagData(content) {
    setTagDataList([
      ...tagDataList.filter((item) => item.cs !== bigTagData),
      {
        cs: bigTagData,
        smallTagIndex: content,
      },
    ]);
  }
  function changPcikTagData(content) {
    setPickTagList([
      ...pickTagList.filter((item) => item.cs !== bigTagData),
      { smallTag: content.smallTag, cs: bigTagData, key: content.key },
    ]);
  }
  const AllClick = () => {
    setSmallTagData([...smallTagList.keys()]);
    changTagData([...smallTagList.keys()]);
    changPcikTagData({ smallTag: "전체", key: "ALL" });
  };

  const handleClick = (data) => {
    setSmallTagData((prevSelectedChips) => {
      if (smallTagData.length === smallTagList.length) {
        changTagData([data.key]);
        return [data.key];
      } else {
        if (prevSelectedChips.includes(data.key)) {
          if (smallTagData.length !== 1) {
            changTagData(
              prevSelectedChips.filter((chipKey) => chipKey !== data.key)
            );
            return prevSelectedChips.filter((chipKey) => chipKey !== data.key);
          } else {
            return [...prevSelectedChips];
          }
        } else {
          changTagData([...prevSelectedChips, data.key]);
          return [...prevSelectedChips, data.key];
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
              label={data.smallTag}
              onClick={() => handleClick(data)}
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
