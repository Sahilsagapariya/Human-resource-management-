import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import del from "../Hospital/imges/table-delete.svg"

import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import "./doctor.css"

import { AsyncTypeahead, Typeahead } from 'react-bootstrap-typeahead';
const SEARCH_URI = 'https://api.github.com/search/users';

const customStyles = {
  control: base => ({
    ...base,
    height: 50,
    minHeight: 50,
  }),
}

const handleOnSearch = (string, results, field) => {
  // onSearch will have as the first callback parameter
  // the string searched and for the second the results.
  field.name
  console.log(string, results)
}

const handleOnHover = (result) => {
  // the item hovered
  console.log(result)
}

const handleOnSelect = (item) => {
  // the item selected
  console.log(item)
}

const handleOnFocus = () => {
  console.log('Focused')
}

const formatResult = (item) => {
  return (
    <>
      <span style={{ display: 'red', textAlign: 'left', BackgroundColor: 'red' }}>{item.name}</span>
    </>
  )
}
const Tablepriceription = () => {
  const [hintData, setHintData] = useState([])
  const [text, setText] = useState('')

  const initialValues = {
    friends: [
      { name: '', description: '', morning: '', afternon: '', evening: '', select: '', Howmany: '' }
    ]

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


  ///************************* */
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = (query) => {
    setIsLoading(true);

    fetch(`${SEARCH_URI}?q=${query}+in:login&page=1&per_page=50`)
      .then((resp) => resp.json())
      .then(({ items }) => {
        setOptions(items);
        setIsLoading(false);
      });
  };

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;


  const MyInput = ({ field, form }) => {
    const changesmedicin = (item) => {
      // console.log(item)
      if (item && item.length > 0 && item[0].customOption) {
        let data = {
          name: item[0].name,
          description: item[0].name,
          type: "tablet"
        }
        form.setFieldValue(field.name, [data])
        setMedicine([...medicine, data])
      }
    }
 
    return (
      <>
        <Typeahead
          allowNew
          newSelectionPrefix="+ Add New : "
          id="basic-typeahead-single"
          labelKey="name"
          onChange={(item) => changesmedicin(item)}
          options={medicine}
          placeholder="Choose a state..."
          defaultSelected={form?.values?.friends[0]?.name}
          // selected={[ { name: "Acetaminophen", description: "test", type: "tablet" }]}
        />
        {/* {console.log('form.values.friends[0].name', form.values.friends[0].name)} */}
        {/* {console.log('field', field)}
        {console.log('form', form)} */}
        {/* <AsyncTypeahead
          allowNew
          newSelectionPrefix="Add a new item: "
          filterBy={filterBy}
          id="async-example"
          isLoading={isLoading}
          labelKey="login"
          minLength={3}
          onSearch={handleSearch}
          // onChange={(item) => console.log(item)}
          // selected={form.values.friends[0].name}
          options={options}
          placeholder="Search for a Github user..."
        // renderMenuItemChildren={(option) => (
        //   <>
        //     <img
        //       alt={option.login}
        //       src={option.avatar_url}
        //       style={{
        //         height: '24px',
        //         marginRight: '10px',
        //         width: '24px',
        //       }}
        //     />
        //     <span>{option.login}</span>
        //   </>
        // )}
        /> */}
      </>

    )
  };

  return (
    <div className="page-content dashboard">
      <div className="container-fluid">
        <Formik initialValues={initialValues}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
            console.log("values", values)
          }}
        >
          {(values) => (
            <Form>
              <FieldArray name="friends">
                {({ insert, remove, push }) => (
                  <div>
                    <div className="d-flex flex-row-reverse">
                      <button
                        type='button'
                        className="btn btn-sm btn-primary ps-3 pe-3 font-size-7 rounded-4"
                        onClick={() => push({})}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <i className="uil-plus"></i>
                        Add New
                      </button>
                    </div>
                    <Table striped>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>name</th>
                          <th>description</th>
                          <th>M</th>
                          <th>A</th>
                          <th>E</th>
                          <th>A/B</th>
                          <th>T</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {values?.values?.friends?.length > 0 &&
                          values?.values.friends.map((friend, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td className='autosearch'>
                                <Field
                                  name={`friends.${index}.name`}
                                  component={MyInput}
                                />
                              </td>
                              <td>
                                <Field
                                  name={`friends.${index}.description`}
                                  placeholder="description"
                                  type="text"
                                  style={{
                                    position: "none",
                                    border: "1px solid hsl(0, 0%, 70%)",
                                    borderRadius: "12px",
                                  }}
                                  className="form-control w-100 bordered ms-2"
                                />
                              </td>
                              <td className="input">
                                <Field
                                  name={`friends.${index}.morning`}
                                  type="checkbox"
                                  value={friend.morning}
                                  checked={values?.values.friends[index].morning}
                                  className="form-check-input"
                                />
                              </td>
                              <td className="input">
                                <Field
                                  name={`friends.${index}.afternon`}
                                  type="checkbox"
                                  value={friend.morning}
                                  checked={values?.values.friends[index].afternon}
                                  className="form-check-input"
                                />
                              </td>
                              <td className="input">
                                <Field
                                  name={`friends.${index}.evening`}
                                  type="checkbox"
                                  value={friend.morning}
                                  checked={values?.values.friends[index].evening}
                                  className="form-check-input"
                                />
                              </td>
                              <td>
                                <Field
                                  as="select"
                                  name={`friends.${index}.select`}
                                  style={{
                                    border: "1px solid hsl(0, 0%, 70%)",
                                    borderRadius: "9px",
                                  }}
                                  className="form-control w-70 bordered ms-1"
                                >
                                  <option >select</option>
                                  <option value="After">After</option>
                                  <option value="Before">Before</option>
                                </Field>
                              </td>
                              <td>
                                <Field
                                  as="select"
                                  name={`friends.${index}.Howmany`}
                                  style={{
                                    border: "1px solid hsl(0, 0%, 70%)",
                                    borderRadius: "9px",
                                  }}
                                  className="form-control w-70 bordered ms-1"
                                >
                                  <option >select</option>
                                  <option value="After">0.5</option>
                                  <option value="Before">1 full</option>
                                </Field>
                              </td>
                              <td>
                                <Button variant="danger" onClick={() => remove(index)}>  <img src={del} alt="" /> </Button>
                              </td>
                            </tr>
                          ))}

                      </tbody>
                    </Table>
                    <div className="  m-5 text-center">

                      <button
                        className="top-btn pb-3 btn-invoice"
                        type="submit"
                      >
                        SUBMIT
                      </button>
                    </div>
                  </div>
                )}
              </FieldArray>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Tablepriceription;
