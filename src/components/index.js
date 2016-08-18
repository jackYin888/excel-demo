import React, {Component} from 'react'
import {Editors} from './reactDataGrid/src/addons'
import App from './main'


export default class extends Component {
    constructor() {
        super()
        var issueTypes = [
            { id: 'early', value: '早班', text: '早班' },
            { id: 'middle', value: '中班', text: '中班' },
            { id: 'late', value: '晚班', text: '晚班' }

        ];

        var DropDownEditor = Editors.DropDownEditor;
        var IssueTypesEditor = <DropDownEditor options={issueTypes}/>;
        function createRows(numberOfRows) {
            var _rows = [];
            var dayType = ['早班', '中班', '晚班'];
            var names = ['Lenora', 'Rahul', 'Norfolk', 'Arden', 'Abbie', 'Helga', 'Ladarius', 'Ladarius', 'Mayra', 'Estefania', 'Baylee']
            for (var i = 1; i < numberOfRows; i++) {
                _rows.push({

                    name: names[i],
                    id: Math.random().toString().slice(2, 8),
                    day1: dayType[Math.floor(Math.random() * 3)],
                    day2: dayType[Math.floor(Math.random() * 3)],
                    day3: dayType[Math.floor(Math.random() * 3)],
                    day4: dayType[Math.floor(Math.random() * 3)],
                    day5: dayType[Math.floor(Math.random() * 3)]
                });
            }
            return _rows;
        }

        var columns = [
            {
                key: 'id',
                name: 'ID'

            },

            {
                key: 'name',
                name: '姓名',
                editable: true
            },
            {
                key: 'day1',
                name: '2016/8/8',
                editable: true
            },
            {
                key: 'day2',
                name: '2016/8/9',
                editable: true
            },
            {
                key: 'day3',
                name: '2016/8/10',


            },
            {
                key: 'day4',
                name: '2016/8/11',
                editable: true
            },
            {
                key: 'day5',
                name: '2016/8/12',
                editable: true,
                editor: IssueTypesEditor
            }

        ]
        this.state = {
            rows: createRows(10),
            columns: columns
        }


    }
    render() {
        return (
            <App data={this.state}/>
        )
    }
}
