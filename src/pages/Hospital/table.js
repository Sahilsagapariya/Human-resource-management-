import React, { useState, useMemo } from 'react';
import Table from 'react-bootstrap/Table';
import BootstrapTable from 'react-bootstrap-table-next';
import right from '../Hospital/imges/check-svgrepo-com 2.svg';
import crose from '../Hospital/imges/Vector (2).svg';
import { Link } from "react-router-dom"
import {
    Button,
    Col,
    Row,
} from "reactstrap"
import PropTypes from "prop-types"
import "bootstrap/dist/css/bootstrap.min.css"
import TableContainer from "../Hospital/TableContainerCopy"
import data from './data';

const linkFollow = (cell) => {
    console.log("cell", cell)
    return (
        <Link className="" to={`/person/${cell.id}`}>
            <Button
                onClick={() => {
                    console.log("hello")
                }}
            >
                view Detail
            </Button>
        </Link>

    );
};


const columnsTable
    = [
        {
            Header: "ID",
            accessor: "id",
            filterable: true,
        },
        {
            Header: "name",
            accessor: "name",
            disableGlobalFilter: true,
            filterable: true,
            // Cell: cellProps => {
            //     return <EmployeeName {...cellProps} />
            // },
        },
        {
            Header: "description",
            accessor: "description",
            filterable: true,
        },
        {
            Header: "morning",
            accessor: "morning",
            filterable: false,
            Cell: cellProps => {
                return <Morning {...cellProps} />
            },
        },
        {
            Header: "afternoon",
            accessor: "afternoon",
            filterable: false,
            Cell: cellProps => {
                return <Afternoon {...cellProps} />
            },
        },
        {
            Header: "evening",
            accessor: "evening",
            filterable: false,
            Cell: cellProps => {
                return <Evening {...cellProps} />
            },
        },
        {
            Header: "select",
            accessor: "select",
            filterable: false,
        },
        {
            Header: "tablet",
            accessor: "tablet",
            filterable: false,
        },


    ]


const columns = [{
    dataField: 'id',
    text: '  ID'
},
{
    dataField: 'date',
    text: 'date'
},
{
    dataField: 'decription',
    text: 'decription'
},
{
    dataField: "Action",
    text: "Action",
    formatter: (cellContent, row) => linkFollow(row),

}
];

const products = [
    { id: "1", date: "04-11-2021", decription: "test" },
    { id: "2", date: "04-01-2022", decription: "reguler" },
    { id: "3", date: "04-12-2023", decription: "half time" },
    { id: "4", date: "04-10-2022", decription: "half tablate" }
]

export default class RowExpandManagment extends React.Component {

    constructor(props) {
        super(props);
        this.state = { expanded: [0, 1] };
    }

    handleBtnClick = () => {
        if (!this.state.expanded.includes(2)) {
            this.setState(() => ({
                expanded: [...this.state.expanded, 2]
            }));
        } else {
            this.setState(() => ({
                expanded: this.state.expanded.filter(x => x !== 2)
            }));
        }
    }

    handleOnExpand = (row, isExpand, rowIndex, e) => {
        if (isExpand) {
            this.setState(() => ({
                expanded: [...this.state.expanded, row.id]
            }));
        }
        else {
            this.setState(() => ({
                expanded: this.state.expanded.filter(x => x !== row.id)
            }));
        }
    }

    render() {
        const expandRow = {
            renderer: row => (
                <>
                    <TableContainer
                        tableClassName="product-table table-shadow"
                        columns={columnsTable}
                        data={data}
                        isGlobalFilter={true}
                        isAddCustomer={true}
                        isAddTableBorderStrap={true}
                        getTablePropsC={() => ({
                            className: "product-table",
                        })}
                    />
                </>
            ),
        };
        return (
            <div className="page-content dashboard">
                <div className="container-fluid">
                    <div>
                        <Row className="d-flex flex-wrap">
                            <Col
                                className='ml-1'
                            >
                                <input
                                    type="text"
                                    placeholder="pesant name.."
                                    className="form-control w-25 x-2"
                                // value={searchtext}
                                // onChange={(e) => handleChange(e)}
                                />
                                {/* {getSuggestions()} */}

                            </Col>
                        </Row>

                    </div>
                    <div className="d-flex flex-row-reverse">
                        <Link className="top-btn pb-3 btn-invoice" to="/doctor">
                            <div>
                                <i className="uil-plus"></i>
                            </div>
                            {"  "}Add New
                        </Link>
                    </div>
                    <div>
                        <BootstrapTable
                            rowStyle={{
                                backgroundColor: "#ffedd8"
                            }}
                            keyField="id"
                            data={products} columns={columns} expandRow={expandRow} />
                    </div>
                </div>
            </div>
        );
    }
}




const Morning = cell => {

    return (
        <>
            {
                cell.row.original.morning == true ? <img src={right} /> : <img src={crose} />
            }
        </>
    )
}
const Afternoon = cell => {

    return (
        <>
            {
                cell.row.original.Afternoon == true ? <img src={right} /> : <img src={crose} />
            }
        </>
    )
}
const Evening = cell => {

    return (
        <>
            {
                cell.row.original.Evening == true ? <img src={right} /> : <img src={crose} />
            }
        </>
    )
}