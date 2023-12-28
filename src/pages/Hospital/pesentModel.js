import PropTypes from "prop-types"
import React from "react"
import {
    Col,
    Modal,
    ModalBody,
    Row,
    Input,
    Label,
    FormGroup,
    FormFeedback,
    ModalHeader,
    Form,
} from "reactstrap"
import { Formik, useFormik } from "formik"
import * as Yup from "yup"
import { useState } from "react"

//Attendance Update Modal

const AttendanceModal = ({ show, onCloseClick }) => {
    const [fields, setFields] = useState({
        name: "",
        age: "",
        email: "",
        number: "",
    })

    function handleChange(e) {
        let { name, value } = e.target
        setFields({
            ...fields, [name]: value
        })
    }

    const handleClick = () => {
        console.log(fields)
        onCloseClick()
    }
    return (
        <Modal isOpen={show} toggle={onCloseClick} centered={true}>
            <ModalHeader>Add Name</ModalHeader>
            <ModalBody>
                <Form
                    className="form-horizontal floating-form my-account"
                    onSubmit={e => {
                        e.preventDefault()
                        // validation.handleSubmit()
                        return false
                    }}
                >
                    <Row>
                        <Col lg={6}>
                            <FormGroup floating>
                                <Input
                                    type="text"
                                    id="firstName"
                                    name="name"
                                    placeholder="First Name"
                                    value={fields.name}
                                    onChange={(e) => handleChange(e)}
                                />
                                <Label
                                    for="firstName"

                                >
                                    First Name
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col lg={6}>
                            <FormGroup floating>
                                <Input
                                    type="number"
                                    id="Age"
                                    bsSize="lg"
                                    name="age"
                                    value={fields.age}

                                    className="w-100 text-start ps-3 pt-3"
                                    onChange={(e) => handleChange(e)}

                                    placeholder="Age"
                                />
                                <Label for="Age">Age</Label>

                            </FormGroup>
                        </Col>

                    </Row>
                    <Row>
                        <Col lg="6">
                            <FormGroup floating>
                                <Input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={fields.email}
                                    placeholder="Email"
                                    onChange={(e) => handleChange(e)}

                                />
                                <Label>
                                    Email
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col lg="6">
                            <FormGroup floating>
                                <Input
                                    type="number"
                                    id="mobileNumber"
                                    name="number"
                                    value={fields.number}
                                    placeholder="Mobile Number"
                                    onChange={(e) => handleChange(e)}
                                />
                                <Label>
                                    Mobile Number
                                </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="text-center mt-3">
                                <button type="submit" className="btn btn-success btn-lg ms-2">
                                    + Add
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-lg ms-2"
                                    onClick={handleClick}
                                >
                                    Cancel
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
        </Modal>
    )
}
AttendanceModal.propTypes = {
    onCloseClick: PropTypes.func,
    show: PropTypes.any,
}
export default AttendanceModal;