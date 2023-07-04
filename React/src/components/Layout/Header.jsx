import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
// eslint-disable-next-line no-unused-vars
import { Button, MenuList } from "@mui/material";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElMant, setAnchorElMant] = React.useState(null);

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
              mr: 2,
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
          
          <Typography
            variant="p"
            noWrap
            component="a"
            href="/planes/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 500,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Planes
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
              mr: 2,
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
              mr: 2,
              display: { xs: "flex", mr: "1"},
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 500,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Planes
          </Typography>
          
          {/* Menu Mantenimientos */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Informacion">
              <IconButton onClick={handleOpenMantMenu} sx={{ p: 1 }}>
                <FitnessCenterIcon style={{ fill: "white" }} />
              </IconButton>
            </Tooltip>
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
              <MenuList>
                <MenuItem component="a" href="/plan-table/">
                  <Typography textAlign="center">Planes</Typography>
                </MenuItem>
                <MenuItem component="a" href="/rutina-table/">
                  <Typography textAlign="center">Rutinas</Typography>
                </MenuItem>
                <MenuItem component="a" href="/ejercicio-table/">
                  <Typography textAlign="center">Ejercicios</Typography>
                </MenuItem>
              </MenuList>
            </Menu>
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
              <MenuList>
                <MenuItem component="a" href="/user/login">
                  <Typography textAlign="center">Iniciar Sesion</Typography>
                </MenuItem>
                <MenuItem component="a" href="/user/create">
                  <Typography textAlign="center">Registrarse</Typography>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>

          {/* Menu Usuarios */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;