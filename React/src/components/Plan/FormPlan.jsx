// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FormHelperText } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import { useForm, Controller, useFieldArray } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// eslint-disable-next-line no-unused-vars
import { useNavigate, useParams } from "react-router-dom";
import ServicioService from '../../services/ServicioService';
import SelectServicios from "./SelectServicios";

export function FormPlan() {
  //const useNavigate = useNavigate()
  const routeParams = useParams();
  // Id del plan a actualizar
  const id = routeParams.id || null;
  const esCrear = !id;
  // Valores a precarga al actualizar
  const [values, setValues] = useState(null);
  // Esquema de validación
  const planSchema = yup.object({
    nombre: yup
      .string()
      .required("El nombre es requerido")
      .min(3, "El nombre debe tener al menos 3 caracteres"),
    descripcion: yup.string().required("La descripcion es requerida"),
    servicios: yup.array().typeError("Seleccione al menos un servicio"),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    // Valores iniciales
    defaultValues: {
      nombre: "",
      descripcion: "",
      servicios: [],
    },
    // valores a precargar

    // Asignación de validaciones
    resolver: yupResolver(planSchema),
  });

  // Valores de formulario que llena el usuario
  const [formData, setFormData] = useState(null);
  //Respuesta de crear o modificar
  const [responseData, setResponseData] = useState(null);
  // Accion: post, put
  const [action, setAction] = useState("POST");
  // Booleano para establecer si se envió la informacion al API
  const [start, setStart] = useState(false);
  // Obtener la informacion del plan a actualizar
  const [data, setData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");

  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      // Establecer valores del formulario
      console.log(DataForm);
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

  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);
  //Obtener plan

  //Lista de servicios
  const [dataServicios, setDataServicios] = useState({});
  const [loadedServicios, setLoadedServicios] = useState(false);
  useEffect(() => {
    ServicioService.getServicios()
      .then((response) => {
        console.log(response.data);
        setDataServicios(response.data);
        setLoadedServicios(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, [esCrear]);

  //Respuesta del API al crear o actualizar

  // Si es modificar establece los valores a precargar en el formulario

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5" gutterBottom>
              {esCrear ? "Crear" : "Modificar"} Plan
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="Nombre"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="nombre"
                    label="Nombre"
                    error={Boolean(errors.nombre)}
                    helperText={errors.title ? errors.title.message : " "}
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
                    id="descripcion"
                    label="Descripcion"
                    error={Boolean(errors.descripcion)}
                    helperText={errors.year ? errors.year.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              {/* Lista de generos */}
              {loadedServicios && (
                <Controller
                  name="servicios"
                  control={control}
                  render={({ field }) => (
                    <SelectServicios
                      field={field}
                      data={dataServicios}
                      error={Boolean(errors.servicios)}
                    />
                  )}
                />
              )}
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.servicios ? errors.servicios.message : " "}
              </FormHelperText>
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
