import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { Box } from "@mui/material";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray({
  setPickTagList,
  pickTagList,
  smallTagData,
  setSmallTagData,
  tagDataList,
  setTagDataList,
  bigTagData,
  setChecked,
  checked,
}) {
  function changeTagData(content) {
    const bigTagFilter = tagDataList.filter(
      (item) => item.bigTag === content.bigTag
    );
    const bigTagFilterData = bigTagFilter[0].smallTagIndex.filter(
      (item) => item !== content.key
    );
    // console.log(bigTagFilterData.length === 0);
    if (bigTagFilterData.length !== 0) {
      setTagDataList([
        ...tagDataList.filter((item) => item.bigTag !== content.bigTag),
        {
          bigTag: content.bigTag,
          smallTagIndex: bigTagFilterData,
        },
      ]);
    } else {
      setTagDataList([
        ...tagDataList.filter((item) => item.bigTag !== content.bigTag),
      ]);
      setChecked([...checked.filter((item) => item !== content.bigTag)]);
    }
    if (bigTagData === content.bigTag) {
      setSmallTagData(bigTagFilterData);
    }
  }

  const handleDelete = (chipToDelete) => () => {
    setPickTagList((chips) =>
      chips.filter(
        (chip) =>
          chip.key !== chipToDelete.key || chip.bigTag !== chipToDelete.bigTag
      )
    );
    // console.log(chipToDelete);
    if (chipToDelete.key !== "ALL") {
      changeTagData(chipToDelete);
    } else {
      setChecked([...checked.filter((item) => item !== chipToDelete.bigTag)]);
      setTagDataList([
        ...tagDataList.filter((item) => item.bigTag !== chipToDelete.bigTag),
      ]);
      if (chipToDelete.bigTag === bigTagData) setSmallTagData([]);
    }
  };

  function LKcreate(data) {
    return `${data.bigTag} > ${data.smallTag}`;
  }

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
      {pickTagList.map((data) => {
        return (
          <ListItem key={LKcreate(data)}>
            <Chip label={LKcreate(data)} onDelete={handleDelete(data)} />
          </ListItem>
        );
      })}
    </Box>
  );
}
