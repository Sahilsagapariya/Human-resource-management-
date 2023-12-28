import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import "./doctor.css"

const Tablepriceription = () => {

  const initialValues = {medicine:[{ input1: '', input2: '', checked1: false, checked2: false, checked3: false, select: '' }]}
  const [rows, setRows] = useState([{ input1: '', input2: '', checked1: false, checked2: false, checked3: false, select: '' }]);

  const addRow = () => {
    setRows([...rows, { input1: '', input2: '', checked1: false, checked2: false, checked3: false, select: '' }]);
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

  return (
    <div className="page-content dashboard">
      <div className="container-fluid">
        <Formik initialValues={initialValues} onSubmit={(values) => console.log(values)}>
          {(formik) => (
            <Form>
              <Table className="table table-`border`">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>name</th>
                    <th>description</th>
                    <th>morning</th>
                    <th>Afternoon</th>
                    <th>evening</th>
                    <th>A/B</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className='txt'>
                        <Form.Control type="text" name={`input1[${index}]`} value={row.input1} onChange={(e) => {
                          const newRows = [...rows];
                          newRows[index].input1 = e.target.value;
                          setRows(newRows);
                        }} />
                      </td>
                      <td className='txt'>
                        <Form.Control type="text" name={`input2[${index}]`} value={row.input2} onChange={(e) => {
                          const newRows = [...rows];
                          newRows[index].input2 = e.target.value;
                          setRows(newRows);
                        }} />
                      </td>
                      <td className='input' >
                        <Form.Check type="checkbox" name={`checked1[${index}]`} checked={row.checked1} onChange={() => handleCheckboxChange(index, 'checked1')} />
                      </td>
                      <td className='input' >
                        <Form.Check type="checkbox" name={`checked2[${index}]`} checked={row.checked2} onChange={() => handleCheckboxChange(index, 'checked2')} />
                      </td>
                      <td className='input'>
                        <Form.Check type="checkbox" name={`checked3[${index}]`} checked={row.checked3} onChange={() => handleCheckboxChange(index, 'checked3')} />
                      </td>
                      <td>
                        <Form.Control as="select" name={`select[${index}]`} value={row.select} onChange={(e) => handleSelectChange(index, e.target.value)}>
                          <option value="">Select</option>
                          <option value="Option 1">After</option>
                          <option value="Option 2">Before</option>
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
                  className="btn btn-primary w-20 waves-effect waves-light btn-save m-0"
                  onClick={addRow}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <i className="uil-plus"></i>
                  Add New
                </button>
                <button
                  className="btn btn-primary w-30 waves-effect waves-light btn-save m-0"
                  type="submit"
                >
                  SUBMIT
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Tablepriceription;
