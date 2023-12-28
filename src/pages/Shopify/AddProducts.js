import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

import "bootstrap/dist/css/bootstrap.min.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import {
  Col,
  Card,
  CardBody,
  Form,
  Label,
  Input,
  FormFeedback,
  FormGroup,
  CardHeader,
} from "reactstrap"

function BtEntryList() {
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: "",
      discription: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Please Enter Your First Name"),
      lastname: Yup.string().required("Please Enter Your Last Name"),
      city: Yup.string().required("Please Enter Your City"),
      state: Yup.string().required("Please Enter Your State"),
      zip: Yup.string().required("Please Enter Your Zip"),
    }),
    onSubmit: values => {
      console.log("values", values)
    },
  })
  const handleClose = () => {
    validation.resetForm()
    onCloseClick()
  }
  /////////////////////////////////////////////////////////////////
  return (
    <React.Fragment>
      <div className="page-content dashboard">
        <div className="container-fluid">
          <Card>
            <CardHeader className="bg-transparent">
              <span className="fs-2 fw-bold">BT Reports</span>
            </CardHeader>
            <CardBody>
              <Form
                className="needs-validation"
                onSubmit={e => {
                  e.preventDefault()
                  validation.handleSubmit()
                  return false
                }}
              >
                <FormGroup className="mb-3">
                  <Label htmlFor="validationCustom01">First name</Label>
                  <Input
                    name="title"
                    placeholder="Title"
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.title || ""}
                    invalid={
                      validation.touched.title && validation.errors.title
                        ? true
                        : false
                    }
                  />
                  {validation.touched.title && validation.errors.title ? (
                    <FormFeedback type="invalid">
                      {validation.errors.title}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
                <Editor
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName" 
                />
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    </React.Fragment>
  )
}
BtEntryList.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default BtEntryList
