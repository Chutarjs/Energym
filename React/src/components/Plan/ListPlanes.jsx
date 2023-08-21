// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CheckIcon from "@mui/icons-material/Check";
import { Link } from "react-router-dom";
import { Info } from "@mui/icons-material";
import { UserContext } from "../../context/UserContext";
import PlanService from "../../services/PlanService";
import UsuarioService from "../../services/UsuarioService";

export function ListPlanes() {
  const [data, setData] = useState(null);
  //Gestión de Usuario
  const { user, decodeToken }=useContext(UserContext)
  const [matriculado, setMatriculado] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    PlanService.getPlanes()
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
    UsuarioService.getUserById(decodeToken(user).id)
    .then((response) => {
      setMatriculado(response.data.results);
      setError(response.error);
      setLoaded(true);
    })
    .catch((error) => {
      if (error instanceof SyntaxError) {
        console.log(error);
        throw new Error("Respuesta no válida del servidor");
      }
    });
  }, [decodeToken, user]);

  return (
    <Grid container sx={{ p: 2 }} spacing={3}>
      {!loaded && <div>Cargando...</div>}
      <Grid container paddingTop={2}>
        <Typography variant="h5" color="text.secondary" textAlign="center">Planes Disponibles:</Typography>
      </Grid>
      {data &&
        data.map((item) => (
          <Grid item xs={3} key={item.idPlan}>
            <Card>
              <CardHeader
                sx={{
                  p: 0,
                  backgroundColor: (theme) => theme.palette.secondary.main,
                  color: (theme) => theme.palette.common.white,
                }}
                style={{ textAlign: "center" }}
                title={item.Nombre}
              />
              <CardContent>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  textAlign="center"
                >
                  {item.Descripcion}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  <LocalOfferIcon /> ₡{item.Precio}
                </Typography>
              </CardContent>
              <CardActions
                disableSpacing
                sx={{
                  backgroundColor: (theme) => theme.palette.action.focus,
                  color: (theme) => theme.palette.common.white,
                }}
              >
                <IconButton
                  component={Link}
                  to={`/planes/${item.idPlan}`}
                  aria-label="Detalle"
                >
                  <Info />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                    ml={1}
                  >
                    Detalles
                  </Typography>
                </IconButton>
                { decodeToken(user).rol.IdTipoUsuario == "1" && (
                  <IconButton
                    component={Link}
                    to={`/planes/matricular/${item.idPlan}`}
                    aria-label="Matricular"
                  >
                    <CheckIcon />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                      ml={1}
                    >
                      Matricular
                    </Typography>
                  </IconButton>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
        <Grid container>
          <Typography variant="h5" color="text.secondary" textAlign="center" paddingTop={3}>Planes Matriculados:</Typography>
        </Grid>
        {!matriculado && <div>No posee planes matriculados</div>}
        {matriculado && matriculado.plan && 
          <Grid item xs={3} key={matriculado.plan.idPlan}>
            <Card>
              <CardHeader
                sx={{
                  p: 0,
                  backgroundColor: (theme) => theme.palette.secondary.main,
                  color: (theme) => theme.palette.common.white,
                }}
                style={{ textAlign: "center" }}
                title={matriculado.plan.Nombre}
              />
              <CardContent>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  textAlign="center"
                >
                  {matriculado.plan.Descripcion}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  <LocalOfferIcon /> ₡{matriculado.plan.Precio}
                </Typography>
              </CardContent>
              <CardActions
                disableSpacing
                sx={{
                  backgroundColor: (theme) => theme.palette.action.focus,
                  color: (theme) => theme.palette.common.white,
                }}
              >
                <IconButton
                  component={Link}
                  to={`/planes/${matriculado.plan.idPlan}`}
                  aria-label="Detalle"
                >
                  <Info />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                    ml={1}
                  >
                    Detalles
                  </Typography>
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        }
    </Grid>
  );
}
