import React from 'react';
import { Dialog, DialogContent, DialogContentText, DialogActions, Button, Typography, Box } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // 성공 아이콘 추가

const FindIDResult = ({ id, onClose }) => {
  return (
    <Dialog open={Boolean(id)} onClose={onClose} aria-labelledby="id-result-dialog-title">
      <DialogContent sx={{ textAlign: 'center', p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <CheckCircleIcon color="success" sx={{ fontSize: 60 }} /> {/* 성공 아이콘 */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            찾은 아이디
          </Typography>
          <Typography variant="subtitle1" color="secondary" sx={{ fontWeight: 'bold' }}>
            {id}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button onClick={onClose} color="primary" variant="outlined" sx={{ width: '50%' }}>
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FindIDResult;
