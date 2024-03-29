// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PagoService from '../../services/PagoService';

export function DetailPago() {
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);

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
          throw new Error('Respuesta no válida del servidor');
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
              </Box>{' '}
              {data[0].Fecha}
            </Typography>
            <Typography variant="body1">
              <Box fontWeight="bold" display="inline">
                Subtotal:
              </Box>{' '}
              {data[0].Subtotal}
            </Typography>
            <Typography variant="body1">
              <Box fontWeight="bold" display="inline">
                Impuesto:
              </Box>{' '}
              {data[0].Impuesto}
            </Typography>
            <Typography variant="body1">
              <Box fontWeight="bold" display="inline">
                Extras:
              </Box>{' '}
              {data[0].Extras}
            </Typography>
            <Typography variant="body1">
              <Box fontWeight="bold" display="inline">
                Total:
              </Box>{' '}
              {data[0].Total}
            </Typography>
            <Typography variant="body1">
              <Box fontWeight="bold" display="inline">
                Estado:
              </Box>{' '}
              {data[0].Estado == "0"? "Sin Pagar": "Cancelado"}
            </Typography>
          </Container>
        </div>
      )}
    </>
  );
}
