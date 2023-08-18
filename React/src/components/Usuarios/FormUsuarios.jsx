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
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import UsuarioService from "../../services/UsuarioService";
import { MenuItem } from "@mui/material";
import { SelectPlanes } from "./SelectPlanes";
import PlanService from "../../services/PlanService";

export function FormUsuario() {
  const navigate = useNavigate();
  const routeParams = useParams();
  //id a actualizar
  const id = routeParams.id || null;
  const esCrear = !id;

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
    Password: yup
            .string()
            .required("El password es requerido"),
    Genero: yup
      .string()
      .oneOf(
        ["1", "2"],
        'El género debe ser "1" para masculino o "2" para femenino'
      )
      .required("El género es requerido"),
    Tipo: yup
      .string()
      .oneOf(["1", "3"], "El tipo debe ser cliente o empleado")
      .required("El tipo es requerido"),
    Nacimiento: yup
      .date()
      .typeError("La fecha de nacimiento es requerida")
      .required("La fecha de nacimiento es requerida"),
    Telefono: yup
      .string()
      .required("El teléfono es requerido")
      .matches(/^[0-9]+$/, "El teléfono solo debe contener números"),
    Planes: yup
      .string(),
    Estado: yup
      .string()
      .oneOf(["0", "1"], "El estado es necesario")
      .required("El estado es requerido"),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    // Valores iniciales
    defaultValues: {
      id: "",
      Nombre: "",
      Apellidos: "",
      Email: "",
      Password: " ",
      Genero: "1",
      Tipo: "1",
      Nacimiento: null,
      Telefono: "",
      Estado: "1",
      Planes: ""
    },
    // Asignación de validaciones
    resolver: yupResolver(loginSchema),
  });

  // Valores de formulario
  const [data, setData] = useState(null);
  // Valores de formulario que llena el usuario
  const [formData, setFormData] = useState(null);
  // Booleano para establecer si se envia la informacion al API
  const [start, setStart] = useState(false);
  //Respuesta del API
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");
  // Accion: post, put
  // eslint-disable-next-line no-unused-vars
  const [action, setAction] = useState("POST");

  const notify = () =>
    toast.success("Usuario registrado", {
      duration: 4000,
      position: "top-center",
    });
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

  //datos precargados
  useEffect(() => {
    if (start) {
      if (esCrear) {
        UsuarioService.create(formData)
          .then((response) => {
            setResponseData(response.data.results);
            setError(response.error);
            toast.success("Creado con exito");
            navigate("/usuario-table/");
          })
          .catch((error) => {
            if (error instanceof SyntaxError) {
              console.log(error);
              throw new Error("Respuesta no válida del servidor");
            }
          });
      } else {
        console.log(formData);
        UsuarioService.updateAdmin(formData)
          .then((response) => {
            setResponseData(response.data.results);
            setError(response.error);
            toast.success("Actualizado con exito");
            navigate("/usuario-table/");
          })
          .catch((error) => {
            if (error instanceof SyntaxError) {
              console.log(error);
              throw new Error("Respuesta no válida del servidor");
            }
          });
      }
    }
  }, [esCrear, formData, navigate, responseData, start]);

  //Obtener usuario
  useEffect(() => {
    if (id != undefined && !isNaN(Number(id))) {
      UsuarioService.getUserById(id)
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
    PlanService.getPlanes()
      .then((response) => {
        setDataPlanes(response.data.results);
        setLoadedPlanes(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, [id]);

  //Lista de planes
  const [dataPlanes, setDataPlanes] = useState({});
  const [loadedPlanes, setLoadedPlanes] = useState(false);

  // Si es modificar establece los valores a precargar en el formulario
  useEffect(() => {
    if (!esCrear && data) {
      console.log(data);
      setValue("id", data.id || "");
      setValue("Nombre", data.Nombre || "");
      setValue("Apellidos", data.Apellidos || "");
      setValue("Genero", data.Genero || "");
      setValue("Tipo", data.IdTipoUsuario || "");
      setValue("Nacimiento", data.Nacimiento || "");
      setValue("Email", data.Email || "");
      setValue("Contrasenna", " ");
      setValue("Telefono", data.Telefono || "");
      if(data.plan != null){
        setValue("Planes", data.plan.idPlan || "");
      }
      setValue("Estado", data.Activo || "1");
    }
  }, [data, esCrear, setValue]);

  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5" gutterBottom>
              {esCrear? "Registrar Usuario o Empleado": "Modificar Usuario o Empleado"}
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
                    disabled={!esCrear}
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
                    disabled={!esCrear}
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
                    disabled={!esCrear}
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
                    disabled={!esCrear}
                  >
                    <MenuItem value="1">Masculino</MenuItem>
                    <MenuItem value="2">Femenino</MenuItem>
                  </TextField>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
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
                    disabled={!esCrear}
                  >
                    <MenuItem value="1">Cliente</MenuItem>
                    <MenuItem value="3">Empleado</MenuItem>
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
                    disabled={!esCrear}
                  />
                )}
              />
            </FormControl>
          </Grid>

          {/* Telefono */}
          <Grid item xs={12} sm={6}>
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
                    disabled={!esCrear}
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
                    disabled={!esCrear}
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
                    label="Contraseña"
                    type="password"
                    error={Boolean(errors.Password)}
                    helperText={errors.Password ? errors.Password.message : " "}
                    disabled={!esCrear}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              {!esCrear && (
                <Controller
                name="Estado"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="Estado"
                    label="Estado"
                    select
                    error={Boolean(errors.Estado)}
                    helperText={errors.Estado ? errors.Estado.message : " "}
                  >
                    <MenuItem value="0">Inactivo</MenuItem>
                    <MenuItem value="1">Activo</MenuItem>
                  </TextField>
                )}
              />
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              {loadedPlanes && !esCrear &&(
                <Controller
                  name="Planes"
                  control={control}
                  render={({ field }) => (
                    <SelectPlanes
                      field={field}
                      data={dataPlanes}
                      onChange={(e) =>
                        setValue("Planes", e.target.value, {
                          shouldValidate: true,
                        })
                      }
                      error={Boolean(errors.Planes)}
                    />
                  )}
                />
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ m: 1 }}
            >
              {esCrear? "Crear": "Modificar"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
