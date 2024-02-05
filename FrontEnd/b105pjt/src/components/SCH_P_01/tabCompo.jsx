import { useState, useEffect } from "react";
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

export default function BasicTabs({ setCompanyId, setCsList, setJobList }) {
  const dumyData = {
    code: "SELECT_TAG_LIST_SUCCESS",
    message: "태그 조회에 성공했습니다.",
    data: {
      csList: [
        {
          name: "공통",
          csSubList: ["장단점", "자기소개", "뽑아야할 이유"],
        },
        {
          name: "특화",
          csSubList: ["역량", "경험", "언어", "기술"],
        },
      ],
      jsList: [
        {
          name: "IT",
          jobSubList: ["프론트엔드", "백엔드", "풀스택", "Java", "Python"],
        },
        {
          name: "게임",
          jobSubList: ["게임 디자인", "게임 프로그래밍", "게임 서버 관리"],
        },
      ],
    },
  };

  const dumyBigTagList1 = dumyData.data.csList.map(function (ojt) {
    const rOjt = ojt.name;
    return rOjt;
  });
  const dumyBigTagList2 = dumyData.data.jsList.map(function (ojt) {
    const rOjt = ojt.name;
    return rOjt;
  });

  const [tab, setTab] = useState("csList");
  const [value, setValue] = useState(0);
  const [tagDataList, setTagDataList] = useState([]);
  const [checked, setChecked] = useState([]);
  const [bigTagList, setBigTagList] = useState(dumyBigTagList1);
  const [bigTagData, setBigTagData] = useState("");
  const [smallTagData, setSmallTagData] = useState([]);
  const [smallTagList, setSmallTagList] = useState([]);
  const [pickTagList, setPickTagList] = useState([]);
  const [tagSearchOpen, setTagSearchOpen] = useState(true);

  useEffect(() => {
    // setCsList(
    // tagDataList
    //   .filter((item) => item.tab === "csList")
    //   .map((item) => item.smallTag)
    //   .flat()
    // );
    // setJobList(
    // tagDataList
    //   .filter((item) => item.tab === "jsList")
    //   .map((item) => item.smallTag)
    //   .flat();
    // );
    // setCompanyId();
    console.log(
      tagDataList
        .filter((item) => item.tab === "csList")
        .map((item) => item.smallTag)
        .flat()
    );
    console.log(
      tagDataList
        .filter((item) => item.tab === "jsList")
        .map((item) => item.smallTag)
        .flat()
    );
  }, [tagDataList]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTabChange = (event, tabData, bigTagData) => {
    setTab();
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

  const onClickTab = (value, tabData) => {
    setBigTagData("");
    setBigTagList(value);
    setSmallTagList([]);
    setSmallTagData([]);
    setTab(tabData);
    // setChecked([]);
  };

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
            label="CS"
            {...a11yProps(0)}
            onClick={() => onClickTab(dumyBigTagList1, "csList")}
            sx={{ padding: "5px 10px" }} // 탭의 패딩 감소
          />
          <Tab
            label="JOB"
            {...a11yProps(1)}
            onClick={() => onClickTab(dumyBigTagList2, "jobList")}
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
                  dumyData={dumyData.data.csList}
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
                  dumyData={dumyData.data.jsList}
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
        <Button color="primary" startIcon={<SearchIcon />}></Button>
      </Box>
      {/* <Box>빅태그 : {bigTagData}</Box> */}
      {/* <Box>태그 데이터 모음 : {JSON.stringify(tagDataList)}</Box> */}
      <Box>
        csList 잘 구워졌나 확인 :
        {JSON.stringify(
          tagDataList
            .filter((item) => item.tab === "csList")
            .map((item) => item.smallTag)
            .flat()
        )}
      </Box>
      <Box>
        JsList 잘 구워졌나 확인 :
        {JSON.stringify(
          tagDataList
            .filter((item) => item.tab === "jsList")
            .map((item) => item.smallTag)
            .flat()
        )}
      </Box>
      {/* <Box>더미 스몰태그 벨류 리스트 : {JSON.stringify(smallTagList)}</Box>
      <Box>픽한 스몰테그 데이터 : {JSON.stringify(smallTagData)}</Box>
      <Box>출력할 픽 데이터 : {JSON.stringify(pickTagList)}</Box>
      <Box>백에 보내줄 데이터 : {JSON.stringify(payLoadData)}</Box> */}
    </Box>
  );
}
