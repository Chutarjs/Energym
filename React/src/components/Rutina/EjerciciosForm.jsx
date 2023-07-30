import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import { SelectEjercicios } from "./SelectEjercicios";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

EjerciciosForm.propTypes = {
  data: PropTypes.array,
  control: PropTypes.object,
  index: PropTypes.number,
  onRemove: PropTypes.func,
  disableRemoveButton: PropTypes.bool,
  field: PropTypes.object,
  defaultValue: PropTypes.string,
};

export function EjerciciosForm({
  data,
  control,
  index,
  onRemove,
  disableRemoveButton,
}) {

  return (
    <section>
      <Grid container spacing={2}>
      <ListItemIcon>
              <Tooltip title={`Ejercicio ${index + 1}`}>
                <IconButton>
                  <DirectionsRunIcon />
                </IconButton>
              </Tooltip>
            </ListItemIcon>
        <Grid item xs={4} md={4}>
          <Controller
            key={index}
            name={`ejercicios[${index}].IdEjercicio`}
            control={control}
            render={({ field }) => (
              <SelectEjercicios field={field} data={data} />
            )}
          />
        </Grid>
        <Grid item xs={3} md={3}>
          <Controller
            key={index}
            name={`ejercicios[${index}].Repeticiones`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Repeticiones"
                id={`Repeticiones-${index}`}
                type="number"
              />
            )}
          />
        </Grid>
        <Grid item xs={3} md={3}>
          <Controller
            key={index}
            name={`ejercicios[${index}].Series`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Series"
                id={`Series-${index}`}
                type="number"
              />
            )}
          />
        </Grid>

        <Grid item xs={1} md={1}>
          <ListItem>
            <ListItemIcon>
              <Tooltip title={`Eliminar Ejercicio ${index+1}`}>
                <span>
                  <IconButton
                    key={index}
                    edge="end"
                    disabled={disableRemoveButton}
                    onClick={() => onRemove(index)}
                    aria-label="Eliminar"
                  >
                    <DeleteIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </ListItemIcon>
          </ListItem>
        </Grid>
      </Grid>
    </section>
  );
}