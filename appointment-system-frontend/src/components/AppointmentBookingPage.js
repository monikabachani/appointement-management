import React, { useEffect, useState } from 'react';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import axios from 'axios';



const AppointmentBookingPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [time, setTime] = useState("");
    const validationSchema = Yup.object().shape({
        doctorId: Yup.number().required('Please select doctor')
    });

    const initialValues = {
        doctorId: '',
    };

    const handleSubmit = async (values) => {
        // Handle form submission
        console.log(values);
        var timeArr = time.split("-");
        let data = {
            ...values,
            startTime: timeArr[1],
            endTime: timeArr[2],
            date: timeArr[0]

        }
        try {
            const response = await axios.post(`http://localhost:3000/appointment/add`, data);
            console.log(response.data);
            if (response.data) {
                new Swal({
                    title: "success",
                    icon: "success",
                    status: "success"
                })
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

    const getDoctors = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/all-doctors`);
            if (response.data) {
                setDoctors(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const getTimeSlots = async (doctorId, page) => {
        try {
            const response = await axios.get(`http://localhost:3000/availability/${doctorId}?totalPages=10&page=${page}`);
            if (response.data) {
                setTimeSlots(response.data?.grouped);
                // setTotalPages(response.data.totalPages);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleTimeSlots = (e, id) => {
        var all = document.querySelectorAll(".bg-gradient");
        all.forEach(function (item, index) {
            if (item.classList.contains("bg-danger")) {
                item.classList.remove("bg-danger");
            }
        });

        var element = document.getElementById(id);
        element.classList.add("bg-danger");
        setTime(e.target.getAttribute('value'))
    }

    useEffect(() => {
        getDoctors();
    }, [])

    return (
        <div>
            <h2>Appointment Booking</h2>
            <Link to={"/"}> Create Slots</Link>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, handleSubmit, setFieldValue }) => (
                    <Form onSubmit={(e) => {
                        console.log("values", values);
                        e.preventDefault();
                        handleSubmit(values)
                    }}>
                        <Row>
                            <Col md={12} className='m-2'>
                                <Form.Group controlId="doctorId">
                                    <Form.Label>Doctor</Form.Label>
                                    <select className='form-control' name="doctorId" value={values.doctorId} onChange={(e) => {
                                        getTimeSlots(e.target.value, 1);
                                        setFieldValue("doctorId", e.target.value)
                                    }} >
                                        <option value={""}>select</option>
                                        {doctors.length > 0 && doctors.map((item) =>
                                            <option value={item._id}>{item._id}</option>
                                        )}
                                    </select>
                                    <ErrorMessage name="doctorId" component="div" className='invalid' />
                                </Form.Group>
                            </Col>
                            <Col md={12} className='m-2'>
                                <Form.Group controlId="date">
                                    <Row>
                                        {Object.keys(timeSlots).length > 0 && Object.keys(timeSlots).map((item) => {
                                            if (timeSlots[item]) {
                                                return <div className='col-sm-6 text-start'>
                                                    <div>{item}</div>
                                                    {timeSlots[item].slots.map((time) => {
                                                        return <p onClick={(e) => handleTimeSlots(e, time._id)}><div className='col-2 border bg-success bg-gradient' style={{ cursor: "pointer" }} value={`${item}-${time.startTime}-${time.endTime}`} id={time._id}>
                                                            <span>{time.startTime}</span>
                                                        </div> </p>
                                                    })}
                                                </div>
                                            }
                                        }
                                        )}
                                    </Row>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button style={{ float: "left" }} className='mt-4' type="submit">Submit</Button>
                    </Form>
                )}
            </Formik>
        </div >
    );
};

export default AppointmentBookingPage;
