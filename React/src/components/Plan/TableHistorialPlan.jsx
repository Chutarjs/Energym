import React,{ useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { visuallyHidden } from '@mui/utils'
import PlanService from '../../services/PlanService'

function descendingComparator (a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator (order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort (array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}
//--- Encabezados de la tabla ---
const headCells = [
  {
    id: 'idHistorial',
    numeric: false,
    disablePadding: false,
    label: 'Id Historial'
  },
  {
    id: 'idPlan',
    numeric: false,
    disablePadding: false,
    label: 'Id Plan'
  },
  {
    id: 'idCliente',
    numeric: false,
    disablePadding: false,
    label: 'Id Cliente'
  },
  {
    id: 'nombre',
    numeric: false,
    disablePadding: true,
    label: 'Nombre Cliente'
  },
  {
    id: 'descripcion',
    numeric: false,
    disablePadding: true,
    label: 'Descripcion'
  },
]

//Construcción del Header de la tabla con sus propiedades
function TableHistorialPlanesHead (props) {
  const {
    order,
    orderBy,
    onRequestSort
  } = props

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id
                ? (
                  <Box component='span' sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                  )
                : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
// PropTypes es un verificador de tipos
TableHistorialPlanesHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}

export default function TableHistorialPlan () {
  //Datos a cargar en la tabla
  const [data, setData]=useState(null);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] =useState('');
  const [loaded, setLoaded] =useState(false);
  useEffect(()=>{
    PlanService.getHistorialPlanes()
    .then( response=>{
        setData(response.data.results)
        setError(response.error)
        setLoaded(true)
    })
    .catch(error=>{
      if(error instanceof SyntaxError){
        console.log(error)
        throw new Error("Respuesta no válida del servidor")
      }
    });
  },[]);
  //Ordenamiento
  const [order, setOrder] = React.useState('asc')
  //Criterio de ordenamiento
  const [orderBy, setOrderBy] = React.useState('year')
  const [selected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  //Cantidad de registros por pagina
  const [rowsPerPage, setRowsPerPage] = React.useState(12)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = (event) => {
    setDense(event.target.checked)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty data.
  const emptydata =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0

  return (
    <>
      {!loaded && <div>Loading</div>}
      {data && data.length > 0 &&
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby='tableTitle'
                size={dense ? 'small' : 'medium'}
              >
                <TableHistorialPlanesHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={data.length}
                />
                <TableBody>
                  {stableSort(data, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const isItemSelected = isSelected(row.idPlan)

                      return (
                        <TableRow
                          hover
                          role='checkbox'
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.idHistorial}
                          selected={isItemSelected}
                        >
                          <TableCell align='left'>{row.idHistorial}</TableCell>
                          <TableCell align='left'>{row.idPlan}</TableCell>
                          <TableCell align='left'>{row.idCliente}</TableCell>
                          <TableCell align='left'>{row.Nombre + " " + row.Apellidos}</TableCell>
                          <TableCell align='left'>{row.Descripcion}</TableCell>
                        </TableRow>
                      )
                    })}
                  {emptydata > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptydata
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
    {/* Paginacion */}
            <TablePagination
              rowsPerPageOptions={[3, 6, 12]}
              component='div'
              count={data.length}
              rowsPerPage={rowsPerPage}             
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage='Filas por página'
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count} página(s)`}
            />
    {/* Paginacion */}
          </Paper>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label='Espaciado'
          />
        </Box>}
    </>
  )
}
