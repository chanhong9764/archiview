import SearchSection from "../components/HOM_P_01/HOM_SearchSection";
import { Container, Box, Typography, Button } from "@mui/material";
import SearchField from "../components/HOM_P_01/searchField";
import Logo from "../components/HOM_P_01/logo";
import HomAccodian from "../components/HOM_P_01/homAccodian";
import { useState } from "react";

function HOM_P_01() {
  const [flag, setFlag] = useState(false);

  const dumy = [
    { title: "더미", content: "미더" },
    { title: "더미1", content: "미더1" },
  ];

  const handleEdit = (index) => {
    console.log("Editing item:", index);
  };

  return (
    <>
      <Container
        sx={{
          display: flag ? "block" : "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: flag ? null : "80vh",
          width: "100%",
        }}
      >
        {flag ? null : <Logo />}
        <SearchSection flag={flag} setFlag={setFlag} />
        {!flag ? null : (
          <>
            <SearchField flag={flag} setFlag={setFlag} />
            <div style={{ width: "100%" }}>
              {!flag ? null : (
                <div style={{ paddingTop: "15px" }}>
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
                </div>
              )}
            </div>
          </>
        )}
      </Container>
    </>
  );
}

export default HOM_P_01;
