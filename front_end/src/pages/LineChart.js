import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

export class LineChart extends React.Component {
    state = {
        data: [],
        currentTabKey: '',
    }

    componentWillReceiveProps(nextProps) {
        this.state.data = nextProps.data;
        this.forceUpdate();
    }
        
    round(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }
    renderChart(data) {
        let components = [];
        
        if (data[data.length - 1] && data[data.length - 1].name !== 'Portfolio') {
            let new_chart_obj = {'dataset': [{'value': 0},{'value': 0},{'value': 0},{'value': 0},{'value': 0}], 'name': 'Portfolio'};
            data.forEach(row => {
                row.dataset.forEach((data_obj, idx) => {
                    new_chart_obj.dataset[idx].time = data_obj.time;
                    new_chart_obj.dataset[idx].value += parseFloat(data_obj.value);
                    new_chart_obj.dataset[idx].value = this.round(new_chart_obj.dataset[idx].value, 2);
                });
            });
            console.log(new_chart_obj);
            data.push(new_chart_obj);
        }
        
        data.forEach(row => {
            console.log('create');
            components.push(
                <TabPane tab={row.name} key={row.name}>
                    <Chart height={400} width={600} data={row.dataset} forceFit style={{'marginTop': '50px'}}>
                        <Axis name="time" />
                        <Axis name="value" />
                        <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                        />
                        <Geom type="line" position="time*value" size={2}/>
                        <Geom
                        type="point"
                        position="time*value"
                        size={4}
                        shape={"circle"}
                        style={{
                            stroke: "#fff",
                            lineWidth: 1
                        }}
                        />
                    </Chart>
                </TabPane>
            );
        })
        return components;  
    }

    handleTabChange = key => {
        this.setState({
            currentTabKey: key,
        });
        };

    render() {
        const {data, currentTabKey} = this.state;
        const activeKey = currentTabKey || (data[0] && data[0].name);
        console.log(data);
        
        return(
            <Tabs activeKey={activeKey} onChange={this.handleTabChange}  style={{'width': '70%', 'margin': '0 20'}}>
                {
                    this.renderChart(data) 
                }
            </Tabs>
            
        );
    }
} 
// LineChart;