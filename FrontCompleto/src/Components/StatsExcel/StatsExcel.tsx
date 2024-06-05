import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { pedidoGruped, pedidoGroupedByInstrument } from '../../Service/PedidoService';
import "./StatsExcel.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const StatsExcel = () => {
    const [chartData, setChartData] = useState<(string | number)[][]>([['Mes-Año', 'Cantidad de Pedidos']]);
    const [instrumentData, setInstrumentData] = useState<(string | number)[][]>([['Instrumento', 'Cantidad de Pedidos']]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    useEffect(() => {
        const fetchBarChartData = async () => {
            try {
                const data = await pedidoGruped();

                // Transformar datos en formato adecuado para Google Charts
                const transformedData: (string | number)[][] = [['Mes-Año', 'Cantidad de Pedidos']];
                data.forEach((item: [any, any, any]) => {
                    const [year, month, count] = item;
                    const formattedMonthYear = `${month}/${year}`;
                    transformedData.push([formattedMonthYear, count]);
                });

                setChartData(transformedData);
            } catch (error) {
                console.error('Error al obtener datos agrupados:', error);
            }
        };

        const fetchPieChartData = async () => {
            try {
                const data = await pedidoGroupedByInstrument();

                // Transformar datos en formato adecuado para Google Charts
                const transformedData: (string | number)[][] = [['Instrumento', 'Cantidad de Pedidos']];
                data.forEach((item: [string, number]) => {
                    const [instrumento, count] = item;
                    transformedData.push([instrumento, count]);
                });

                setInstrumentData(transformedData);
            } catch (error) {
                console.error('Error al obtener datos agrupados por instrumento:', error);
            }
        };

        fetchBarChartData();
        fetchPieChartData();
    }, []);

    const barChartOptions = {
        title: 'Cantidad de Pedidos por Mes y Año',
        hAxis: { title: 'Mes-Año' },
        vAxis: { title: 'Cantidad de Pedidos' },
        legend: 'none',
    };

    const pieChartOptions = {
        title: 'Cantidad de Pedidos por Instrumento',
        is3D: true,
    };

    const handleReportRequest = async () => {
        if (!startDate || !endDate) {
            console.error('Por favor selecciona una fecha de inicio y una fecha de fin.');
            return;
        }

        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];
        const url = `http://localhost:8080/reporte/excel?fechaDesde=${formattedStartDate}&fechaHasta=${formattedEndDate}`;
        try {
            // Realizar la petición con las fechas seleccionadas
            console.log('URL de la petición:', url);
            // Aquí puedes usar Axios u otra librería para realizar la petición
        } catch (error) {
            console.error('Error al realizar la petición:', error);
        }
    };

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Estadísticas</h1>
            <div className="charts-container">
                <div className="chart-item">
                    <h2 style={{ textAlign: 'center' }}>Pedidos por Mes y Año</h2>
                    {chartData.length > 1 ? (
                        <Chart
                            chartType="Bar"
                            width="100%"
                            height="400px"
                            data={chartData}
                            options={barChartOptions}
                        />
                    ) : (
                        <p>Cargando datos...</p>
                    )}
                </div>
                <div className="chart-item">
                    <h2 style={{ textAlign: 'center' }}>Pedidos por Instrumento</h2>
                    {instrumentData.length > 1 ? (
                        <Chart
                            chartType="PieChart"
                            width="100%"
                            height="400px"
                            data={instrumentData}
                            options={pieChartOptions}
                        />
                    ) : (
                        <p>Cargando datos...</p>
                    )}
                </div>
            </div>
            <hr />
            <div className='container'>
                <h1>Generar Excel </h1>
                <label style={{ marginRight: '10px' }}>Fecha de inicio:</label>
                <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />
                <br />
                <label style={{ marginRight: '10px' }}>Fecha de fin:</label>
                <DatePicker selected={endDate} onChange={(date: Date) => setEndDate(date)} />
                <br />
                {(startDate && endDate) ?
                    <Link to={`http://localhost:8080/reporte/excel?fechaDesde=${startDate.toISOString().split('T')[0]}&fechaHasta=${endDate.toISOString().split('T')[0]}`}>
                        <Button className='btn btn-success' onClick={handleReportRequest}>Generar Excel</Button>
                    </Link> : <span>Cargue el rango de fechas para poder generar un reporte</span>}
            </div>
        </>
    );
};

export default StatsExcel;
