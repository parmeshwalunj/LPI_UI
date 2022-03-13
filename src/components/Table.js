import * as React from "react";
import { makeStyles, withStyles, styled } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';
import Box from "@mui/material/Box";
import NumplateDataService from '../services/numplate.services'
import { db } from '../Firebase';
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

const columns = [
  { id: "image", label: "Image", minWidth: 240 },
  { id: "numberplate", label: "Number\u00a0Plate", minWidth: 100 },
  { id: "timestamp", label: "Time\u00a0Stamp", minWidth: 100, align: "right" },
  // {id:'size', label:'Size\u00a0(km\u00b2)', minWidth:170, align: 'right', format: (value)=>value.toLocaleString('en-US')},
  // {id:'density', label:'Density', minWidth:170, align: 'right', format: (value)=>value.toFixed(2)},
];

function createData(image, numberplate, timestamp) {
  return { image, numberplate, timestamp };
}

const rows = [
  createData("India", "MH05EJ8288", "10/12/2022 9.12pm"),
  createData("China", "MH04JE4546", "10/12/2022 9.15pm"),
  createData("China", "MH04JE4546", "10/12/2022 9.15pm"),
  createData("China", "MH04JE4546", "10/12/2022 9.15pm"),

  createData("Italy", "MH05PL9012", "10/12/2022 9.18pm"),
];

export default function ResultsTable() {
  const q = query(collection(db, "test4"), orderBy("time", "desc"));
  
  const [messages] = useCollectionData(q, { idField: 'id' });
  console.log(messages);
    // Fetching data from firebase
    // const [plates, setPlates] = React.useState([]);
    // React.useEffect(() => {
    //     getPlates();
    // }, []);
    // const getPlates = async() => {
    //     const data = await NumplateDataService.getAllPlates();
    //     console.log(data);
    //     setPlates(data.docs.map((doc)=>({...doc.data(), id: doc.id})))
    //     // setPlates(data);
    // }
    // //Fetching data from firebase
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
      <>
      {/* <pre>{JSON.stringify(plates, undefined, 2)}</pre> */}
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 690 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{backgroundColor: "yellow",}}>
            <TableRow >
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return ( */}
            {messages
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((doc) => {
            return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={doc.code}>
                    {/* {columns.map((column)=>{
                                        const value = row[column.id];
                                        return(
                                            <TableCell key={column.id} align={column.align}>
                                                {column.id && column.id==='image'
                                                }
                                                { column.id && <h1>Messages: {column.id}</h1>}
                                                {column.format && typeof value==='number'
                                                    ? column.format(value):value}
                                            </TableCell>
                                        );
                                    })} */}
                    <TableCell>
                      {<Box
                        component="img"
                        sx={{
                          height: 233,
                          width: 350,
                          maxHeight: { xs: 233, md: 167 },
                          maxWidth: { xs: 350, md: 250 },
                        }}
                        alt="The house from the offer."
                        // src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                        src={doc.image}
                      />}
                    </TableCell>
                    <TableCell>{doc.plate}</TableCell>
                    <TableCell align="right">
                        {/* {new Date(doc.time.seconds * 1000).toISOString("en-US")} */}
                      {doc.time}    
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={messages.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  );
  
}
