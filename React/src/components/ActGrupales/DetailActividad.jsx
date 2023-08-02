// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ActGrupalesService from '../../services/ActGrupalesService';

export function DetailActividad() {
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const routeParams = useParams();

  useEffect(() => {
    ActGrupalesService.getDetalleByID(routeParams.id)
      .then((response) => {
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
              {"Actividad Grupal: " + data.Nombre}
            </Typography>
            <Typography variant="subtitle1" component="h1" gutterBottom>
              {"Descripcion: " + data.Descripcion}
            </Typography>
            <Typography variant="body1">
              <Box fontWeight="bold" display="inline">
                Fecha:
              </Box>{' '}
              {data.Fecha}
            </Typography>
            <Typography variant="body1">
              <Box fontWeight="bold" display="inline">
                Hora de inicio:
              </Box>{' '}
              {data.HoraInicio}
            </Typography>
            <Typography variant="body1">
              <Box fontWeight="bold" display="inline">
                Hora de finalización:
              </Box>{' '}
              {data.HoraFinal}
            </Typography>
            <Typography variant="body1">
              <Box fontWeight="bold" display="inline">
                Cupo:
              </Box>{' '}
              {data.Cupo}
            </Typography>
            <Typography variant="body1">
              <Box fontWeight="bold" display="inline">
                Cantidad de matriculados:
              </Box>{' '}
              {data.cantidad_matriculados}
            </Typography>

            <Typography variant='body1'>
              <Box fontWeight='bold'>Matriculados:</Box>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {data.matriculados.map((item)=>(  
                  <ListItemButton key={item.idUsuario}>
                  <ListItemIcon>
                    <ArrowRightIcon />
                  </ListItemIcon> 
                  <ListItemText primary={item.NombreUsuario + " " + item.Apellido} />
                </ListItemButton>
                ))}
              </List>
            </Typography>
          </Container>
        </div>
      )}
    </>
  );
}
