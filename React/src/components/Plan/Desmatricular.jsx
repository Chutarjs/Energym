/* eslint-disable no-unused-vars */
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import PlanService from "../../services/PlanService";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { toast } from "react-hot-toast";

export function Desmatricular() {
  const [data, setData] = useState(null);
  //usuario
  const { user, decodeToken } = useContext(UserContext);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [desmatricular, setDesmatricular] = useState(false);

  const routeParams = useParams();
  
  //matricular
  const handleDesmatricular = () => {
    setDesmatricular(true);
  };

  useEffect(() => {
    if(desmatricular){
      data.id = decodeToken(user).id;
      console.log(data);
        PlanService.desmatricular(data)
          .then((response) => {
            console.log(response);
            toast.success(response.data.results);
            setError(response.error);
          })
          .catch((error) => {
            if (error instanceof SyntaxError) {
              console.log(error);
              throw new Error("Respuesta no válida del servidor");
            }
          });
    }
  })

  useEffect(() => {
    PlanService.getPlanById(routeParams.id)
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
  }, [routeParams.id]);

  return (
    <>
      {!loaded && <div>Cargando...</div>}
      {data && (
        <div>
          <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
              {data.Nombre}
            </Typography>
            <Typography variant="subtitle1" component="h1" gutterBottom>
              {"Descripcion: " + data.Descripcion}
            </Typography>
            <Typography variant="body1">
              <Box fontWeight="bold" display="inline">
                Precio:
              </Box>{" "}
              ₡{data.Precio}
            </Typography>
            <Typography variant="body1">
              <Box fontWeight="bold">Servicios:</Box>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {data.servicios.map((item) => (
                  <ListItemButton key={item.idServicio}>
                    <ListItemIcon>
                      <ArrowRightIcon />
                    </ListItemIcon>
                    <ListItemText primary={item.Nombre} />
                  </ListItemButton>
                ))}
              </List>
            </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDesmatricular}
              >
                Desmatricular
              </Button>
          </Container>
        </div>
      )}
    </>
  );
}
