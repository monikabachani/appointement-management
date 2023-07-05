import React from 'react';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DoctorAvailabilityForm = () => {
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        doctorId: Yup.number().required('Doctor name is required'),
        date: Yup.date().min(new Date(), "Date must be of future").required('Date is required'),
        startTime: Yup.string().required('Start Time is required'),
        endTime: Yup.string().required('End Time is required'),
        // .when('startTime', {
        //     is: (startTime,endTime) => startTime > endTime,
        //     then: Yup.string().required("Start Time can't be greater than End Time"),
        //     },['startTime', 'endTime']),
        slotDuration: Yup.number().required('Slot Duration Time is required')
    });

    const initialValues = {
        doctorId: '',
        date: "",
        startTime: "",
        endTime: "",
        slotDuration: ""
    };

    const handleSubmit = async (values) => {
        // Handle form submission
        console.log(values);
        try {
            const response = await axios.post(`http://localhost:3000/doctor/add-slots`, values);
            console.log(response.data);
            if (response.data) {
                new Swal({
                    title: "success",
                    icon: "success",
                    status: "success"
                })
                navigate('/create-appointment');
            }
        } catch (error) {
            new Swal({
                title: "Someting went wrong",
                icon: "error",
                timer: "2000",
                status: "error"
            })
            console.error(error);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, handleChange, handleSubmit }) => (
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(values)
                }}>
                    <h1>Doctor Slots</h1>
                    <Link to={"/create-appointment"}> Create Appointment</Link>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="doctorId">
                                <Form.Label>Doctor Id</Form.Label>
                                <Form.Control type="text" name="doctorId" placeholder="Enter Doctor Id" value={values.doctorId} onChange={handleChange} />
                                <ErrorMessage name="doctorId" component="div" className='invalid' />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="date">
                                <Form.Label>Availability Date</Form.Label>
                                <Form.Control type="date" min={new Date()} name='date' placeholder="Enter Availability Date" value={values.date} onChange={handleChange} />
                                <ErrorMessage name="date" component="div" className='invalid' />
                            </Form.Group>
                        </Col>
                        <Col md={6}>

                            <Form.Group controlId="startTime">
                                <Form.Label>Start time</Form.Label>
                                <Form.Control type="time" name='startTime' placeholder="Enter Start time" onChange={handleChange} />
                                <ErrorMessage name="startTime" component="div" className='invalid' />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="endTime">
                                <Form.Label>End time</Form.Label>
                                <Form.Control type="time" placeholder="Enter End time" onChange={handleChange} />
                                <ErrorMessage name="endTime" component="div" className='invalid' />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="slotDuration">
                                <Form.Label>Slot Duration</Form.Label>
                                <select className='form-control' name='slotDuration' type="select" onChange={handleChange} value={values.slotDuration}  >
                                    <option value={""}>select</option>
                                    <option value={15}>15 Minutes</option>
                                    <option value={30}>30 Minutes</option>
                                    <option value={45}>45 Minutes</option>
                                    <option value={60}>60 Minutes</option>
                                </select>
                                <ErrorMessage name="slotDuration" component="div" className='invalid' />

                            </Form.Group>
                        </Col>
                    </Row>
                    <Button style={{ float: "left" }} className='mt-4' type="submit">Submit</Button>
                </Form>
            )}
        </Formik>
    );
};

export default DoctorAvailabilityForm;
