import SearchSection from "../components/HOM_P_01/HOM_SearchSection";
import { Container, Box, Typography, Button, Grid } from "@mui/material";
import SearchField from "../components/HOM_P_01/searchField";
import Logo from "../components/HOM_P_01/logo";
import Video from "../components/HOM_P_01/video";
import HomAccodian from "../components/HOM_P_01/homAccodian";
import { useState } from "react";

function HOM_P_01() {
  const [flag, setFlag] = useState(false);

  const dumy = [
    { title: "제목", content: "상세 내용칸" },
    { title: "제목1", content: "상새 내용칸1" },
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
                      <Box display="flex" alignItems="center">
                        <Grid container>
                          <Grid item sm={2}>
                            <Video />
                          </Grid>
                          <Grid
                            item
                            sm={9}
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography>{item.content}</Typography>
                            <div style={{ marginTop: "8px", color: "gray" }}>
                              태그 데이터
                            </div>
                          </Grid>
                          <Grid
                            item
                            sm={1}
                            sx={{ display: "flex", alignItems: "flex-end" }}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleEdit(index)}
                              sx={{
                                backgroundColor: "green",
                                "&:hover": {
                                  backgroundColor: "green",
                                },
                              }}
                            >
                              자세히
                            </Button>
                          </Grid>
                        </Grid>
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
