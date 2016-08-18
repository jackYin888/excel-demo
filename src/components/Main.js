require('normalize.css/normalize.css');
require('./examples.css')
require('./react-data-grid.css')

import ReactDataGrid from './reactDataGrid/src/index';
import React from 'react';
import ReactDom from 'react-dom'
import {Editors} from './reactDataGrid/src/addons'


var issueTypes = [
  { id: 'early', value: '早班', text: '早班' },
  { id: 'middle', value: '中班', text: '中班'},
  { id: 'late', value: '晚班', text: '晚班' }
  
];

var DropDownEditor = Editors.DropDownEditor;
var IssueTypesEditor = <DropDownEditor options={issueTypes}/>;

function createRows(numberOfRows) {
  var _rows = [];
  var dayType = ['早', '中', '晚'];
  for (var i = 1; i < numberOfRows; i++) {
    _rows.push({

      name: '张三',
      id:Math.random().toString().slice(2,8),
      day1: dayType[Math.floor(Math.random() * 3)],
      day2: dayType[Math.floor(Math.random() * 3)],
      day3: dayType[Math.floor(Math.random() * 3)],
      day4: dayType[Math.floor(Math.random() * 3)],
      day5: dayType[Math.floor(Math.random() * 3)]
    });
  }
  return _rows;
}



class AppComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      rows: createRows(10)
    }

  }






  //helper to generate a random date
  randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
  }

  //更新数据
  handleRowUpdated(e) {
    //merge updated row with current row and rerender by setting state
    var rows = this.state.rows;
    Object.assign(rows[e.rowIdx], e.updated);
    this.setState({ rows: rows });
  }

  //A rowGetter function is required by the grid to retrieve a row for a given index
  rowGetter(rowIdx) {
    return this.state.rows[rowIdx]
  }



  handleCellDrag(e) {
    var rows = this.state.rows.slice(0);
    for (var i = e.fromRow; i <= e.toRow; i++) {
      var rowToUpdate = rows[i];
      rowToUpdate[e.cellKey] = e.value;
    }
    this.setState({ rows: rows });
  }
handleClick(args){
  debugger
  console.log('提交数据:'+args.toJSON())
}
 
  render() {

    var columns = [
      {
        key:'id',
        name:'ID'

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
    let rows =this.state.rows
    return (
      <div>
    
      <ReactDataGrid
      ref ='myGrid'
        columns={columns}
        // onDragHandleDoubleClick={this.handleDragHandleDoubleClick.bind(this)} //双击
        onCellsDragged={this.handleCellDrag.bind(this) }
        enableCellSelect={true}//允许单元格编辑
        onRowUpdated={this.handleRowUpdated.bind(this) } //单元格数据更新
        rowGetter={this.rowGetter.bind(this) }
        rowsCount={this.state.rows.length}
        minHeight={500} />
        <button className='submit-btn' onClick={this.handleClick.bind(this,rows)}> 
        提交
        </button>
        </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
