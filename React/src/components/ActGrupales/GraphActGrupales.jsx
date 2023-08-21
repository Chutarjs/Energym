// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import ActGrupalesService from '../../services/ActGrupalesService';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

export function GraphActGrupales() {
  const [data, setData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [startDate, setStartDate] = useState(new Date("2023-01-01"));
  const [endDate, setEndDate] = useState(new Date("2023-12-30"));

  useEffect(() => {
    ActGrupalesService.getGrafico()
      .then((response) => {
        const activitiesData = response.data.results
          .filter(activity => {
            const activityDate = new Date(activity.Fecha);
            return activityDate >= startDate && activityDate <= endDate;
          })
          .map(activity => ({
            Nombre: activity.Nombre,
            CantidadMatriculados: parseInt(activity.cantidad_matriculados),
          }));
        setData(activitiesData);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        setData([]);
        if (error instanceof SyntaxError) {
          console.log(error);
          throw new Error('Respuesta no válida del servidor');
        }
      });
  }, [startDate, endDate]);

  const COLORS = [
    "#65d3da",
    "#79d69f",
    "#fad144",
    "#d76c6c",
    "#138185",
    "#26a0a7",
    "#ec983d",
    "#cbe989",
    "#f9ec86",
    "#ebf898"
  ];

  return (
    <>
      <div>
        <label>Fecha de inicio:</label>
        <input
          type="date"
          value={startDate.toISOString().split("T")[0]}
          onChange={(e) => setStartDate(new Date(e.target.value))}
        />
        <label>Fecha final:</label>
        <input
          type="date"
          value={endDate.toISOString().split("T")[0]}
          onChange={(e) => setEndDate(new Date(e.target.value))}
        />
      </div>
      {!loaded && <div>Cargando...</div>}
      {data.length > 0 && (
        <>
          <ResponsiveContainer width="100%" height={700} key={1}>
          <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Nombre" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="CantidadMatriculados"
                fill="#00a0fc"
                stroke="#000000"
                strokeWidth={1}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % 10]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <hr />
        </>
      )}
    </>
  );
}
