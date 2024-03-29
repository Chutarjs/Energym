// eslint-disable-next-line no-unused-vars
import React,{ useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
import { Info } from '@mui/icons-material'
import RutinaService from '../../services/RutinaService'

export function ListRutinas () {
  const [data, setData]=useState(null);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] =useState('');
  const [loaded, setLoaded] =useState(false);

  useEffect(()=>{
    RutinaService.getRutinas()
    .then( response=>{
        setData(response.data.results)
        setError(response.error)
        setLoaded(true)
    })
    .catch(error=>{
      if(error instanceof SyntaxError){
        console.log(error)
        throw new Error("Respuesta no válida del servidor")
      }
    });
  },[]);
  return (
    <Grid container sx={{ p: 2 }} spacing={3}>
      {!loaded && <div>Cargando...</div>}
      {data && data.map((item)=>( 
          <Grid item xs={3} key={item.idrutina}  >
            <Card>
              <CardHeader
                sx={{
                  p: 0,
                  backgroundColor: (theme) => theme.palette.secondary.main,
                  color: (theme) => theme.palette.common.white
                }}
                style={{ textAlign: 'center' }}
                title={item.Nombre}
              />
              <CardContent>
                <Typography variant='body1' color='text.secondary' textAlign='center'>
                  {"Id de la Rutina: "+item.idrutina}
                </Typography>
                <Typography variant='body1' color='text.secondary' textAlign='center'>
                  {item.Descripcion}
                </Typography>
              </CardContent>
              <CardActions
                disableSpacing
                sx={{
                  backgroundColor: (theme) => theme.palette.action.focus,
                  color: (theme) => theme.palette.common.white
                }}
              >
                <IconButton component={Link} to={`/rutina/${item.idrutina}`} aria-label='Detalle'>
                  <Info/> 
                  <Typography variant='body2' color='text.secondary' textAlign='center' ml={1}>
                     Detalles 
                  </Typography>
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
      ))}   
    </Grid>
  )
}
