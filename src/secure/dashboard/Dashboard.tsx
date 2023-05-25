import React, {useEffect} from "react";
import Wrapper from "../Wrapper";
import c3 from 'c3';
import axios from "axios";

const Dashboard = () => {

    useEffect(() => {
        let chart = c3.generate({
            bindto: '#chart',
            data: {
                x: 'x',
                columns: [
                    ['x'],
                    ["Sales"],
                ],
                types: {
                    Sales: 'bar'
                }
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m-%d'
                    }
                }
            }
        });

        async function getChart() {
            const res = await axios.get('chart');
            const records: {date: string, sum: number}[] = res.data.data;

            chart.load({
                columns: [
                    ['x', ...records.map(record => record.date)],
                    ['Sales', ...records.map(record => record.sum)]
                ]
            })
        };
        getChart();
    }, [])

    return (
        <Wrapper>
            <h2>Daily Sales</h2>

            <div id='chart'/>
        </Wrapper>
    )
}

export default Dashboard;