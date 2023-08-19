// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { toast } from "react-hot-toast";
import PagoService from "../../services/PagoService";

export function Pagar() {
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [esPagar, setEsPagar] = useState(false);
  const routeParams = useParams();

  useEffect(() => {
    PagoService.getPagoById(routeParams.id)
      .then((response) => {
        console.log(response.data.results);
        setData(response.data.results);
        setLoaded(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, [routeParams.id]);

  //pagar
  const handlePay = () => {
    setEsPagar(true);
  };
  //use effect de pagar
  useEffect(() => {
    if (esPagar) {
        console.log(data);
      PagoService.update(data[0])
        .then((response) => {
          console.log(response.data.results);
          setData(response.data.results);
          setLoaded(true);
          toast.success("Pago realizado con exito");
        })
        .catch((error) => {
          if (error instanceof SyntaxError) {
            console.log(error);
            toast.error("Algo salio mal...");
            throw new Error("Respuesta no válida del servidor");
          }
        });
    }
  }, [data, esPagar]);

  return (
    <>
      {!loaded && <div>Cargando...</div>}
      {data && (
        <div>
          <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
              {"Pago: " + data[0].idPago}
            </Typography>
            <Typography variant="subtitle1" component="h1" gutterBottom>
              {"Cliente: " + data[0].idCliente}
            </Typography>
            <Typography variant="subtitle1" component="h1" gutterBottom>
              {"Plan pagado: " + data[0].idPlan}
            </Typography>
            <Typography variant="body1">
              <Box fontWeight="bold" display="inline">
                Fecha y hora:
              </Box>{" "}
              {data[0].Fecha}
            </Typography>
            <Typography variant="body1">
              <Box fontWeight="bold" display="inline">
                Subtotal:
              </Box>{" "}
              {data[0].Subtotal}
            </Typography>
            <Typography variant="body1">
              <Box fontWeight="bold" display="inline">
                Impuesto:
              </Box>{" "}
              {data[0].Impuesto}
            </Typography>
            <Typography variant="body1">
              <Box fontWeight="bold" display="inline">
                Extras:
              </Box>{" "}
              {data[0].Extras}
            </Typography>
            <Typography variant="body1">
              <Box fontWeight="bold" display="inline">
                Total:
              </Box>{" "}
              {data[0].Total}
            </Typography>
            <Typography variant="body1">
              <Box fontWeight="bold" display="inline">
                Estado:
              </Box>{" "}
              {data[0].Estado == "0" ? "Sin Pagar" : "Cancelado"}
            </Typography>
            {data[0].Estado == "0" && (
              <Button variant="contained" color="primary" onClick={handlePay}>
                Pagar
              </Button>
            )}
          </Container>
        </div>
      )}
    </>
  );
}
