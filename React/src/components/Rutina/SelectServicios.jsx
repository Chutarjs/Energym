import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

SelectServicios.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
};
export function SelectServicios({ field, data }) {
  return (
    <>
      <>
        <InputLabel id='servicios'>Servicios</InputLabel>
        <Select
          {...field}
          labelId='serviciosId'
          label='servicios'
          multiple
          defaultValue={[]}
          value={field.value}
        >
          {data &&
            data.map((servicio) => (
              <MenuItem key={servicio.idservicio} value={servicio.idservicio}>
                {servicio.Nombre}
              </MenuItem>
            ))}
        </Select>
      </>
    </>
  );
}
