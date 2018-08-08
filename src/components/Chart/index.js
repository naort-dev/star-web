import React from 'react';
import { Line } from 'react-chartjs-2';

export default class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.data = (canvas) => {
            const ctx = canvas.getContext("2d")
            const gradient = ctx.createLinearGradient(0, 10, 1000, 20);
            gradient.addColorStop(0, 'pink');
            gradient.addColorStop(1, 'orange');
            return {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'My First dataset',
                        backgroundColor: gradient,
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: [65, 59, 80, 81, 56, 55, 40]
                    }
                ]
            }
        };

    }


    render() {
        return (
            <div style={{ width: "50%" }}>
                <h2>Line Example</h2>
                <Line data={this.data} width={300} height={200} />
            </div>
        );
    }
}