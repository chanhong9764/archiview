import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export default function CheckboxList({
  tagDataList,
  setTagDataList,
  setBigTagData,
  checked,
  setChecked,
  smallTagData,
  setSmallTagData,
  bigTagList,
  setBigTagList,
  smallTagList,
  setSmallTagList,
}) {
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const dumySmallList = [
      { key: 0, label: "Angular" },
      { key: 1, label: "jQuery" },
      { key: 2, label: "Polymer" },
      { key: 3, label: "React" },
      { key: 4, label: "Vue.js" },
    ];

    if (currentIndex === -1) {
      setChecked([...checked, value]);
      setBigTagData(value);
      setSmallTagList(dumySmallList);
      // setSmallTagList(JSON.stringify(dumySmallList));
      setSmallTagData(dumySmallList.map((item) => item.key));
      // setTagDataList([...tagDataList, value]);
    }
    // else {
    //   setChecked(checked.filter((item) => item !== value));
    // }
  };

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {bigTagList.map((value) => {
        const labelId = `checkbox-list-label-${value}`;
        const isChecked = checked.indexOf(value) !== -1;

        return (
          <ListItem
            key={value}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <ArrowRightIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton
              role={undefined}
              onClick={handleToggle(value)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={isChecked}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={`대분류 ${value}`}
                sx={{
                  color: isChecked ? "blue" : "default",
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
