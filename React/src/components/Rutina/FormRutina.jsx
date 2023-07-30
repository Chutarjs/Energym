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
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { SelectServicios } from "./SelectServicios";
import EjercicioService from "../../services/EjercicioService";
import { EjerciciosForm } from "./EjerciciosForm";
import RutinaService from "../../services/RutinaService";
import ServicioService from "../../services/ServicioService";
import { toast } from "react-hot-toast";

export function FormRutina() {
  const navigate = useNavigate();
  const routeParams = useParams();
  // Id de la pelicula a actualizar
  const id = routeParams.id || null;
  const esCrear = !id;
  // Valores a precarga al actualizar
  const [values] = useState(null);
  const ejercicioSchema = yup.object({
    IdEjercicio: yup.number().required("Seleccione un ejercicio"),
    Repeticiones: yup.number().required("Las repeticiones son requeridas").min(1, "Digite las repeticiones"),
    Series: yup.number().required("Las series son requeridas"). min(1, "Debe digitar las series"),
  });
  
  // Esquema de validación
  const rutinaSchema = yup.object({
    Nombre: yup
      .string()
      .required("El nombre es requerido")
      .min(3, "El nombre debe tener 3 caracteres"),
    Descripcion: yup.string().required("La descripcion es requerida"),
    idServicio: yup.number().required("Seleccione un servicio").min(1, "Seleccione un servicio"),
    ejercicios: yup.array()
    .of(ejercicioSchema) // Use the ejercicioSchema to validate each exercise object
    .required("Los ejercicios son necesarios")
    .min(1, "Seleccione al menos un ejercicio")
    .typeError("Seleccione al menos un ejercicio"),
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
      idServicio: 0,
      ejercicios: [
        {
          IdEjercicio: 0,
          Repeticiones: 0,
          Series: 0,
        },
      ],
      idrutina: 0,
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
  // Eliminar actor de listado
  const removeEjercicio = (index) => {
    if (fields.length === 1) {
      return;
    }
    remove(index);
  };
  // Agregar un nuevo ejercicio
  const addNewEjercicio = () => {
    append({
      IdEjercicio: 0,
      Repeticiones: 0,
      Series: 0,
    });
  };
  // Valores de formulario que llena el usuario
  const [formData, setFormData] = useState(null);
  //Respuesta de crear o modificar
  // eslint-disable-next-line no-unused-vars
  const [responseData, setResponseData] = useState(null);
  // Accion: post, put
  // eslint-disable-next-line no-unused-vars
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
      const isValidExercises = ejercicioSchema.isValid(DataForm.ejercicios);
      if (!isValidExercises) {
        toast.error("Por favor, complete los campos requeridos para los ejercicios.");
        return;
      }
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
            setResponseData(response.data.results);
            setError(response.error);

            //con exito
            toast.success("La rutina se creó correctamente");
            navigate("/rutina-table");
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

            //con exito
            toast.success("La rutina se actualizó correctamente");
            navigate("/rutina-table");
          })
          .catch((error) => {
            if (error instanceof SyntaxError) {
              console.log(error);
              throw new Error("Respuesta no válida del servidor");
            }
          });
      }
    }
  }, [start, esCrear, formData, navigate]);
  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);

  //Obtener Rutina
  //Obtener Rutina
useEffect(() => {
  if (id != undefined && !isNaN(Number(id))) {
    RutinaService.getRutinaFormById(id)
      .then((response) => {
        console.log(response.data);
        setData(response.data.results);
        setError(response.error);
        // Set the value of idrutina when modifying a routine
        setValue("idrutina", Number(response.data.results.idrutina));
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
const [dataEjercicios, setDataEjercicios] = useState([]);
const [loadedEjercicios, setLoadedEjercicios] = useState(false);

useEffect(() => {
  EjercicioService.getEjercicios()
    .then((response) => {
      setDataEjercicios(response.data.results);
      setLoadedEjercicios(true);
    })
    .catch((error) => {
      if (error instanceof SyntaxError) {
        console.log(error);
        throw new Error("Respuesta no válida del servidor");
      }
    });
}, []);

  // Si es modificar establece los valores a precargar en el formulario
  useEffect(() => {
    if (!esCrear && data) {
      setValue("Nombre", data.Nombre || "");
      setValue("Descripcion", data.Descripcion || "");
      setValue("idServicio", data.idServicio || "");
      setValue("idrutina", Number(data.idrutina));
      if (data.ejercicios && data.ejercicios.length > 0) {
        setValue("ejercicios", data.ejercicios);
      }
    }
  }, [data, esCrear, setValue, values]);

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
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              {/* Lista de servicios */}
              {loadedServicios && (
                <Controller
                  name="idServicio"
                  control={control}
                  render={({ field }) => (
                    <SelectServicios
                      field={field}
                      data={dataServicios}
                      onChange={(e) =>
                        setValue("idServicio", e.target.value, {
                          shouldValidate: true,
                        })
                      }
                      value={field.value}
                      error={Boolean(errors.idServicio)}
                    />
                  )}
                />
              )}
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.idServicio ? errors.idServicio.message : " "}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item sm={12}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Typography variant="h6" gutterBottom>
                Ejercicios
                <Tooltip title="Agregar Ejercicio">
                  <span>
                    <IconButton color="secondary" onClick={addNewEjercicio}>
                      <AddIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Typography>
              {/* Array de controles de ejercicios */}
              {loadedEjercicios &&
                dataEjercicios &&
                fields.map((field, index) => (
                  <EjerciciosForm
                    field={field}
                    data={dataEjercicios}
                    key={index}
                    index={index}
                    onRemove={removeEjercicio}
                    control={control}
                    disableRemoveButton={fields.length === 1}
                  />
                ))}
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.ejercicios ? errors.ejercicios.message : " "}
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
