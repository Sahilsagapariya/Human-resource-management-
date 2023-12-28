import React, { useState } from 'react';
import { Table, Button, Form, Switch } from 'react-bootstrap';
import "./doctor.css"
import "./AutoComplete.css";
import "./pesentModel"
import { Typeahead } from 'react-bootstrap-typeahead';
import { Link } from "react-router-dom"
import data from "./data"
//************************** */
import {
    Row,
    Col,
} from "reactstrap";

import AttendanceModal from "./pesentModel"
const lang = [{ name: "sahil sagapariya", age: "18", mobleNo: "56498797546197", email: "sahilpatel@gmail.com" },
{ name: "chirag kothiya", age: "20", mobleNo: "65487895235", email: "chiragkothiya@gmail.com" },
{ name: "priya patel", age: "21", mobleNo: "564974651797", email: "priyapatel@gamil.com" },
{ name: "bhavil sagapariya ", age: "22", mobleNo: "654745197945", email: "bhavilpatel@gmail.com" },
{ name: "krunal lunagariya", age: "20", mobleNo: "5467541986", email: "krunallunagariya@2384gmail.com" },
{ name: "raksit kotadiya", age: "19", mobleNo: "56599746521", email: "rakshitpatel@gmail.com" },
{ name: "parsh thumar", age: "20", mobleNo: "654123987", email: "parshpatel@gmail.com" },
{ name: "kishan kothiya", age: "17", mobleNo: "6541233978", email: "kishanpatel@02234gmail.com" },
{ name: "meet ramani", age: "23", mobleNo: "74125963256", email: "meetramani2003@gmail.com" },
{ name: "krunal kakdiya", age: "25", mobleNo: "65879879875", email: "krunalpatel@2004gmail.com" },
{ name: "parth kakdiya", age: "20", mobleNo: "656423111982", email: "parthakadiya@2003gmail.com" },
]

