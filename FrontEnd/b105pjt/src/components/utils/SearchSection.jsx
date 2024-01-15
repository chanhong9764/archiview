import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'; // 여백을 조절하기 위해 Grid 컴포넌트를 사용합니다.

const SearchSection = () => {
  // 각 분류에 대한 검색 옵션
  const searchOptions = {
    category1: ['기업명', '상품명', '모델명'],
    category2: ['서울특별시', '경기도', '부산광역시'],
    category3: ['컴퓨터', '휴대폰', '가전제품']
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}> {/* Grid container를 사용해 항목 간 간격을 조절합니다. */}
        <Grid item xs={12} sm={4}> {/* Grid item을 사용해 반응형으로 크기를 조절합니다. */}
          <Autocomplete
            options={searchOptions.category1}
            freeSolo
            renderInput={(params) => (
              <TextField {...params} label="검색" variant="outlined" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            options={searchOptions.category2}
            renderInput={(params) => (
              <TextField {...params} label="지역 선택" variant="outlined" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            options={searchOptions.category3}
            renderInput={(params) => (
              <TextField {...params} label="카테고리 선택" variant="outlined" fullWidth />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchSection;