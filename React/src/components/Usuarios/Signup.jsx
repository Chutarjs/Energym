/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import UsuarioService from '../../services/UsuarioService'

export function Signup () {
  const navigate = useNavigate()
  // Esquema de validación
  const loginSchema = yup.object({
    email: yup.string()
      .required('El email es requerido')
      .email('Formato email'),
    password: yup.string()
      .required('El password es requerido')
  })
  const { control, handleSubmit, setValue, formState: { errors } } =
  useForm({
    // Valores iniciales
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rol_id: ''
    },
    // Asignación de validaciones
    resolver: yupResolver(loginSchema)
  })

  // Valores de formulario
  const [formData, setData] = useState(null)
  // Booleano para establecer si se envia la informacion al API
  const [start, setStart] = useState(false)
  //Respuesta del API
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');
  const notify = () => toast.success('Usuario registrado', {
    duration: 4000,
    position: 'top-center'
  })
 // Accion submit
  const onSubmit = (DataForm) => {
    try {
    
      // Valor por defecto para rol
      setValue('rol_id',2)
      // // Establecer valores del formulario
       setData(DataForm)
       
       setStart(true)
      
    } catch (e) {
      // handle your error
    }
  }
  
  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e)
  useEffect(()=>{
    if(start){
      UserService.createUser(formData)
      .then(response=>{
        setResponseData(response.data.results)
        setError(response.error)
      }).
      catch(error=>{
        if(error instanceof SyntaxError){
          console.log(error)
          throw new Error('Respuesta no válida del servidor')
        }
      })
      if(responseData !== null){
        notify()
        return navigate('/user/login')
      }
    } 
        
  },[formData, responseData, start])
  
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant='h5' gutterBottom>
              Registrar Usuario
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='name'
                    label='Nombre'
                    error={Boolean(errors.name)}
                    helperText={errors.name ? errors.name.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='email'
                    label='Email'
                    error={Boolean(errors.email)}
                    helperText={errors.email ? errors.email.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='password'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='password'
                    label='Password'
                    type='password'
                    error={Boolean(errors.password)}
                    helperText={errors.password ? errors.password.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button type='submit' variant='contained' color='secondary' sx={{ m: 1 }}>Login</Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}
