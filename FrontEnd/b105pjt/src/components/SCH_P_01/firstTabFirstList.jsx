import * as React from "react";
import Box from "@mui/material/Box";
import { FixedSizeList } from "react-window";
import Listcompo from "./listCompo";

function renderRow(props) {
  return <Listcompo />;
}

export default function VirtualizedList() {
  return (
    <Box
      sx={{
        width: "100%",
        height: 300,
        bgcolor: "background.paper",
      }}
    >
      <FixedSizeList height={300} itemSize={46} itemCount={1}>
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}
