import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import Tooltip from '@mui/material/Tooltip';
import { SelectEjercicios } from './SelectEjercicios';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

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
  defaultValue, // Receive defaultValue as a prop
}) {
  console.log(data);
  return (
    <section>
      <Grid item xs={12} md={12}>
        <List>
          <ListItem>
            {/* ... (other ListItem components) */}
            <ListItemText sx={{ m: 1 }}>
              <Controller
                key={index}
                name={`ejercicios[${index}].idEjercicio`}
                control={control}
                defaultValue={defaultValue} // Pass the defaultValue to the Controller
                render={({ field }) => (
                  <SelectEjercicios field={field} data={data} />
                )}
              />
            </ListItemText>
            <ListItemText sx={{ m: 1 }}>
              <Controller
                key={index}
                name={`ejercicios[${index}].Repeticiones`}
                control={control}
                render={({ field }) => <TextField {...field} label='Repeticiones' />}
              />
            </ListItemText>
            <ListItemText sx={{ m: 1 }}>
              <Controller
                key={index}
                name={`ejercicios[${index}].Series`}
                control={control}
                render={({ field }) => <TextField {...field} label='Series' />}
              />
            </ListItemText>
            <ListItemIcon>
              <Tooltip title={`Eliminar Ejercicio ${index}`}>
                <span>
                  <IconButton
                    key={index}
                    edge='end'
                    disabled={disableRemoveButton}
                    onClick={() => onRemove(index)}
                    aria-label='Eliminar'
                  >
                    <DeleteIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </ListItemIcon>
          </ListItem>
        </List>
      </Grid>
    </section>
  );
}
