import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AutoCompleteCompo from "./autoCompleteCompo";
import Divider from "@mui/material/Divider";

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
      {value === index && (
        <Box sx={{ ...other }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
  const [value, setValue] = React.useState(0);

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
        <AutoCompleteCompo />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Select 2
      </CustomTabPanel>
    </Box>
  );
}
