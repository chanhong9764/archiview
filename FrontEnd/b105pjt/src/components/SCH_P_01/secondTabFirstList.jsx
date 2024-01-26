import * as React from "react";
import Box from "@mui/material/Box";
import { FixedSizeList } from "react-window";
import Listcompo from "./fitstTabFirstListCompo";

function renderRow(props) {
  const {
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
    bigTagData,
    setPickTagList,
    pickTagList,
  } = props;
  return (
    <Listcompo
      tagDataList={tagDataList}
      setTagDataList={setTagDataList}
      setBigTagData={setBigTagData}
      checked={checked}
      setChecked={setChecked}
      smallTagData={smallTagData}
      setSmallTagData={setSmallTagData}
      bigTagList={bigTagList}
      setBigTagList={setBigTagList}
      smallTagList={smallTagList}
      setSmallTagList={setSmallTagList}
      bigTagData={bigTagData}
      setPickTagList={setPickTagList}
      pickTagList={pickTagList}
    />
  );
}

export default function VirtualizedList({
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
  bigTagData,
  pickTagList,
  setPickTagList,
}) {
  return (
    <Box
      sx={{
        width: "100%",
        height: 300,
        bgcolor: "background.paper",
      }}
    >
      <FixedSizeList height={300} itemSize={46} itemCount={1}>
        {() =>
          renderRow({
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
            bigTagData,
            pickTagList,
            setPickTagList,
          })
        }
      </FixedSizeList>
    </Box>
  );
}
