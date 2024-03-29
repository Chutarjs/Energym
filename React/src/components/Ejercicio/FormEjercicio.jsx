// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FormHelperText } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// eslint-disable-next-line no-unused-vars
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import EjercicioService from "../../services/EjercicioService";

export function FormEjercicio() {
  const navigate = useNavigate();
  const routeParams = useParams();
  // Id de la pelicula a actualizar
  const id = routeParams.id || null;
  const esCrear = !id;
  // Valores a precarga al actualizar
  const [values, setValues] = useState(null);

  // Esquema de validación
  const ejercicioSchema = yup.object({
    Nombre: yup
      .string()
      .required("El nombre es requerido")
      .min(3, "El nombre debe tener al menos 3 caracteres"),
    Descripcion: yup.string().required("La descripcion es requerida"),
    Equipamiento: yup
      .string()
      .required("El equipamiento es necesario, si no se usa equipo poner nada"),
    imagenes: yup
      .array().required("Seleccione al menos una imagen").min(1, "Seleccione al menos una imagen"),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    // Valores iniciales
    defaultValues: {
      Nombre: "",
      Descripcion: "",
      Equipamiento: "",
      imagenes: [],
    },
    // valores a precargar
    values,
    // Asignación de validaciones
    resolver: yupResolver(ejercicioSchema),
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
      toast.error(e);
    }
  };

  //Llamar al API para ejecutar Crear o modificar
  useEffect(() => {
    if (start) {
      if (esCrear) {
        // Crear ejercicio
        EjercicioService.createEjercicio(formData)
          .then((response) => {
            setResponseData(response.data);
            setError(response.error);

            //con exito
            toast.success("El ejercicio se creó correctamente");
            navigate("/ejercicio-table");
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
        EjercicioService.updateEjercicio(formData)
          .then((response) => {
            setResponseData(response.data.results);
            setError(response.error);

            //con exito
            toast.success("El ejercicio se actualizó correctamente");
            navigate("/ejercicio-table");
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
  const onError = (errors) => console.log(errors);

  //Obtener ejercicio form para precargar datos en el form
  useEffect(() => {
    if (id != undefined && !isNaN(Number(id))) {
      EjercicioService.getEjercicioFormById(id)
        .then((response) => {
          setData(response.data.results);
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
      setValue("imagenes", data.imagenes);
    }
  }, [data, esCrear, action, values, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5" gutterBottom>
              {esCrear ? "Crear" : "Modificar"} Ejercicio
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
            {/* ['filled','outlined','standard']. */}
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="Equipamiento"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="Equipamiento"
                    label="Equipamiento"
                    error={Boolean(errors.Equipamiento)}
                    helperText={
                      errors.Equipamiento ? errors.Equipamiento.message : " "
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>

          {/* Se añade el input para ingresar las imagenes en formato base64 y almacenadas en un file */}
          <Grid item xs={12} sm={12}>
            <label htmlFor="upload-button">
              <input
                type="file"
                accept="image/*"
                multiple
                id="upload-button"
                style={{ display: "none" }}
                onChange={(e) => {
                  //se almacenan las imagenes en la variable files
                  const files = e.target.files;
                  //se verfica que existan imagenes
                  if (files && files.length > 0) {
                    const imageArray = [];
                    //se recorren las imagenes
                    for (let i = 0; i < files.length; i++) {
                      //variable para leer las imagenes
                      const reader = new FileReader();
                      //se leen las imagenes
                      reader.onloadend = () => {
                        //se añade al array
                        imageArray.push(reader.result);
                        //se verifica que se hayan recorrido las imagenes
                        if (imageArray.length === files.length) {
                          // setea el array de imagenes en formato base64
                          setValue("imagenes", imageArray);
                        }
                      };
                      reader.readAsDataURL(files[i]);
                    }
                  }
                }}
              />

              {/* El boton de seleccionar imagenes con diseño */}
              <Button
                variant="outlined"
                color="secondary"
                component="span"
                sx={{
                  mt: 2,
                  mb: 1,
                  ml: 1,
                  px: 3,
                  py: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                  border: "2px solid primary",
                  "&:hover": {
                    backgroundColor: "primary",
                    color: "#fff",
                  },
                }}
              >
                Seleccionar Imágenes
              </Button>
            </label>
            <FormHelperText>
              {errors.imagenes ? errors.imagenes.message : " "}
            </FormHelperText>
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
