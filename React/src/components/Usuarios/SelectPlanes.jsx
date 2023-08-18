import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

SelectPlanes.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
};
export function SelectPlanes({ field, data }) {
  return (
    <>
      <>
        <InputLabel id='planes'>Planes</InputLabel>
        <Select
          {...field}
          label='Planes'
          defaultValue={[]}
          value={field.value}
        >
          {data &&
            data.map((plan) => (
              <MenuItem key={plan.idPlan} value={plan.idPlan}>
                {plan.idPlan} - {plan.Nombre}
              </MenuItem>
            ))}
        </Select>
      </>
    </>
  );
}
