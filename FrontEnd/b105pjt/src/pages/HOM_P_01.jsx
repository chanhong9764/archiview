import SearchSection from "../components/utils/SearchSection";
import { Container, Box, Accordion, Typography, Button } from "@mui/material";
// import homAccodian from "../components/HOM_P_01/homAccodian";
import SearchField from "../components/HOM_P_01/searchField";
import Logo from "../components/HOM_P_01/logo";
// import Box from "@mui/material";
// import Accordion from "@mui/material";
// import Typography from "@mui/material";
// import Button from "@mui/material";
import HomAccodian from "../components/HOM_P_01/homAccodian";

function HOM_P_01() {
  const flag = false;
  const dumy = [
    { title: "더미", content: "미더" },
    { title: "더미1", content: "미더1" },
  ];

  const handleEdit = (index) => {
    console.log("Editing item:", index);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: 2,
      }}
    >
      <Logo />
      <SearchField />
      <div style={{ width: "100%" }}>
        <SearchSection />
      </div>
      <div style={{ width: "100%" }}>
        {!flag ? null : (
          <>
            {dumy.map((item, index) => (
              <HomAccodian key={index} title={item.title}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>{item.content}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(index)}
                  >
                    등록하기
                  </Button>
                </Box>
              </HomAccodian>
            ))}
          </>
        )}
      </div>
    </Container>
  );
}

export default HOM_P_01;
