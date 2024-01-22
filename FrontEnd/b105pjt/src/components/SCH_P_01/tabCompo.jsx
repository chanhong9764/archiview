import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AutoCompleteCompo from "./autoCompleteCompo";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import FirstTabFirstList from "./firstTabFirstList";
import FirstTabSecondList from "./firstTabSecondList";
import { Button } from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ ...other }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const dumyBigTagList = ["삼성", "SKT", "LG", 3, 4, 5, 6, 7, 8, 9, 10];
  const [value, setValue] = React.useState(0);
  const [tagDataList, setTagDataList] = React.useState([]);
  const [checked, setChecked] = React.useState([]);
  const [bigTagList, setBigTagList] = React.useState(dumyBigTagList);
  const [bigTagData, setBigTagData] = React.useState("");
  const [smallTagData, setSmallTagData] = React.useState([]);
  const [smallTagList, setSmallTagList] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        border: "2px solid #1769aa",
        marginTop: "10px",
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          padding: "10px",
          paddingBottom: "0",
        }}
      >
        <Tabs value={value} onChange={handleChange} aria-label="기본 탭 예제">
          <Tab label="Select 1" {...a11yProps(0)} />
          <Tab label="Select 2" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} padding="0px">
        <AutoCompleteCompo />
        <Divider />
        <Grid container spacing={2}>
          <Grid xs={5} sx={{ pr: "0px" }}>
            <FirstTabFirstList
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
            />
          </Grid>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Grid>
            <FirstTabSecondList
              tagDataList={tagDataList}
              bigTagData={bigTagData}
              setTagDataList={setTagDataList}
              smallTagData={smallTagData}
              smallTagList={smallTagList}
              setSmallTagData={setSmallTagData}
            />
          </Grid>
        </Grid>
        <Divider />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Select 2
      </CustomTabPanel>
      <Box>빅태그 : {bigTagData}</Box>
      <Box>태그 데이터 모음 : {tagDataList}</Box>
      <Box>더미 스몰태그 벨류 리스트 : {JSON.stringify(smallTagList)}</Box>
      <Box>스몰태그 키 리스트 : {smallTagData}</Box>
      <Box>
        <Button>Reset</Button>
      </Box>
    </Box>
  );
}
