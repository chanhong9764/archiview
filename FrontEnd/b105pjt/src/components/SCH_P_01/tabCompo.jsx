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
import SecondTabFirstList from "./secondTabFirstList";
import SecondTabSecondList from "./secondTabSecondList";
import TagListCompo from "./tagListCompo";
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
  const dumyBigTagList1 = ["직무", "역량"];
  const dumyBigTagList2 = ["직업1", "직업2"];
  const [value, setValue] = React.useState(0);
  const [tagDataList, setTagDataList] = React.useState([]);
  const [checked, setChecked] = React.useState([]);
  const [bigTagList, setBigTagList] = React.useState(dumyBigTagList1);
  const [bigTagData, setBigTagData] = React.useState("");
  const [smallTagData, setSmallTagData] = React.useState([]);
  const [smallTagList, setSmallTagList] = React.useState([]);
  const [pickTagList, setPickTagList] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleReset = () => {
    setSmallTagData([]);
    setSmallTagList([]);
    setBigTagData("");
    setTagDataList([]);
    setChecked([]);
    setPickTagList([]);
  };

  const onClickTab = (value) => {
    setBigTagData("");
    setBigTagList(value);
    setSmallTagList([]);
    setSmallTagData([]);
    // setChecked([]);
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
          <Tab
            label="Select 1"
            {...a11yProps(0)}
            onClick={() => onClickTab(dumyBigTagList1)}
          />
          <Tab
            label="Select 2"
            {...a11yProps(1)}
            onClick={() => onClickTab(dumyBigTagList2)}
          />
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
              bigTagData={bigTagData}
              setBigTagData={setBigTagData}
              checked={checked}
              setChecked={setChecked}
              smallTagData={smallTagData}
              setSmallTagData={setSmallTagData}
              bigTagList={bigTagList}
              setBigTagList={setBigTagList}
              smallTagList={smallTagList}
              setSmallTagList={setSmallTagList}
              pickTagList={pickTagList}
              setPickTagList={setPickTagList}
            />
          </Grid>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Grid>
            <FirstTabSecondList
              tagDataList={tagDataList}
              setTagDataList={setTagDataList}
              bigTagData={bigTagData}
              smallTagData={smallTagData}
              setSmallTagData={setSmallTagData}
              smallTagList={smallTagList}
              pickTagList={pickTagList}
              setPickTagList={setPickTagList}
            />
          </Grid>
        </Grid>
        <Divider />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Grid container spacing={2}>
          <Grid xs={5} sx={{ pr: "0px" }}>
            <SecondTabFirstList
              tagDataList={tagDataList}
              setTagDataList={setTagDataList}
              bigTagData={bigTagData}
              setBigTagData={setBigTagData}
              checked={checked}
              setChecked={setChecked}
              smallTagData={smallTagData}
              setSmallTagData={setSmallTagData}
              bigTagList={bigTagList}
              setBigTagList={setBigTagList}
              smallTagList={smallTagList}
              setSmallTagList={setSmallTagList}
              pickTagList={pickTagList}
              setPickTagList={setPickTagList}
            />
          </Grid>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Grid>
            <SecondTabSecondList
              tagDataList={tagDataList}
              setTagDataList={setTagDataList}
              bigTagData={bigTagData}
              smallTagData={smallTagData}
              setSmallTagData={setSmallTagData}
              smallTagList={smallTagList}
              pickTagList={pickTagList}
              setPickTagList={setPickTagList}
            />
          </Grid>
        </Grid>
      </CustomTabPanel>
      <Divider />
      <Box>
        <TagListCompo
          pickTagList={pickTagList}
          setPickTagList={setPickTagList}
          smallTagData={smallTagData}
          setSmallTagData={setSmallTagData}
          tagDataList={tagDataList}
          setTagDataList={setTagDataList}
          bigTagData={bigTagData}
          checked={checked}
          setChecked={setChecked}
        />
      </Box>
      <Box>
        {/* <Box>빅태그 : {bigTagData}</Box>
        <Box>태그 데이터 모음 : {JSON.stringify(tagDataList)}</Box>
        <Box>더미 스몰태그 벨류 리스트 : {JSON.stringify(smallTagList)}</Box>
        <Box>픽한 스몰테그 데이터 : {JSON.stringify(smallTagData)}</Box>
        <Box>출력할 픽 데이터 : {JSON.stringify(pickTagList)}</Box> */}
        <Button onClick={() => handleReset()}>Reset</Button>
      </Box>
    </Box>
  );
}
