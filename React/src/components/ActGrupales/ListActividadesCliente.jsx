/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EventIcon from "@mui/icons-material/Event";
import ActGrupalesService from "../../services/ActGrupalesService";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import PeopleIcon from "@mui/icons-material/People";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate, useParams } from "react-router-dom";
import UsuarioService from "../../services/UsuarioService";
import { UserContext } from "../../context/UserContext";
import { Button } from "@mui/material";
import { toast } from "react-hot-toast";
import CancelIcon from "@mui/icons-material/Cancel";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Refresh } from "@mui/icons-material";

export function ListActividadesCliente() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [dataMatriculadas, setDataMatriculadas] = useState(null);
  const [dataHistorial, setDataHistorial] = useState(null);
  const [responseData, setResponseData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [showAvailable, setShowAvailable] = useState(false); // Estado para mostrar solo actividades con cupo disponible
  const { user, decodeToken, autorize } = useContext(UserContext);
  const [userData, setUserData] = useState(decodeToken());

  //Actualizar valor de usuario actual
  useEffect(() => {
    setUserData(decodeToken(user));
  }, [decodeToken, user]);

  //actividades grupales
  useEffect(() => {
    ActGrupalesService.getDetalle()
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
  }, []);

  //actividades grupales matriculadas
  useEffect(() => {
    ActGrupalesService.getMatriculadas(userData.id)
      .then((response) => {
        setDataMatriculadas(response.data.results);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, [userData.id]);

  //actividades grupales
  useEffect(() => {
    ActGrupalesService.getHistorial(userData.id)
      .then((response) => {
        setDataHistorial(response.data.results);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, [userData.id]);

  //datos del cliente
  useEffect(() => {
    UsuarioService.getUserById(userData.id)
      .then((response) => {
        setUserData(response.data.results);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, [userData.id]);

  // Obtener la fecha actual en formato yyyy-mm-dd
  const currentDate = new Date().toISOString().split("T")[0];

  const handleMatricular = (objeto) => {
    objeto.idUsuario = userData.id;
    console.log(objeto);
    ActGrupalesService.matricular(objeto)
      .then((response) => {
        setResponseData(response.data);
        setError(response.error);

        if (
          response.data.results == "No se pudo matricular" ||
          response.data.results ==
            "No se pudo matricular, el plan pagado por el cliente no incluye actividades grupales"
        ) {
          toast.error(response.data.results);
        } else {
          toast.success(response.data.results);
        }
        // Recargar la página después de 2 segundos (2000 milisegundos)
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        toast.error(error);
        console.log(error);
      });
  };

  const handleDesmatricular = (objeto) => {
    objeto.idUsuario = userData.id;
    console.log(objeto);
    ActGrupalesService.desmatricular(objeto)
      .then((response) => {
        setResponseData(response.data);
        setError(response.error);
        if (response.data.results == "No se pudo desmatricular") {
          toast.error(response.data.results);
        } else {
          toast.success(response.data.results);
        }
        // Recargar la página después de 2 segundos (2000 milisegundos)
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        toast.error(error);
        console.log(error);
      });
  };

  return (
    <div>
      <Grid container sx={{ p: 2 }} spacing={3}>
        {!loaded && <div>Cargando...</div>}
        <Typography variant="h6" width={1}>
          Actividades Disponibles
        </Typography>
        {data == null && (
          <Typography variant="body1" color="text.secondary" textAlign="center">
            No hay actividades disponibles en este momento.
          </Typography>
        )}
        {data &&
          data
            .filter(
              (item) =>
                showAvailable ||
                (Number(item.Cupo) > Number(item.cantidad_matriculados) &&
                  item.Fecha >= currentDate)
            ) // Filtrar los datos según el estado showAvailable y la fecha de inicio
            .map((item) => (
              <Grid item xs={4} key={item.idActividadGrupal}>
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
                      variant="body1"
                      color="text.secondary"
                      textAlign="center"
                    >
                      <EventIcon />
                      {item.Fecha}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                    >
                      <HourglassTopIcon /> {item.HoraInicio}
                      <HourglassBottomIcon /> {item.HoraFinal}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      textAlign="center"
                    >
                      <PeopleIcon />
                      {" Cupo : " + item.Cupo}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      textAlign="center"
                    >
                      <EmojiPeopleIcon />
                      {" Matriculados : " + item.cantidad_matriculados}
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
                      component={Button}
                      aria-label="Matricular"
                      onClick={() => handleMatricular(item)}
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
                  </CardActions>
                </Card>
              </Grid>
            ))}
      </Grid>

      <Grid container sx={{ p: 2 }} spacing={3}>
        {!loaded && <div>Cargando...</div>}
        <Typography variant="h6" width={1}>
          Actividades Matriculadas
        </Typography>
        {dataMatriculadas == null && (
          <Typography variant="body1" color="text.secondary" textAlign="center">
            No tienes actividades matriculadas actualmente.
          </Typography>
        )}
        {dataMatriculadas &&
          dataMatriculadas.map((item) => (
            <Grid item xs={4} key={item.idActividadGrupal}>
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
                    variant="body1"
                    color="text.secondary"
                    textAlign="center"
                  >
                    <EventIcon />
                    {item.Fecha}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                  >
                    <HourglassTopIcon /> {item.HoraInicio}
                    <HourglassBottomIcon /> {item.HoraFinal}
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
                    component={Button}
                    aria-label="Desmatricular"
                    onClick={() => handleDesmatricular(item)}
                  >
                    <CancelIcon></CancelIcon>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                      ml={1}
                    >
                      Desmatricular
                    </Typography>
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>

      <Grid container sx={{ p: 2 }} spacing={3}>
        {!loaded && <div>Cargando...</div>}
        <Typography variant="h6" width={1}>
          Historial de Actividades Matriculadas
        </Typography>
        {dataHistorial == null && (
          <Typography variant="body1" color="text.secondary" textAlign="center">
            No tienes actividades en tu historial.
          </Typography>
        )}
        {dataHistorial &&
          dataHistorial.map((item) => (
            <Grid item xs={4} key={item.idActividadGrupal}>
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
                    variant="body1"
                    color="text.secondary"
                    textAlign="center"
                  >
                    <EventIcon />
                    {item.Fecha}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                  >
                    <HourglassTopIcon /> {item.HoraInicio}
                    <HourglassBottomIcon /> {item.HoraFinal}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    textAlign="center"
                  >
                    <PeopleIcon />
                    {item.Estado == "1" ? "Matriculada" : "Desmatriculada"}
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
                    component={Button}
                    aria-label="Calificar"
                    
                  >
                    <EditNoteIcon />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                      ml={1}
                    >
                      Calificar
                    </Typography>
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
