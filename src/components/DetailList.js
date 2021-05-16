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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



const columns = [
  {id: 'rank', label: 'rank'},
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'symbol', label: 'Symbol', minWidth: 100 },
  {
    id: 'priceUsd',
    label: 'Exchange Rate ($)',
    minWidth: 170,
  },
  {
    id: 'changeRate',
    label: 'Selected Rate Price',
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
  formControl:{
    display: 'flex',
    margin: '1rem'
  },
  tableRow:{
    cursor: 'pointer'
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DetailList(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searched, setSearched] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState("");
  const [tableData, setTableData] = React.useState(props?.value?.data);
  const [rateData, setRateData] = React.useState(props?.rates?.data);

  const [rate, setRate] = React.useState('');

  const handleChange = (event) => {
    setRate(event.target.value);
    const selectedRate = props?.value?.data?.map((row) => {
      row.changeRate = row?.priceUsd / event?.target?.value ;
      return row;
    });
    if(selectedRate){
      setTableData(selectedRate);
    }
  };

  React.useEffect(() => {
    if (props?.value?.data) {
      setTableData(props?.value?.data);
    }
  }, [props?.value?.data]);

  React.useEffect(() => {
    if (props?.rates?.data) {
      setRateData(props?.rates?.data);
    }
  }, [props?.rates?.data]);

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
    console.log(props);
    const filteredRows = props?.value?.data?.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
  if(filteredRows){
    setTableData(filteredRows);
  }
};

const cancelSearch = () => {
  setSearched("");
  requestSearch(searched);
};


const handleCallback = (childData) =>{
  if(childData){
      handleClose();
  }
}

  return (
    <div>
    <Paper className={classes.root}>
    <FormControl className={classes.formControl}>
        <InputLabel>Rate</InputLabel>
        <Select
          value={rate}
          onChange={handleChange}
        >
           {
           rateData?.map((rate, index)=>
            <MenuItem value={rate.rateUsd}  key={rate.id}>{rate.id}</MenuItem>
          )} 
        </Select>
      </FormControl>
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
                <TableRow hover role="checkbox" className={classes.tableRow} tabIndex={-1} key={row.code} onClick={()=>handleClickOpen(row.id)}>
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
