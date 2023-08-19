import React, { useEffect, useState, useContext } from "react";
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
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import AddIcon from "@mui/icons-material/Add";
import { visuallyHidden } from "@mui/utils";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import PagoService from "../../services/PagoService";
import { Info, Payment } from "@mui/icons-material";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

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

//--- Encabezados de la tabla ---
const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "Id Pago",
  },
  {
    id: "idCliente",
    numeric: false,
    disablePadding: true,
    label: "Cliente",
  },
  {
    id: "plan",
    numeric: false,
    disablePadding: true,
    label: "Plan",
  },
  {
    id: "subtotal",
    numeric: false,
    disablePadding: true,
    label: "Subtotal",
  },
  {
    id: "impuesto",
    numeric: false,
    disablePadding: false,
    label: "Impuesto",
  },
  {
    id: "extras",
    numeric: false,
    disablePadding: false,
    label: "Extras",
  },
  {
    id: "total",
    numeric: false,
    disablePadding: false,
    label: "Total",
  },
  {
    id: "estado",
    numeric: false,
    disablePadding: false,
    label: "Estado",
  },
];
//Construcción del Header de la tabla con sus propiedades
function TablePagoHead(props) {
  const {
    // onSelectAllClick,
    order,
    orderBy,
    // numSelected,
    // rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Tooltip title="Nuevo">
            <IconButton component={Link} to="/Pago/create">
              <AddIcon />
            </IconButton>
          </Tooltip>
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
// PropTypes es un verificador de tipos
TablePagoHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  /*  onSelectAllClick: PropTypes.func.isRequired, */
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

//Menú de opciones que aparecer al seleccionar una fila
function TablePagoToolbar(props) {
  const navigate = useNavigate();
  const { numSelected } = props;
  const { idSelected } = props;
  
  //update actualizando el estado
  const pagar = () => {
    return navigate(`/Pagar/${idSelected}`);
  };

  const detail = () => {
    return navigate(`/Pago/${idSelected}`);
  };
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
          {numSelected} seleccionada
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Pago
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
          <Tooltip title="Info">
            <IconButton onClick={detail}>
              <Info />
            </IconButton>
          </Tooltip>
          <Tooltip title="Pagar">
            <IconButton onClick={pagar}>
              <Payment key={idSelected} />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Filtrar">
          <IconButton></IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
//Propiedades del Menú de opciones
TablePagoToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  idSelected: PropTypes.number.isRequired,
};

export default function TablePago() {
  //id a actualizar
  const { user, decodeToken } = useContext(UserContext);
  //Datos a cargar en la tabla
  const [data, setData] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (
      decodeToken(user).rol.IdTipoUsuario == "2" ||
      decodeToken(user).rol.IdTipoUsuario == "3"
    ) {
      PagoService.getPagos()
        .then((response) => {
          setData(response.data.results);
          setError(response.error);
          setLoaded(true);
        })
        .catch((error) => {
          if (error instanceof SyntaxError) {
            console.log(error);
            throw new Error("Respuesta no válida del servidor");
          }
        });
    } else {
      PagoService.getPagosCliente(decodeToken(user).id)
        .then((response) => {
          setData(response.data.results);
          setError(response.error);
          setLoaded(true);
        })
        .catch((error) => {
          if (error instanceof SyntaxError) {
            console.log(error);
            throw new Error("Respuesta no válida del servidor");
          }
        });
    }
  }, [decodeToken, user]);

  //Ordenamiento
  const [order, setOrder] = React.useState("asc");
  //Criterio de ordenamiento
  const [orderBy, setOrderBy] = React.useState("year");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  //Cantidad de registros por pagina
  const [rowsPerPage, setRowsPerPage] = React.useState(12);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, idPlan) => {
    const selectedIndex = selected.indexOf(idPlan);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, idPlan);
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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty data.
  const emptydata =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <>
      {!loaded && <div>Loading</div>}
      {data && data.length > 0 && (
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TablePagoToolbar
              numSelected={selected.length}
              idSelected={Number(selected[0]) || 0}
            />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <TablePagoHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={data.length}
                />
                <TableBody>
                  {stableSort(data, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.idPago);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.idPago)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.idPago}
                          selected={isItemSelected}
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
                            {row.idPago}
                          </TableCell>
                          <TableCell align="left">{row.idCliente}</TableCell>
                          <TableCell align="left">{row.idPlan}</TableCell>
                          <TableCell align="left">₡{row.Subtotal}</TableCell>
                          <TableCell align="left">₡{row.Impuesto}</TableCell>
                          <TableCell align="left">₡{row.Extras}</TableCell>
                          <TableCell align="left">₡{row.Total}</TableCell>
                          <TableCell align="left">
                            {row.Estado == "0" ? "Pendiente" : "Pagado"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptydata > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptydata,
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
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Filas por página"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} de ${count} página(s)`
              }
            />
            {/* Paginacion */}
          </Paper>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Espaciado"
          />
        </Box>
      )}
    </>
  );
}
