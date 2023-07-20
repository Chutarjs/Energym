import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

SelectServices.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
};
export function SelectServices({ field, data }) {
  return (
    <>
      <>
        <InputLabel id='servicio'>Servicio</InputLabel>
        <Select
          {...field}
          labelId='servicio'
          label='Servicio'
           multiple
          defaultValue={[]}
          value={field.value}
        >
          {data &&
            data.map((servicio) => (
              <MenuItem key={servicio.idServicio} value={servicio.idServicio}>
                {servicio.nombre}
              </MenuItem>
            ))}
        </Select>
      </>
    </>
  );
}
