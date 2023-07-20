// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FormHelperText } from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// eslint-disable-next-line no-unused-vars
import { useNavigate, useParams } from "react-router-dom";

export function FormPlan() {
  //const useNavigate = useNavigate()
  const routeParams = useParams();
  // Id de la pelicula a actualizar
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
    ServicioService.get()
      .then((response) => {
        console.log(response);
        setDataGenres(response.data.results);
        setLoadedGenres(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, [esCrear]);
  //Lista de actores
  const [dataActors, setDataActors] = useState({});
  const [loadedActors, setLoadedActors] = useState(false);
  useEffect(() => {
    ActorService.getActors()
      .then((response) => {
        console.log(response);
        setDataActors(response.data.results);
        setLoadedActors(true);
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
              {esCrear ? "Crear" : "Modificar"} Pelicula
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="title"
                    label="Título"
                    error={Boolean(errors.title)}
                    helperText={errors.title ? errors.title.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="year"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="year"
                    label="Año"
                    error={Boolean(errors.year)}
                    helperText={errors.year ? errors.year.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="time"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="time"
                    label="Minutos"
                    error={Boolean(errors.time)}
                    helperText={errors.time ? errors.time.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="lang"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="lang"
                    label="Idioma"
                    error={Boolean(errors.lang)}
                    helperText={errors.lang ? errors.lang.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              {/* Lista de generos */}
              {loadedGenres && (
                <Controller
                  name="genres"
                  control={control}
                  render={({ field }) => (
                    <SelectGenres
                      field={field}
                      data={dataGenres}
                      error={Boolean(errors.genres)}
                    />
                  )}
                />
              )}
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.genres ? errors.genres.message : " "}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Typography variant="h6" gutterBottom>
                Actores
                <Tooltip title="Agregar Actor">
                  <span>
                    <IconButton color="secondary" onClick={addNewActor}>
                      <AddIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Typography>
              {/* Array de controles de actor */}
              {loadedActors &&
                dataActors &&
                fields.map((field, index) => (
                  <ActorsForm
                    field={field}
                    data={dataActors}
                    key={index}
                    index={index}
                    onRemove={removeActor}
                    control={control}
                    disableRemoveButton={fields.length === 1}
                  />
                ))}
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.actors ? errors.actors.message : " "}
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
