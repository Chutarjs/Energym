// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FormHelperText } from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// eslint-disable-next-line no-unused-vars
import { Navigate, useNavigate, useParams } from "react-router-dom";
import EjercicioService from "../../services/EjercicioService";
import { EjerciciosForm } from "./EjerciciosForm";
import RutinaService from "../../services/RutinaService";
import { SelectServicios } from "./SelectServicios";
import ServicioService from "../../services/ServicioService";
import { toast } from "react-hot-toast";

export function FormRutina() {
  const navigate = useNavigate();
  const routeParams = useParams();
  // Id de la pelicula a actualizar
  const id = routeParams.id || null;
  const esCrear = !id;
  // Valores a precarga al actualizar
  const [values, setValues] = useState(null);
  // Esquema de validación
  const rutinaSchema = yup.object({
    Nombre: yup
      .string()
      .required("El nombre es requerido")
      .min(3, "El nombre debe tener al menos 3 caracteres"),
    servicio: yup.string().required("El servicio es requerido"),
    Descripcion: yup.string().required("La descripcion es requerida"),
    ejercicios: yup.array().typeError("Seleccione al menos un ejercicio"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // Valores iniciales
    defaultValues: {
      Nombre: "",
      servicio: "",
      Descripcion: "",
      ejercicios: [
        {
          idEjercicio: 0,
          reps: 0,
          series: 0,
        },
      ],
    },
    // valores a precargar
    values,
    // Asignación de validaciones
    resolver: yupResolver(rutinaSchema),
  });

  // useFieldArray:
  // relaciones de muchos a muchos, con más campos además
  // de las llaves primaras
  const { fields, append, remove } = useFieldArray({
    control, //controls proviene de useForm
    name: "ejercicios", //nombre único para el campo Array
  });
  // Eliminar ejercicio de listado
  const removeEjercicio = (index) => {
    if (fields.length === 1) {
      return;
    }
    remove(index);
  };
  // Agregar un nuevo actor
  const addNewEjercicio = () => {
    append({
      idEjercicio: 0,
      reps: 0,
      series: 0,
    });
  };
  // Valores de formulario que llena el usuario
  const [formData, setFormData] = useState(null);
  //Respuesta de crear o modificar
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
  useEffect(() => {
    if (start) {
      if (esCrear) {
        //Crear rutina
        RutinaService.createRutina(formData)
          .then((response) => {
            console.log(response);
            setResponseData(response.data.results);
            setError(response.error);
          })
          .catch((error) => {
            if (error instanceof SyntaxError) {
              console.log(error);
              throw new Error("Respuesta no válida del servidor");
            }
          });
      } else {
        //Modificar rutina
        RutinaService.updateRutina(formData)
          .then((response) => {
            console.log(response);
            setResponseData(response.data.results);
            setError(response.error);
          })
          .catch((error) => {
            if (error instanceof SyntaxError) {
              console.log(error);
              throw new Error("Respuesta no válida del servidor");
            }
          });
      }
    }
  }, [start, esCrear, formData]);
  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);

  //Obtener rutina
  useEffect(() => {
    if (id != undefined && !isNaN(Number(id))) {
      RutinaService.getRutinaFormById(id)
        .then((response) => {
          console.log(response);
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

  //Lista de servicios
  const [dataServicios, setDataServicios] = useState({});
  const [loadedServicios, setLoadedServicios] = useState(false);
  useEffect(() => {
    ServicioService.getServicios()
      .then((response) => {
        console.log(response);
        setDataServicios(response.data.results);
        setLoadedServicios(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, [esCrear]);

  //Lista de ejercicios
  const [dataEjercicios, setDataEjercicios] = useState({});
  const [loadedEjercicios, setLoadedEjercicios] = useState(false);
  useEffect(() => {
    EjercicioService.getEjercicios()
      .then((response) => {
        console.log(response);
        setDataEjercicios(response.data.results);
        setLoadedEjercicios(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, [esCrear]);

  //Respuesta del API al crear o actualizar
  useEffect(() => {
    if (responseData != null) {
      toast.success(responseData, {
        duration: 4000,
        position: "top-center",
      });
      // Si hay respuesta se creo o modifico lo redirecciona
      return navigate("/rutina-table");
    }
  }, [navigate, responseData]);

  // Si es modificar establece los valores a precargar en el formulario
  useEffect(() => {
    if (!esCrear && data) {
      // Si es modificar establece los valores a precargar en el formulario
      setValues(data);
      console.log(data);
    }
  }, [data, esCrear, action]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5" gutterBottom>
              {esCrear ? "Crear" : "Modificar"} Rutina
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="Nombre" // Updated name attribute
                control={control}
                defaultValue={values.Nombre} // Set the default value
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
                name="Descripcion" // Updated name attribute
                control={control}
                defaultValue={values.Descripcion} // Set the default value
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
              {loadedEjercicios && ( // Correct the variable name here
                <Controller
                  name="ejercicios" // Updated name attribute
                  control={control}
                  defaultValue={values.ejercicios} // Set the default value
                  render={({ field }) => (
                    <EjerciciosForm // Make sure to pass the correct data and props here
                      field={field}
                      data={dataEjercicios}
                      onRemove={removeEjercicio}
                      onAdd={addNewEjercicio}
                      control={control}
                    />
                  )}
                />
              )}
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.ejercicios ? errors.ejercicios.message : " "}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              {loadedServicios && (
              <Controller
                name="servicio" // Updated name attribute
                control={control}
                defaultValue={values.servicio} // Set the default value
                render={({ field }) => (
                  <SelectServicios // Pass the appropriate data prop
                    field={field}
                    data={dataServicios} // Use the correct data for services
                  />
                )}
              />
              )}
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.servicio ? errors.servicio.message : " "}
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
