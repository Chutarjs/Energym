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
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ServicioService from "../../services/ServicioService";
import PlanService from "../../services/PlanService";
import { SelectServicios } from "./SelectServicios";
import { toast } from "react-hot-toast";

export function FormPlan() {
  const navigate = useNavigate();
  const routeParams = useParams();
  // Id de la pelicula a actualizar
  const id = routeParams.id || null;
  const esCrear = !id;
  // Valores a precarga al actualizar
  // eslint-disable-next-line no-unused-vars
  const [values, setValues] = useState(null);
  // Esquema de validación
  const planSchema = yup.object({
    Nombre: yup
      .string()
      .required("El Nombre es requerido")
      .min(3, "El Nombre debe tener 3 caracteres"),
    Descripcion: yup
      .string()
      .required("La descripcion es requerida")
      .min(5, "La descripcion debe tener al menos 5 caracteres"),
    servicios: yup
      .array()
      .required("Seleccione al menos un servicio")
      .min(1, "Debe seleccionar al menos 1 servicio")
      .typeError("Seleccione al menos un servicio"),
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
      servicios: [], //''
    },
    // valores a precargar
    values,
    // Asignación de validaciones
    resolver: yupResolver(planSchema),
  });

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
        // Crear plan
        PlanService.createPlan(formData)
          .then((response) => {
            setResponseData(response.data.results);
            setError(response.error);

            //con exito
            toast.success("El plan se creó correctamente");
            navigate("/plan-table");
          })
          .catch((error) => {
            toast.error("Oh no! Algo salio mal!  :" + error.message);
            if (error instanceof SyntaxError) {
              console.log(error);
              throw new Error("Respuesta no válida del servidor");
            }
          });
      } else {
        // Modificar plan
        PlanService.updatePlan(formData)
          .then((response) => {
            setResponseData(response.data.results);
            setError(response.error);

            //con exito
            toast.success("El plan se actualizó correctamente");
            navigate("/plan-table");
          })
          .catch((error) => {
            toast.error("Oh no! Algo salio mal!  :" + error.message);
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

  //Obtener Plan
  useEffect(() => {
    if (id != undefined && !isNaN(Number(id))) {
      PlanService.getPlanFormById(id)
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
    // Cargar los datos de los servicios siempre, no importa si esCrear es true o false.
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
  }, [id]);

  //Lista de servicios
  const [dataServicios, setDataServicios] = useState({});
  const [loadedServicios, setLoadedServicios] = useState(false);

  // Si es modificar establece los valores a precargar en el formulario
  useEffect(() => {
    if (!esCrear && data) {
      setValue("Nombre", data.Nombre || "");
      setValue("Descripcion", data.Descripcion || "");
      // Set the ejercicios array values
      setValue("servicios", data.servicios.map((servicio) => servicio.idServicio) || []);
      setValue("idPlan", data.idPlan);
    }
  }, [data, esCrear, setValue]);

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
                  name="servicios"
                  control={control}
                  render={({ field }) => (
                    <SelectServicios
                      field={field}
                      data={dataServicios}
                      onChange={(e) =>
                        setValue("servicios", e.target.value, {
                          shouldValidate: true,
                        })
                      }
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
