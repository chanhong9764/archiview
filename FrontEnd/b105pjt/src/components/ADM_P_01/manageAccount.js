import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserList } from "../../api/adminAPI";
import { useSelector } from "react-redux";

function createData(id, name, email, introduce, role, auth) {
  introduce = introduce === null ? "None" : introduce;
  auth = auth ? "신청중" : "";

  return {
    id,
    name,
    email,
    introduce,
    role,
    auth,
  };
}

// sample 데이터
const rows = [
  createData(
    "chan9784",
    "박찬홍",
    "abc@gmail.com",
    "안녕하세요",
    "ROLE_USER",
    false
  ),
  createData(
    "chan9184",
    "박찬훙",
    "abcd@gmail.com",
    null,
    "ROLE_MEMBER",
    false
  ),
  createData(
    "abc1184",
    "김홍찬",
    "123abc@gmail.com",
    "소개말입니다",
    "ROLE_ADMIN",
    true
  ),
  createData(
    "asdfgh4",
    "홍찬김",
    "123ab1c@gmail.com",
    null,
    "ROLE_BLOCK",
    true
  ),
  createData("ea8b960f", "장지우", "f528g@gmail.com", null, "ROLE_USER", false),
  createData(
    "453682e9",
    "박민수",
    "da5so@gmail.com",
    "소개말입니다",
    "ROLE_ADMIN",
    true
  ),
  createData(
    "c045d260",
    "한서윤",
    "kwsb2@gmail.com",
    null,
    "ROLE_MEMBER",
    false
  ),
  createData(
    "0b0bbb6f",
    "정민수",
    "ptxa4@gmail.com",
    null,
    "ROLE_BLOCK",
    false
  ),
  createData(
    "5487bb96",
    "조지우",
    "2ydyj@gmail.com",
    null,
    "ROLE_ADMIN",
    false
  ),
  createData(
    "d7e5c3e3",
    "정서윤",
    "c4nhf@gmail.com",
    "소개말입니다",
    "ROLE_USER",
    false
  ),
  createData("5360e0e1", "장민수", "l1io8@gmail.com", null, "ROLE_USER", false),
  createData(
    "9d588cdc",
    "윤은지",
    "9qcpi@gmail.com",
    "소개말입니다",
    "ROLE_MEMBER",
    true
  ),
  createData(
    "25ac9959",
    "정홍찬",
    "y2drp@gmail.com",
    "안녕하세요",
    "ROLE_ADMIN",
    true
  ),
  createData(
    "d94c3157",
    "정하윤",
    "g6jqw@gmail.com",
    "소개말입니다",
    "ROLE_USER",
    true
  ),
  createData(
    "08cebfe4",
    "박성민",
    "v4wvo@gmail.com",
    "안녕하세요",
    "ROLE_USER",
    false
  ),
  createData(
    "bcef065d",
    "조서윤",
    "9uhjl@gmail.com",
    "안녕하세요",
    "ROLE_MEMBER",
    false
  ),
  createData(
    "2083ae38",
    "김홍찬",
    "lhttu@gmail.com",
    null,
    "ROLE_MEMBER",
    false
  ),
  createData(
    "90ae9495",
    "임홍찬",
    "zalw5@gmail.com",
    "소개말입니다",
    "ROLE_ADMIN",
    true
  ),
  createData(
    "2f6eb979",
    "임하윤",
    "7kgf7@gmail.com",
    "안녕하세요",
    "ROLE_ADMIN",
    false
  ),
  createData(
    "2edb7115",
    "임홍찬",
    "8qh45@gmail.com",
    "소개말입니다",
    "ROLE_MEMBER",
    false
  ),
  createData(
    "53a9705c",
    "최찬김",
    "huuzv@gmail.com",
    null,
    "ROLE_ADMIN",
    false
  ),
  createData(
    "19309f8d",
    "윤홍찬",
    "2cwt5@gmail.com",
    "안녕하세요",
    "ROLE_MEMBER",
    true
  ),
  createData(
    "9d8d49b9",
    "이은지",
    "tvfq6@gmail.com",
    "소개말입니다",
    "ROLE_USER",
    false
  ),
  createData(
    "899335af",
    "한찬훙",
    "tnd9t@gmail.com",
    null,
    "ROLE_BLOCK",
    false
  ),
];

// 내림차순 정렬 Comparator
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// 내림차순인지, 오름차순인지 선택
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// 정렬 알고리즘 (stable sort)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// Column명 관리
const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "NAME",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "E-MAIL",
  },
  {
    id: "introduce",
    numeric: false,
    disablePadding: false,
    label: "INTRODUCE",
  },
  {
    id: "role",
    numeric: false,
    disablePadding: false,
    label: "ROLE",
  },
  {
    id: "auth",
    numeric: false,
    disablePadding: false,
    label: "AUTH",
  },
];

// Column명 표시해주는 row
function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// 테이블 헤더
EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          회원관리
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const ManageAccount = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();
  const [row, setRow] = React.useState([]);

  const token = useSelector((state) => state.accessToken);

  useEffect(() => {
    getUserList(
      token,
      (resp) => {
        console.log("resp >> ", resp);
      },
      (error) => {
        console.log("error >> ", error);
      }
    );
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // 상세버튼 클릭 시 동작
  const handleOpenDetail = (event) => {
    console.log("선택된 row: ", event);
    navigate("/myinterview", { state: { event: event }, replace: true });
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />

            {/* Row 출력 */}
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <Button
                        onClick={(event) => {
                          event.stopPropagation(); // 상위 요소로의 이벤트 전파를 막음
                          handleOpenDetail(row); // 여기서 row는 현재 행의 데이터를 나타냄
                        }}
                      >
                        {row.id}
                      </Button>
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.introduce}</TableCell>
                    <TableCell align="left">{row.role}</TableCell>
                    <TableCell align="left">{row.auth}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default ManageAccount;
