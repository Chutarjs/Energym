/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UsuarioService from "../../services/UsuarioService";
import { MenuItem } from "@mui/material";

export function Signup() {
  const navigate = useNavigate();
  // Esquema de validación
  const loginSchema = yup.object({
    id: yup
      .number()
      .required("El id es necesario")
      .min(9, "Se requieren como mínimo 9 dígitos"),
    Nombre: yup.string().required("El nombre es requerido"),
    Apellidos: yup.string().required("Los apellidos son requeridos"),
    Email: yup
      .string()
      .required("El email es requerido")
      .email("Formato de email inválido"),
    Password: yup.string().required("El password es requerido"),
    Genero: yup
      .string()
      .oneOf(
        ["0", "1"],
        'El género debe ser "0" para masculino o "1" para femenino'
      )
      .required("El género es requerido"),
    Nacimiento: yup
      .date()
      .typeError("La fecha de nacimiento es requerida")
      .required("La fecha de nacimiento es requerida"),
    Telefono: yup
      .string()
      .required("El teléfono es requerido")
      .matches(/^[0-9]+$/, "El teléfono solo debe contener números"),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    // Valores iniciales
    defaultValues: {
      id: "", // You can set the desired initial value for the id field
      Nombre: "", // You can set the desired initial value for the Nombre field
      Apellidos: "", // You can set the desired initial value for the Apellidos field
      Email: "", // You can set the desired initial value for the Email field
      Password: "", // You can set the desired initial value for the Password field
      Genero: "0", // You can set the desired initial value for the Genero field (0 or 1 as a string)
      Nacimiento: null, // You can set the desired initial value for the Nacimiento field (a Date object or null)
      Telefono: "", // You can set the desired initial value for the Telefono field
    },
    // Asignación de validaciones
    resolver: yupResolver(loginSchema),
  });

  // Valores de formulario
  const [formData, setData] = useState(null);
  // Booleano para establecer si se envia la informacion al API
  const [start, setStart] = useState(false);
  //Respuesta del API
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");
  const notify = () =>
    toast.success("Usuario registrado", {
      duration: 4000,
      position: "top-center",
    });
  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      // Establecer valores del formulario
      setData(DataForm);
      setStart(true);
    } catch (e) {
      // handle your error
    }
  };

  useEffect(() => {
    if (start) {

      UsuarioService.create(formData)
        .then((response) => {
          setResponseData(response.data.results);
          setError(response.error);
        })
        .catch((error) => {
          if (error instanceof SyntaxError) {
            console.log(error);
            throw new Error("Respuesta no válida del servidor");
          }
        });
      if (responseData !== null) {
        notify();
        return navigate("/user/login");
      }
    }
  }, [formData, navigate, responseData, start]);
  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5" gutterBottom>
              Registrar Usuario
            </Typography>
          </Grid>

          {/* id */}
          <Grid item xs={12} sm={12}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="id"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="id"
                    label="ID"
                    error={Boolean(errors.id)}
                    helperText={errors.id ? errors.id.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={6}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="Nombre"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="Nombre"
                    label="Nombre"
                    error={Boolean(errors.Nombre)}
                    helperText={errors.Nombre ? errors.Nombre.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>

          {/* Apellidos */}
          <Grid item xs={12} sm={6}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="Apellidos"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="Apellidos"
                    label="Apellidos"
                    error={Boolean(errors.Apellidos)}
                    helperText={
                      errors.Apellidos ? errors.Apellidos.message : " "
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="Genero"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="Genero"
                    label="Género"
                    select
                    error={Boolean(errors.Genero)}
                    helperText={errors.Genero ? errors.Genero.message : " "}
                  >
                    <MenuItem value="0">Masculino</MenuItem>
                    <MenuItem value="1">Femenino</MenuItem>
                  </TextField>
                )}
              />
            </FormControl>
          </Grid>

          {/* Nacimiento */}
          <Grid item xs={12} sm={6}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="Nacimiento"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="Nacimiento"
                    label="Fecha de Nacimiento"
                    type="date"
                    error={Boolean(errors.Nacimiento)}
                    helperText={
                      errors.Nacimiento ? errors.Nacimiento.message : " "
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>

          {/* Telefono */}
          <Grid item xs={12} sm={12}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="Telefono"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="Telefono"
                    label="Teléfono"
                    error={Boolean(errors.Telefono)}
                    helperText={errors.Telefono ? errors.Telefono.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="Email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="Email"
                    label="Email"
                    error={Boolean(errors.Email)}
                    helperText={errors.Email ? errors.Email.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="Password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="Password"
                    label="Password"
                    type="password"
                    error={Boolean(errors.Password)}
                    helperText={errors.Password ? errors.Password.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ m: 1 }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
