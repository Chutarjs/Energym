// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Link } from "react-router-dom";
import { Info } from "@mui/icons-material";
import PlanService from "../../services/PlanService";

export function Home() {
  const [data, setData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    PlanService.getPlanes()
      .then((response) => {
        console.log(response);
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

  return (
    <Grid container p={1}>
      <Grid item xs={12}>
        <Typography variant="h5" color={"text.primary"} textAlign={"left"} p={2}>Nuestros Planes:</Typography>
      </Grid>
      <Grid container sx={{ p: 2 }} md={9} xs={12} spacing={1}>
        {!loaded && <div>Cargando...</div>}
        {data &&
          data.map((item) => (
            <Grid item xs={6} md={6} p={0} key={item.idPlan}>
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
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>

      <Grid container sx={{ p: 2 }} xs={12} md={3} spacing={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
            <img src="/logo.svg" width={40}></img>
              Nosotros
            </Typography>
            <Typography variant="body1">
              ¡Bienvenido/a a nuestro gimnasio! En Energym, nos enorgullece
              ofrecerte un espacio dedicado a tu bienestar y a alcanzar tus
              objetivos de salud y fitness. Aquí encontrarás un ambiente
              motivador y amigable, diseñado para ayudarte a superar tus límites
              y descubrir tu máximo potencial. Nuestro equipo de entrenadores
              altamente cualificados estará a tu disposición para brindarte el
              apoyo y la guía necesarios en cada etapa de tu viaje fitness. Ya
              sea que estés comenzando tu camino hacia un estilo de vida más
              saludable o que seas un atleta experimentado en busca de nuevos
              desafíos, aquí encontrarás las herramientas y el conocimiento para
              lograr tus metas. Contamos con una amplia variedad de equipos de
              última generación y una gama completa de clases grupales, desde
              entrenamiento funcional hasta yoga y pilates. Nuestras
              instalaciones están diseñadas pensando en tu comodidad y
              seguridad, proporcionando un entorno limpio y ordenado para que
              puedas concentrarte en tu entrenamiento. Además, ofrecemos
              programas de nutrición personalizados para ayudarte a complementar
              tus esfuerzos en el gimnasio y alcanzar una alimentación
              equilibrada. Creemos en el enfoque integral hacia la salud y el
              fitness, y estamos comprometidos a brindarte el apoyo necesario
              para que logres un estilo de vida activo y saludable a largo
              plazo. 
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
