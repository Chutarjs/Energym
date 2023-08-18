import * as React from 'react'
import { useState, useContext } from 'react'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { toast } from 'react-hot-toast'
import UsuarioService from '../../services/UsuarioService'

export function Login () {
  const navigate = useNavigate()
  const {saveUser}=useContext(UserContext)
  // Esquema de validación
  const loginSchema = yup.object({
    Email: yup.string()
      .required('El email es requerido')
      .email('Formato email'),
    Password: yup.string()
      .required('El password es requerido')
  })
  const { control, handleSubmit, formState: { errors } } =
  useForm({
    // Valores iniciales
    defaultValues: {
      Email: '',
      Password: ''
    },
    // Asignación de validaciones
    resolver: yupResolver(loginSchema)
  })

  // Valores de formulario
  //Respuesta del API
  const [responseData, setResponseData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');
  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      UsuarioService.login(DataForm)
        .then(response => {
          setResponseData(response.data.results);
          setError(response.error);
        })
        .catch(error => {
          if (error.response && error.response.status === 400) {
            toast.error("Credenciales incorrectas");
          } else {
            toast.error("Error en la solicitud. Por favor, intenta nuevamente.");
          }
        });
        //Respuesta del API
    } catch (e) {
      // handle your error
      toast.error("Error, verifique que la contraseña y correo sean correctos");
      console.log(e);
    }
  }
  //Registrar usuario
  React.useEffect(()=>{
    if(responseData!=null && responseData!='undefined' && responseData!='Usuario no valido'){
      //Guardar Token
      saveUser(responseData)
      toast.success("Bienvenido")
      return navigate('/')
    }else{
      if(responseData=='undefined' || responseData=='Usuario no valido'){
        toast.error("Usuario NO válido");
      }
    }
  },[navigate, responseData, saveUser])
  
  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e)
  
  return (
    <>
      
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant='h5' gutterBottom>
              Login
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='Email'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='Email'
                    label='Email'
                    error={Boolean(errors.Email)}
                    helperText={errors.Email ? errors.Email.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='Password'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='Password'
                    label='Password'
                    type='Password'
                    error={Boolean(errors.Password)}
                    helperText={errors.Password ? errors.Password.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button type='submit' variant='contained' color='secondary' sx={{ m: 1 }}>Iniciar Sesion</Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}