const PersonalInfo = () => {
    /********************************** */
    const [openAttendanceEdit, setOpenAttendanceEdit] = useState(false)

    const [searchtext, setSearchtext] = useState("");
    const [suggest, setSuggest] = useState([]);
    const [resfound, setResfound] = useState(true);
    const [newObj, setNewObj] = useState({
        name: "", age: 0, mobleNo: "", email: ""
    })
    const [searchData, setSearchData] = useState([])
    const [show, setShow] = useState(false)
    const [suggeestData, setSuggestData] = useState({})
    const [isChecked, setIsChecked] = useState(false);
    const [selected, setSelected] = useState([])
    //Edit
    const handleEditEmployeeAttendance = () => {
        setOpenAttendanceEdit(true)
    }



    const handleChange = (e) => {
        let searchval = e.target.value;
        if (searchval.length > 0) {
            setSuggest([...lang].filter((ele, index) => ele.name.includes(searchval.toLowerCase())))
            setResfound(suggest.length !== 0 ? true : false);
            // setSuggest(searchData)
        }
        // if (searchData.length > 0) {
        //   setSuggest(searchData
        //   )
        // }
        setSearchtext(searchval);
    };

    const suggestedText = (value) => {
        console.log(value);
        setSearchtext(value);
        setSuggest([])
    };

    const getSuggestions = () => {
        if (suggest.length !== 0 && searchtext !== "" && !resfound) {
            return (<> <Button onClick={handleEditEmployeeAttendance}> + Add New</Button >

                <AttendanceModal
                    // id={cell.row.original.employee_Id}
                    show={openAttendanceEdit}
                    onCloseClick={() => setOpenAttendanceEdit(false)}
                />

            </>
            )
        }

        return (
            <ul>
                {suggest.map((item, index) => {
                    return (
                        <div key={index}>
                            <div>
                                <li onClick={() => {
                                    setShow(true)
                                    suggestedText(item.name)
                                    setSuggestData(item)
                                }}>{item.name}</li>
                                {index !== suggest.length - 1 && <hr />}<br />
                            </div>
                        </div>
                    );

                })}
                {show == true ?

                    <div className="card" >
                        <div className="card-body">

                            <div className="form-group row">

                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control-plaintext" id="staticEmail" value={suggeestData?.email} />

                                </div>
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Age</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control-plaintext" id="staticEmail" value={suggeestData?.age} />
                                </div>

                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Number</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control-plaintext" id="staticEmail" value={suggeestData?.mobleNo} />
                                </div>
                            </div>
                            <div className="text-center mt-3">
                                <Link className="" to="/table">
                                    <button type="submit" className="btn btn-success btn-lg ms-2">
                                        watch history
                                    </button>
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-lg ms-2"
                                // onClick={handleClick}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                    : ""}
            </ul>
        );
    };


    /******************** */
    const initialValues = { medicine: [{ name: '', description: '', morning: false, afternoon: false, evening: false, select: '', tablet: '' }] }
    const [rows, setRows] = useState(data);

    const addRow = () => {
        setRows([...rows, { name: '', description: '', morning: false, afternoon: false, evening: false, select: '', tablet: '' }]);
    }

    const handleDeleteRow = (index) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    }

    const handleCheckboxChange = (index, checkboxName) => {
        const newRows = [...rows];
        newRows[index][checkboxName] = !newRows[index][checkboxName];
        setRows(newRows);
    }

    const handleSelectChange = (index, value) => {
        const newRows = [...rows];
        newRows[index].select = value;
        setRows(newRows);
    }
    const handleSelectChangeTablet = (index, value) => {
        const newRows = [...rows];
        newRows[index].tablet = value;
        setRows(newRows);
    }
    function submitData() {
        console.log(rows)
    }


    const medicine_temp = [
        { name: "Acetaminophen", description: "test", type: "tablet" },
        { name: "Adderall", description: "test", type: "tablet" },
        { name: "Amitriptyline", description: "test", type: "tablet" },
        { name: "Amlodipine", description: "test", type: "tablet" },
        { name: "Humira", description: "test", type: "capsule" },
        { name: "Viagra", description: "test", type: "capsule" },
        { name: "Narcan", description: "test", type: "capsule" },
        { name: "Onpattro", description: "test", type: "capsule" },
        { name: "Esticof", description: "test", type: "syrup" },
        { name: "Jiwadaya", description: "test", type: "syrup" },
        { name: "Himalaya  ", description: "test", type: "syrup" },
        { name: "Charak ", description: "test", type: "syrup" }
    ]
    const [medicine, setMedicine] = useState(medicine_temp);
    // console.log(medicine)



    const changesmedicin = (item, index) => {
        // console.log(item)
        if (item && item.length > 0 && item[0].customOption) {
            let data = {
                name: item[0].label,
                // description: item[0].label,
                // type: "tablet"
            }
            setMedicine([...medicine, data])
            const newRows = [...rows];
            newRows[index].name = [data];
            setRows(newRows);
        }
        else {
            const newRows = [...rows];
            newRows[index].name = item;
            setRows(newRows);
        }
    }

    function hendalChange(e, row) {
        let dataList = [...data]
        if (e.target.checked == true) {
            dataList.filter(item => item.id == row.id ? item.morning = true : item.morning)
        }
        else {
            dataList.filter(item => item.id == row.id ? item.morning = false : item.morning)
        }
        setRows(dataList)
    }

    function hendalChangeAfter(e, row) {
        let dataList = [...data]
        if (e.target.checked == true) {
            dataList.filter(item => item.id == row.id ? item.afternoon = true : item.afternoon)
        }
        else {
            dataList.filter(item => item.id == row.id ? item.afternoon = false : item.afternoon)
        }
        setRows(dataList)
    }

    function hendalChangeEvening(e, row) {
        let dataList = [...data]
        if (e.target.checked == true) {
            dataList.filter(item => item.id == row.id ? item.evening = true : item.evening)
        }
        else {
            dataList.filter(item => item.id == row.id ? item.evening = false : item.evening)
        }
        setRows(dataList)
    }
    return (
        <>
            <div className="page-content dashboard py-50px">
                <div className="container-fluid">

                    <Row className="d-flex">
                        <Col md={9}>
                            <input
                                type="text"
                                placeholder="pesant name.."
                                className="form-control w-25"
                                value={searchtext}
                                onChange={(e) => handleChange(e)}
                            />
                            {getSuggestions()}
                        </Col>
                        <Col md={3} className='text-end'>
                            <button
                                type='button'
                                className="btn btn-primary w-20 waves-effect waves-light btn-save m-0"
                                onClick={addRow}
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                <i className="uil-plus"></i>
                                Add New
                            </button>

                        </Col>
                    </Row>
                    <Table striped bordered hover variant="danger" className="table table-`border`">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>name</th>
                                <th>description</th>
                                <th>morning</th>
                                <th>Afternoon</th>
                                <th>evening</th>
                                <th>A/B</th>
                                <th>Tablet</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>

                                    <td className='txt'>
                                        <Form.Control type="text"
                                            value={row.name} onChange={(e) => {
                                                const newRows = [...rows];
                                                newRows[index].name = e.target.value;
                                                setRows(newRows);
                                            }} />
                                    </td>
                                    <td className='txt'>
                                        <Form.Control type="text"
                                            value={row.description} onChange={(e) => {
                                                const newRows = [...rows];
                                                newRows[index].description = e.target.value;
                                                setRows(newRows);
                                            }} />
                                    </td>

                                    <td className='input' >
                                        {/* <Form.Check type="checkbox"
                                            checked={row.morning} onChange={() => handleCheckboxChange(index, 'morning')} /> */}
                                        <Form.Group controlId="formCheckbox">
                                            <Form.Check
                                                type="checkbox"
                                                onChange={(e) => hendalChange(e, row)}
                                                checked={row.morning}

                                            />
                                        </Form.Group>

                                        {row.morning == true ? <Form.Check
                                            type="switch"
                                            id="custom-switch"
                                        /> : ""}
                                    </td>
                                    <td className='input' >
                                        {/* <Form.Check type="checkbox"
                                            checked={row.afternoon} onChange={() => handleCheckboxChange(index, 'afternoon')} /> */}
                                        <Form.Group controlId="formCheckbox">
                                            <Form.Check
                                                type="checkbox"
                                                onChange={(e) => hendalChangeAfter(e, row)}
                                                checked={row.afternoon}

                                            />
                                        </Form.Group>

                                        {row.afternoon == true ? <Form.Check
                                            type="switch"
                                            id="custom-switch"
                                        /> : ""}
                                    </td>
                                    <td className='input' >
                                        {/* <Form.Check type="checkbox"
                                            checked={row.evening} onChange={() => handleCheckboxChange(index, 'evening')} /> */}
                                        <Form.Group controlId="formCheckbox">
                                            <Form.Check
                                                type="checkbox"
                                                onChange={(e) => hendalChangeEvening(e, row)}
                                                checked={row.evening}

                                            />
                                        </Form.Group>

                                        {row.evening == true ? <Form.Check
                                            type="switch"
                                            id="custom-switch"
                                        /> : ""}
                                    </td>
                                    <td>
                                        <Form.Control as="select" value={row.select} onChange={(e) => handleSelectChange(index, e.target.value)}>
                                            <option value="">Select</option>
                                            <option value="After">After</option>
                                            <option value="Before">Before</option>
                                        </Form.Control>
                                    </td>
                                    <td>
                                        <Form.Control as="select" value={row.tablet} onChange={(e) => handleSelectChangeTablet(index, e.target.value)}>
                                            <option value="">Select</option>
                                            <option value="0.5">0.5</option>
                                            <option value="1 full">1 full</option>
                                        </Form.Control>
                                    </td>
                                    <td>

                                        <Button variant="danger" onClick={() => handleDeleteRow(index)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="btn-group mt-20">
                        <button
                            className="btn btn-primary w-30 waves-effect waves-light btn-save m-0 y-bottom-3%"
                            type="button"
                            onClick={submitData}
                        >
                            SUBMIT
                        </button>
                    </div>
                </div>
            </div>
        </>

    );
}

export default PersonalInfo;


// import { useState } from 'react';
// import { Form, Col, Switch } from 'react-bootstrap';

// function CheckboxSwitch() {
//     const [isChecked, setIsChecked] = useState(false);

//     return (
//         <div className="page-content dashboard py-50px">
//             <div className="container-fluid">
//                 <Form>
//                     <Form.Group controlId="formCheckbox">
//                         <Form.Check
//                             type="checkbox"
//                             label="Toggle Switch"
//                             checked={isChecked}
//                             onChange={(e) => setIsChecked(e.target.checked)}
//                         />
//                     </Form.Group>

//                     {isChecked ? (
//                         <Form.Group as={Col} controlId="formSwitch">
//                             <Form.Label>Switch Label</Form.Label>
//                             <Switch />
//                         </Form.Group>
//                     ) : null}
//                 </Form>
//             </div>
//         </div>
//     );
// }
// export default CheckboxSwitch;