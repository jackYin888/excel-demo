/**
 * react-data-grid main file
 * 
 */
require('normalize.css/normalize.css');
require('./examples.css')
require('./react-data-grid.css')

import ReactDataGrid from './reactDataGrid/src/index';
import React from 'react';
import ReactDom from 'react-dom'



class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: props.data.rows
    }

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
  //提交保存数据
  handleClick(args) {
    console.log('提交数据:' + JSON.stringify(args))
  }

  render() {
    let rows = this.state.rows;
    let columns = this.props.data.columns;
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
        <button className='submit-btn' onClick={this.handleClick.bind(this, rows) }>
          提交
        </button>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
