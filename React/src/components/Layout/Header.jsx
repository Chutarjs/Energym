import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
// eslint-disable-next-line no-unused-vars
import { Button, MenuList } from "@mui/material";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { UserContext } from "../../context/UserContext";
import { useState, useContext, useEffect } from "react";

function Header() {
  //Gestión de Usuario
  const { user, decodeToken, autorize } = useContext(UserContext);
  const [userData, setUserData] = useState(decodeToken());

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElMant, setAnchorElMant] = React.useState(null);

  //Actualizar valor de usuario actual
  useEffect(() => {
    setUserData(decodeToken(user));
  }, [decodeToken, user]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenMantMenu = (event) => {
    setAnchorElMant(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseMantMenu = () => {
    setAnchorElMant(null);
  };
  const isAuthorizedUser = () => {
    // Administrador o Empleado
    return (
      decodeToken(user) &&
      autorize({ allowedRoles: ["Administrador", "Empleado"] }) // Adjust roles as needed
    );
  };
  const isCliente = () => {
    // Si el usuario es cliente devuelve un true
    return (
      decodeToken(user) && autorize({ allowedRoles: ["Cliente"] }) // Adjust roles as needed
    );
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "primary.main",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SportsGymnasticsIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 5,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Energym
          </Typography>

          <SportsGymnasticsIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />

          <Typography
            variant="p"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 5,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 500,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Energym
          </Typography>

          <Typography
            variant="p"
            noWrap
            component="a"
            href="/planes/"
            sx={{
              mr: 5,
              display: { xs: "flex" },
              fontFamily: "monospace",
              fontWeight: 500,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Planes
          </Typography>
          <Typography
            variant="p"
            noWrap
            component="a"
            href="/rutinas/"
            sx={{
              mr: 5,
              display: { xs: "flex" },
              fontFamily: "monospace",
              fontWeight: 500,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Rutinas
          </Typography>
          {isAuthorizedUser() && (
            <Typography
              variant="p"
              noWrap
              component="a"
              href="/actividades/"
              sx={{
                mr: 0,
                display: { xs: "flex" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 500,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Act. Grupales
            </Typography>
          )}
          {isCliente() && (
            <Typography
              variant="p"
              noWrap
              component="a"
              href="/actividadesGrupales/"
              sx={{
                mr: 0,
                display: { xs: "flex" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 500,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Act. Grupales
            </Typography>
          )}
          {/* Menu Mantenimientos */}
          <Box sx={{ flexGrow: 0 }}>
            {isAuthorizedUser() && (
              <Tooltip title="Mantenimientos">
                <IconButton onClick={handleOpenMantMenu} sx={{ p: 1 }}>
                  <FitnessCenterIcon style={{ fill: "white" }} />
                </IconButton>
              </Tooltip>
            )}
            {isAuthorizedUser() && (
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElMant}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElMant)}
                onClose={handleCloseMantMenu}
              >
                {isAuthorizedUser() && (
                  <MenuList>
                    <MenuItem component="a" href="/plan-table/">
                      <Typography textAlign="center">Planes</Typography>
                    </MenuItem>
                    <MenuItem component="a" href="/planes/historial">
                      <Typography textAlign="center">Historial Planes</Typography>
                    </MenuItem>
                    <MenuItem component="a" href="/rutina-table/">
                      <Typography textAlign="center">Rutinas</Typography>
                    </MenuItem>
                    <MenuItem component="a" href="/actividad-table/">
                      <Typography textAlign="center">Actividades Grupales</Typography>
                    </MenuItem>
                    <MenuItem component="a" href="/grafico-actividades/">
                      <Typography textAlign="center">Grafico Actividades Grupales</Typography>
                    </MenuItem>
                    <MenuItem component="a" href="/ejercicio-table/">
                      <Typography textAlign="center">Ejercicios</Typography>
                    </MenuItem>
                    <MenuItem component="a" href="/servicio-table/">
                      <Typography textAlign="center">Servicios</Typography>
                    </MenuItem>
                    <MenuItem component="a" href="/usuario-table/">
                      <Typography textAlign="center">Usuarios</Typography>
                    </MenuItem>
                    <MenuItem component="a" href="/table-pago/">
                      <Typography textAlign="center">Pagos</Typography>
                    </MenuItem>
                  </MenuList>
                )}
              </Menu>
            )}
          </Box>
          {/* Menu Mantenimientos */}

          {/* Menu Usuarios */}
          <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
            <Tooltip title="Usuario">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon style={{ fill: "white" }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!userData && (
                <MenuList>
                  <MenuItem component="a" href="/user/login">
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                  <MenuItem component="a" href="/user/create">
                    <Typography textAlign="center">Registrarse</Typography>
                  </MenuItem>
                </MenuList>
              )}
              {userData && (
                <MenuList>
                  <MenuItem component="a" href={`/user/detail/${userData?.id}`}>
                    <Typography variant="subtitle1" gutterBottom>
                      {userData?.email}
                    </Typography>
                  </MenuItem>
                  <MenuItem color="secondary" component="a" href="/user/logout">
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                  {isCliente() && (
                    <MenuItem component="a" href="/table-pago">
                      <Typography textAlign="center">Pagos</Typography>
                    </MenuItem>
                  )}
                </MenuList>
              )}
            </Menu>
          </Box>

          {/* Menu Usuarios */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
