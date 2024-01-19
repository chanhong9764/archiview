import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { Box } from "@mui/material";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray() {
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" },
  ]);

  const [selectedChips, setSelectedChips] = React.useState([]);

  const AllClick = (key) => {
    setSelectedChips(chipData);
  };

  const handleClick = (key) => {
    setSelectedChips((prevSelectedChips) => {
      if (selectedChips.length === chipData.length) {
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
      <ListItem key="All">
        <Chip
          label="All"
          variant="outlined"
          onClick={() => AllClick()}
          color={
            selectedChips.length === chipData.length ? "primary" : "default"
          }
        />
      </ListItem>
      {chipData.map((data) => {
        const isSelected = selectedChips.includes(data.key);

        return (
          <ListItem key={data.key}>
            <Chip
              label={data.label}
              onClick={() => handleClick(data.key)}
              variant="outlined"
              color={
                selectedChips.length !== chipData.length &&
                selectedChips.includes(data.key)
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
