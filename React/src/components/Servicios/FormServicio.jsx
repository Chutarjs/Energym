// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FormHelperText, MenuItem } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// eslint-disable-next-line no-unused-vars
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import ServicioService from "../../services/ServicioService";

export function FormServicio() {
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
    Tipo: yup
      .string()
      .required("El equipamiento es necesario, si no se usa equipo poner nada")
      .oneOf(["Individual", "Grupal"], "Tipo debe ser 'individual' o 'grupal'"),
    Precio: yup.number().required("Se requiere el precio").min(500, "El numero debe ser mayor a 500"),
    imagen: yup.array().required("Debe seleccionar una imagen").min(1, "Seleccione al menos una imagen"),
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
      Tipo: "",
      Precio: 0,
      imagen: [],
    },
    // valores a precargar
    values,
    // Asignación de validaciones
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
        ServicioService.createServicio(formData)
          .then((response) => {
            setResponseData(response.data);
            setError(response.error);

            //con exito
            toast.success("El servicio se creó correctamente");
            navigate("/servicio-table");
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
        ServicioService.updateServicio(formData)
          .then((response) => {
            setResponseData(response.data.results);
            setError(response.error);

            //con exito
            toast.success("El servicio se actualizó correctamente");
            navigate("/servicio-table");
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
      ServicioService.getServicioFormById(id)
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
    }
  }, [data, esCrear, action]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5" gutterBottom>
              {esCrear ? "Crear" : "Modificar"} Servicio
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
                name="Tipo"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="Tipo"
                    label="Tipo"
                    select
                    error={Boolean(errors.Tipo)}
                    helperText={errors.Tipo ? errors.Tipo.message : " "}
                  >
                    <MenuItem value="Individual">Individual</MenuItem>
                    <MenuItem value="Grupal">Grupal</MenuItem>
                  </TextField>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="Precio"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="Precio"
                    label="Precio"
                    error={Boolean(errors.Precio)}
                    helperText={errors.Precio ? errors.Precio.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <label htmlFor="upload-button">
              <input
                type="file"
                accept="image/*"
                id="upload-button"
                style={{ display: "none" }} // Hide the default input element
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    const imageArray = [];
                    for (let i = 0; i < files.length; i++) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        imageArray.push(reader.result);
                        if (imageArray.length === files.length) {
                          // Set the array of base64 images to the form
                          setValue("imagen", imageArray);
                        }
                      };
                      reader.readAsDataURL(files[i]);
                    }
                  }
                }}
              />
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                component="span"
                sx={{
                  mt: 1,
                  mb: 1,
                  ml: 1,
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
                Seleccionar Imágen
              </Button>
            </label>
            <FormHelperText>
              {errors.imagen ? errors.imagen.message : " "}
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
