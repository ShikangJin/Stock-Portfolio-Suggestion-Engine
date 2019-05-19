import React from 'react';
import { Table } from 'antd';
import { formatMessage } from 'umi/locale';


  
export class MoneyDis extends React.Component {

    calculateData(weights, invest) {
        let data = []; 
        weights.forEach( weight => {
            data.push({
                key: weight.name,
                name: weight.name,
                percentage: (weight.weight * 100).toFixed(2) + '%',
                value: '$' + (invest * weight.weight).toFixed(2),
            });
        });
        return data;
    }

    render() {
        const percentage = formatMessage({ id: 'app.table.percentage' });
        const investMoney = formatMessage({ id: 'app.table.money' });
        const name = formatMessage({ id: 'app.table.name' });
        const columns = [{
            title: name,
            dataIndex: 'name',
        }, {
            title: percentage,
            dataIndex: 'percentage',
        }, {
            title: investMoney,
            dataIndex: 'value',
        }];
        let data = this.calculateData(this.props.stockWeights, this.props.invest);
        return (
            <Table columns={columns} dataSource={data} style={{'width':'20%', 'margin': '40px 0 0 40px '}}/>
        );
    }
}