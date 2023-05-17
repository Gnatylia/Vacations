import React, { useEffect } from 'react';
const myChart = require('chart.js');

const Graf = ({ items }) => {

    const refCanvas = React.createRef();

    const getDescription = () => {
        return items.map((v) => v.description);
    }

    const getFollows = () => {
        return items.map((v) => v.follows);
    }

    let followsData = {
        label: "follows",
        data: getFollows(),
        backgroundColor: 'rgba(0, 99, 132, 0.6)',
        borderColor: 'rgba(0, 99, 132, 1)'
    };

    let vacationsData = {
        labels: getDescription(),
        datasets: [followsData]
    };

    let chartOptions = {
        scales: {
            xAxes: [{
                barPercentage: 1,
                categoryPercentage: 0.6
            }],
            yAxes: [{
                id: "y-axis-density"
            }]
        }
    };

    useEffect(() => {
        let myBarChart = new myChart(refCanvas.current, {
            type: "bar"
            , data: vacationsData
        });
        //console.log('Graf.useEffect: refCanvas = ', refCanvas);
        //console.log('Graf.useEffect: myBarChart = ', myBarChart);
    }, []);

    return (
        <div>
            <canvas ref={refCanvas} className="myChart" height="800" width="1200"></canvas>
        </div>
    )
}

export default Graf