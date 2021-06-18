import React, { Component } from "react";
import {CartesianGrid, Line, LineChart, XAxis, Tooltip, YAxis, Legend} from "recharts";

const data = [
    {
        name: 'Page A',
        Google: 4000,
        Tesla: 2400,
        Apple: 2400,
    },
    {
        name: 'Page B',
        Google: 3000,
        Tesla: 1398,
        Apple: 2210,
    },
    {
        name: 'Page C',
        Google: 2000,
        Tesla: 9800,
        Apple: 2290,
    },
    {
        name: 'Page D',
        Google: 2780,
        Tesla: 3908,
        Apple: 2000,
    },
    {
        name: 'Page E',
        Google: 1890,
        Tesla: 4800,
        Apple: 2181,
    },
    {
        name: 'Page F',
        Google: 2390,
        Tesla: 3800,
        Apple: 2500,
    },
    {
        name: 'Page G',
        Google: 3490,
        Tesla: 4300,
        Apple: 2100,
    },
];


export default class StocksComponent extends Component {
    state = {
        content: [{}]
    };
    componentDidMount() {
        fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts?symbol=HYDR.ME&interval=5m&range=1d&region=US&comparisons=%5EGDAXI%2C%5EFCHI", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "37967f97bamsh9c1fc6ef84101d4p1a87b7jsn2dee75dad8dc",
                "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
            }
        })
            .then(data =>  data.json())
    }

    render() {
        const style = {
            background: 'black',
            padding: '5px 10px',
            borderRadius:' 7px',
            marginBottom: '19px',
            fontFamily: 'monospace',
            textAlign: 'center',
            color: 'white'
        }
        return (
            <div className="container">
                <div style={style}>
                    <h3>State of the market on June 2021</h3>
                </div>
                <LineChart
                    width={900}
                    height={600}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend wrapperStyle={{
                        marginBottom: "-20px"
                    }}/>
                    <Line type="monotone" dataKey="Google" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="Tesla" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="Apple" stroke="orange" />
                </LineChart>
            </div>
        );
    }
}
