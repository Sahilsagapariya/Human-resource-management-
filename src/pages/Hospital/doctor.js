import React, { useState } from 'react';
import { Table, Button, Form, Card } from 'react-bootstrap';
import "./doctor.css"
import "./AutoComplete.css";
import "./pesentModel"
import { Typeahead } from 'react-bootstrap-typeahead';
import { Link } from "react-router-dom";
import data from './data';
//************************** */
import {
  Col,
  Modal,
  ModalBody,
  Row,
} from "reactstrap"

import AttendanceModal from "./pesentModel"
const lang = [
  { name: "sahil sagapariya", age: "18", mobleNo: "56498797546197", email: "sahilpatel@gmail.com" },
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

const Tablepriceription = () => {
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

  //Edit
  const handleEditEmployeeAttendance = () => {
    setOpenAttendanceEdit(true)
  }



  const handleChange = (e) => {
    let searchval = e.target.value;
    if (searchval.length > 0) {
      setSuggest([...lang].filter((ele, index) => ele.name.includes(searchval.toLowerCase())))
      setResfound(suggest.length !== 0 ? true : false);
    }

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
          <Modal isOpen={show} centered={true}>
            <ModalBody>
              <div className="card mt-4 bg-danger " >
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
                      className="btn btn-success btn-lg ms-2"
                    // onClick={setShow(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </ModalBody>
          </Modal>
          : ""}
      </ul>
    );
  };


  /******************** */
  const initialValues = { medicine: [{ name: '', description: '', morning: false, afternoon: false, evening: false, select: '', tablet: '' }] }
  const [rows, setRows] = useState([{ name: '', description: '', morning: false, afternoon: false, evening: false, select: '', tablet: '' }]);

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
    let dataList = [...rows]
    if (e.target.checked == true) {
      dataList[row].morning = true
    }
    else {
      dataList[row].morning = false
    }
    setRows(dataList)
  }

  function hendalChangeAfter(e, row) {
    let dataList = [...rows]
    if (e.target.checked == true) {
      dataList[row].afternoon = true
    }
    else {
      dataList[row].afternoon = false
    }
    setRows(dataList)
  }

  function hendalChangeEvening(e, row) {
    let dataList = [...rows]
    if (e.target.checked == true) {
      dataList[row].evening = true
    }
    else {
      dataList[row].evening = false
    }
    setRows(dataList)
  }

  return (
    <>
      <div className="page-content dashboard">
        <div className="container-fluid">

          <Row className="d-flex flex-wrap">
            <Col
              className='ml-2'
            >
              <input
                type="text"
                placeholder="pesant name.."
                className="form-control w-50 x-2"
                value={searchtext}
                onChange={(e) => handleChange(e)}
              />
              {getSuggestions()}
            </Col>
            <Col className='text-end '>
              <div className="d-flex flex-row-reverse">
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
              </div>

            </Col>
          </Row>
          <Table striped bordered hover variant="danger" className="table mb-4 mt-4 table-`border`">
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
                    <Typeahead
                      allowNew
                      newSelectionPrefix="+ Add New : "
                      id="basic-typeahead-single"
                      labelKey={option => `${option.name}`}
                      onChange={(item) => changesmedicin(item, index)}
                      options={medicine}
                      placeholder="select medicine....."

                      selected={row.name}

                    />
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
                        onChange={(e) => hendalChange(e, index)}
                        checked={row.morning}

                      />
                    </Form.Group>

                    {row.morning == true ?

                      <Form.Check
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
                        onChange={(e) => hendalChangeAfter(e, index)}
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
                        onChange={(e) => hendalChangeEvening(e, index)}
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
              className="btn btn-primary w-30 waves-effect waves-light btn-save m-0"
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

export default Tablepriceription;
