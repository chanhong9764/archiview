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
  pickTagList,
  setPickTagList,
}) {
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const dumySmallList = [
      { key: 0, smallTag: "Angular" },
      { key: 1, smallTag: "jQuery" },
      { key: 2, smallTag: "Polymer" },
      { key: 3, smallTag: "React" },
      { key: 4, smallTag: "Vue.js" },
    ];

    function tagPlus(Ojt) {
      Ojt.bigTag = value;
      return Ojt;
    }
    if (currentIndex === -1) {
      setChecked([...checked, value]);
      setBigTagData(value);
      dumySmallList.map(tagPlus);
      setSmallTagList(dumySmallList);
      setSmallTagData(dumySmallList.map((item) => item.key));
      setTagDataList([
        ...tagDataList.filter((item) => item.bigTag !== value),
        {
          bigTag: value,
          smallTagIndex: dumySmallList.map((item) => item.key),
        },
      ]);
      setPickTagList([
        ...pickTagList.filter((item) => item.bigTag !== value),
        { smallTag: "전체", bigTag: value, key: "ALL" },
      ]);
    } else {
      setBigTagData(value);
      dumySmallList.map(tagPlus);
      setSmallTagList(dumySmallList);
      function smallTagPick(item) {
        if (item.bigTag === value) {
          return item;
        }
      }
      setSmallTagData(tagDataList.filter(smallTagPick)[0].smallTagIndex);
      //   setChecked(checked.filter((item) => item !== value));
    }
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
              <IconButton
                edge="end"
                aria-label="comments"
                onClick={handleToggle(value)}
              >
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
