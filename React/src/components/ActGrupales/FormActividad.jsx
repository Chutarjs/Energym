// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { isAfter } from "date-fns";
import ActGrupalesService from "../../services/ActGrupalesService";

export function FormActividad() {
  const navigate = useNavigate();
  const routeParams = useParams();
  // Id de la pelicula a actualizar
  const id = routeParams.id || null;
  const esCrear = !id;
  // Valores a precarga al actualizar
  const [values, setValues] = useState(null);
  // Esquema de validación
  const servicioSchema = yup.object({
    Nombre: yup
      .string()
      .required("El nombre es requerido")
      .min(3, "El nombre debe tener al menos 3 caracteres"),
    Descripcion: yup.string().required("La descripcion es requerida"),
    Fecha: yup
    .date()
    .required("La fecha es requerida")
    .test("is-future-date", "La fecha debe ser mayor a hoy", function (value) {
      return isAfter(value, new Date());
    }),
    HoraInicio: yup
    .string()
    .required("La hora de inicio es requerida")
    .test('hora-inicio-menor', 'La hora de inicio debe ser menor que la hora final', function(value) {
      const { HoraFinal } = this.parent; // Obtenemos el valor de HoraFinal del objeto actual

      if (!value || !HoraFinal) {
        // Si uno de los campos está vacío, no hay suficiente información para comparar, así que consideramos la validación como correcta
        return true;
      }

      // Convertimos las horas en objetos Date para poder compararlas
      const horaInicioDate = new Date(`1970-01-01T${value}`);
      const horaFinalDate = new Date(`1970-01-01T${HoraFinal}`);

      return horaInicioDate < horaFinalDate;
    }),

  HoraFinal: yup
    .string()
    .required("La hora final es requerida"),
  Cupo: yup
      .number()
      .integer()
      .min(1, "El cupo debe ser al menos 1")
      .required("El cupo es requerido"),
  });
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Nombre: "",
      Descripcion: "",
      Fecha: "",
      HoraInicio: "",
      HoraFinal: "",
      Cupo: 0,
    },
    values,

    resolver: yupResolver(servicioSchema),
  });

  // Valores de formulario que llena el usuario
  const [formData, setFormData] = useState(null);
  //Respuesta de crear o modificar
  // eslint-disable-next-line no-unused-vars
  const [responseData, setResponseData] = useState(null);
  // Accion: post, put
  const [action, setAction] = useState("POST");
  // Booleano para establecer si se envió la informacion al API
  const [start, setStart] = useState(false);
  // Obtener la informacion de la pelicula a actualizar
  const [data, setData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");

  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      // Establecer valores del formulario
      setFormData(DataForm);
      // Indicar que se puede realizar la solicitud al API
      setStart(true);
      // Establecer el tipo de métod HTTP
      if (esCrear) {
        setAction("POST");
      } else {
        setAction("PUT");
      }
    } catch (e) {
      //Capturar error
    }
  };

  //Llamar al API para ejecutar Crear o modificar
  useEffect(() => {
    if (start) {
      if (esCrear) {
        // Crear ejercicio
        console.log(formData);
        ActGrupalesService.createActividad(formData)
          .then((response) => {
            setResponseData(response.data);
            setError(response.error);

            //con exito
            toast.success("La actividad se creó correctamente");
            navigate("/actividad-table");
          })
          .catch((error) => {
            if (error instanceof SyntaxError) {
              console.log(error);
              toast.error("Oh no! Algo salio mal!  :" + error.message);
              throw new Error("Respuesta no válida del servidor");
            }
          });
      } else {
        // Modificar ejercicio
        console.log(formData);
        ActGrupalesService.updateActividad(formData)
          .then((response) => {
            setResponseData(response.data.results);
            setError(response.error);

            //con exito
            toast.success("La actividad se actualizó correctamente");
            navigate("/actividad-table");
          })
          .catch((error) => {
            if (error instanceof SyntaxError) {
              console.log(error);
              toast.error("Oh no! Algo salio mal!  :" + error.message);
              throw new Error("Respuesta no válida del servidor");
            }
          });
      }
    }
  }, [start, esCrear, formData, navigate]);
  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);

  //Obtener servicio form
  useEffect(() => {
    if (id != undefined && !isNaN(Number(id))) {
      ActGrupalesService.getActividadFormById(id)
        .then((response) => {
          console.log(response);
          setData(response.data.results[0]);
          setError(response.error);
        })
        .catch((error) => {
          if (error instanceof SyntaxError) {
            console.log(error);
            throw new Error("Respuesta no válida del servidor");
          }
        });
    }
  }, [id]);

  // Si es modificar establece los valores a precargar en el formulario
  useEffect(() => {
    if (!esCrear && data) {
      // Si es modificar establece los valores a precargar en el formulario
      setValues(data);
    }
  }, [data, esCrear, action]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5" gutterBottom>
              {esCrear ? "Crear" : "Modificar"} Actividad
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="Descripcion"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="Descripcion"
                    label="Descripcion"
                    error={Boolean(errors.Descripcion)}
                    helperText={
                      errors.Descripcion ? errors.Descripcion.message : " "
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="Fecha"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="Fecha"
                    label="Fecha"
                    type="date"
                    error={Boolean(errors.Fecha)}
                    helperText={errors.Fecha ? errors.Fecha.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="HoraInicio"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="HoraInicio"
                    label="Hora de inicio"
                    type="time"
                    error={Boolean(errors.HoraInicio)}
                    helperText={
                      errors.HoraInicio ? errors.HoraInicio.message : " "
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="HoraFinal"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="HoraFinal"
                    label="Hora final"
                    type="time"
                    error={Boolean(errors.HoraFinal)}
                    helperText={
                      errors.HoraFinal ? errors.HoraFinal.message : " "
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="Cupo"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="Cupo"
                    label="Cupo"
                    type="number"
                    error={Boolean(errors.Cupo)}
                    helperText={errors.Cupo ? errors.Cupo.message : " "}
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
              Guardar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}