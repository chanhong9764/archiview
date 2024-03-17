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
  dumyData,
}) {
  function smallTagFilter(arr, pickTag) {
    return arr.filter((el) => el.name === pickTag);
  }
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    let num = 0;
    const dumySmallList = smallTagFilter(dumyData, value)[0].jobSubList.map(
      function (obj) {
        const rObj = {};
        rObj["key"] = num++;
        rObj["smallTag"] = obj;
        return rObj;
      }
    );

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
          smallTag: dumySmallList.map((item) => item.smallTag),
          tab: "jsList",
        },
      ]);
      setPickTagList([
        ...pickTagList.filter((item) => item.bigTag !== value),
        { smallTag: "전체", bigTag: value, key: "ALL", tab: "jsList" },
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
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        overflow: "auto",
      }}
    >
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
              <ListItemText
                id={labelId}
                primary={`${value}`}
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
