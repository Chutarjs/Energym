// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const SelectServicios = ({ field, data, error }) => {
  // Check if data exists and has a valid 'results' property
  if (!data || !data.results || !Array.isArray(data.results)) {
    // If data or data.results is missing or not an array, return null
    return null; // or render an error message
  }

  return (
    <Select
      {...field}
      id="servicios"
      label="Servicios"
      error={Boolean(error)}
      multiple
      value={field.value}
      onChange={(event) => {
        const { value } = event.target;
        field.onChange(value);
      }}
    >
      {data.results.map((servicio) => (
        <MenuItem key={servicio.idservicio} value={servicio.idservicio}>
          {servicio.Nombre}
        </MenuItem>
      ))}
    </Select>
  );
};

// Prop type validation
SelectServicios.propTypes = {
  field: PropTypes.object.isRequired,
  data: PropTypes.shape({
    results: PropTypes.arrayOf(
      PropTypes.shape({
        idservicio: PropTypes.number.isRequired,
        nombre: PropTypes.string.isRequired,
        // Add more required properties if necessary
      })
    ),
  }),
  error: PropTypes.any, // Adjust the type according to your use case
};

export default SelectServicios;
