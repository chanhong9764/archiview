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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { questionSearch } from "../../api/questionAPI";

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

export default function BasicTabs({ setQuestions }) {
  const dumyBigTagList1 = ["직무", "역량"];
  const dumyBigTagList2 = ["직업1", "직업2", "직업3", "직업4", "직업5"];
  const [value, setValue] = React.useState(0);
  const [tagDataList, setTagDataList] = React.useState([]);
  const [checked, setChecked] = React.useState([]);
  const [bigTagList, setBigTagList] = React.useState(dumyBigTagList1);
  const [bigTagData, setBigTagData] = React.useState("");
  const [smallTagData, setSmallTagData] = React.useState([]);
  const [smallTagList, setSmallTagList] = React.useState([]);
  const [pickTagList, setPickTagList] = React.useState([]);
  const [tagSearchOpen, setTagSearchOpen] = React.useState(true);
  const [pgno, setPgno] = React.useState(1);

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

  const handleOpenSearchBar = () => {
    setTagSearchOpen(false);
  };

  const handleCloseSearchBar = () => {
    setTagSearchOpen(true);
  };

  const onClickTab = (value) => {
    setBigTagData("");
    setBigTagList(value);
    setSmallTagList([]);
    setSmallTagData([]);
    // setChecked([]);
  };

  const onClickSearch = async () => {
    const data = {
      userId: "",
      company: "",
      cs: "",
      job: "",
      pgno: pgno,
    }
    await questionSearch(data).then(res => {
      const formattedQuestions = res.data.data.map((item) => {
        return {
          id: item.id,
          content: item.content,
          replies: item.replies,
        };
      });
      setQuestions(formattedQuestions)
    }).catch(err => {
      console.log(err)
    }) 
  }

  return (
    <Box
      sx={{
        width: "100%",
        border: "2px solid #1769aa",
        marginTop: "10px",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      {/* SELECT1, SELECT2 nav Box */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          padding: "5px",
          paddingBottom: "0",
        }}
      >
        <Tabs value={value} onChange={handleChange} aria-label="기본 탭 예제">
          <Tab
            label="Select 1"
            {...a11yProps(0)}
            onClick={() => onClickTab(dumyBigTagList1)}
            sx={{ padding: "5px 10px" }} // 탭의 패딩 감소
          />
          <Tab
            label="Select 2"
            {...a11yProps(1)}
            onClick={() => onClickTab(dumyBigTagList2)}
            sx={{ padding: "5px 10px" }} // 탭의 패딩 감소
          />
        </Tabs>
      </Box>

      {/* 회사명(자동완성 기능) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 10px",
        }}
      >
        <AutoCompleteCompo />
        <div>
          {tagSearchOpen ? (
            <Button
              onClick={handleOpenSearchBar}
              startIcon={<ExpandMoreIcon />}
            ></Button>
          ) : (
            <Button
              onClick={handleCloseSearchBar}
              startIcon={<ExpandLessIcon />}
            ></Button>
          )}
        </div>
      </div>
      <Divider />

      {!tagSearchOpen && (
        <div>
          {/* SELECT1 패널 */}
          {/* 대분류, 소분류까지 */}
          <CustomTabPanel value={value} index={0} padding="0px">
            <Grid container spacing={2}>
              {/* 대분류 */}
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

              {/* 소분류 */}
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

          {/* SELECT2 패널 */}
          {/* 대분류, 소분류까지 */}
          <CustomTabPanel value={value} index={1}>
            <Grid container spacing={2}>
              {/* 대분류 */}
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

              {/* 소분류 */}
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
        </div>
      )}

      <Divider />

      {/* 태그 모음 */}
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

      {/* 검색 버튼 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end", // 오른쪽 정렬
          alignItems: "center",
          marginTop: "5px",
          marginBottom: "5px",
        }}
      >
        {/* <Box>빅태그 : {bigTagData}</Box>
        <Box>태그 데이터 모음 : {JSON.stringify(tagDataList)}</Box>
        <Box>더미 스몰태그 벨류 리스트 : {JSON.stringify(smallTagList)}</Box>
        <Box>픽한 스몰테그 데이터 : {JSON.stringify(smallTagData)}</Box>
        <Box>출력할 픽 데이터 : {JSON.stringify(pickTagList)}</Box> */}
        <Button
          onClick={() => handleReset()}
          startIcon={<RestartAltIcon />}
        ></Button>
        <Button 
          color="primary" 
          startIcon={<SearchIcon />}
          onClick={onClickSearch}
        >
        </Button>
      </Box>
    </Box>
  );
}
