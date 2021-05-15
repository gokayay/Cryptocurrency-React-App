import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import SearchBar from "material-ui-search-bar";
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import CryptoDetail from './CryptoDetail';



const columns = [
  {id: 'rank', label: 'rank'},
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'symbol', label: 'Symbol', minWidth: 100 },
  {
    id: 'priceUsd',
    label: 'Exchange Rate',
    minWidth: 170,
  }
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 700,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DetailList(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searched, setSearched] = React.useState("");
  let tableData = props.value.data;
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState("");

  const handleClickOpen = (rowId) => {
    if(rowId){
      setSelectedRow(rowId);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const requestSearch = (searchedVal) => {
    const filteredRows = props?.value?.data?.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
  setRows(filteredRows);
};

const cancelSearch = () => {
  setSearched("");
  requestSearch(searched);
};

const setRows = (rows) => {
  tableData = rows;
}

const handleCallback = (childData) =>{
  if(childData){
      handleClose();
  }
}

  return (
    <div>
    <Paper className={classes.root}>
        <SearchBar
    value={searched}
    onChange={(searchVal) => requestSearch(searchVal)}
    onCancelSearch={() => cancelSearch()}
  />
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={()=>handleClickOpen(row.id)}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} >
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tableData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
<CryptoDetail parentCallback = {handleCallback} selectedCoin={selectedRow}></CryptoDetail>
</Dialog>
</div>
  );
}
