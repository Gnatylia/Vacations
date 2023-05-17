import React, { useState, useEffect } from 'react'
import VacationForm from './VacationForm';
import VacationItem from './VacationItem';
import { Modal, Button } from 'react-bootstrap';
import Graf from './Graf';

const Vacations = ({ history }) => {

    const [vacations, setVacations] = useState([]);
    const [show, setShow] = useState(false);
    const [edititem, setEdititem] = useState(null);
    const [showgraf, setShowgraf] = useState(false);

    const handleClose = () => {
        console.log('Vacations.handleClose: setShow false');
        setShow(false)
    };
    const handleShow = () => setShow(true);

    const handleCloseGraf = () => {
        console.log('Vacations.handleCloseGraf: setShow false');
        setShowgraf(false)
    };
    const handleShowGraf = () => setShowgraf(true);

    const role = sessionStorage.getItem('role');

    useEffect(() => {
        getVacations()
    }, []);

    const getVacations = () => {
        if (!sessionStorage.getItem('name')) {
            history.push("/login");
            return;
        }
        (async () => {
            const result = await fetch("http://localhost:4000/vacations", {
                headers: {
                    "token": sessionStorage.token
                }
            });
            const _vacations = await result.json();
            console.log("Vacations.useEffect: _vacations ", _vacations);
            setVacations(_vacations);
        })()
    }

    const openEditForm = (item) => {
        console.debug('Vacations.editItem: item = ', item);
        setEdititem(item);
        handleShow();
    }

    const addItem = () => {
        console.debug('Vacations.addItem: ');
        setEdititem(null);
        handleShow();
    }

    const getItems = () => {
        return vacations.map((v) => (
            <VacationItem key={v.id} item={v} editItem={openEditForm} />
        ));
    }

    return (
        <div>
            {
                (role == 'admin') ? (
                    <div className="btnsAdmin">
                        <Button onClick={() => addItem()}>Add Vacation</Button>
                        <Button onClick={() => handleShowGraf()}>Show graf</Button>
                    </div>
                ) : (
                        <></>
                    )
            }
            <div style={{ clear: 'right' }}>{getItems()}</div>

            <Modal show={show} onHide={handleClose}>
                <button style={{ position: 'absolute', right: '0', top: '0', zIndex: 10 }} onClick={() => handleClose()}>X</button>
                <Modal.Body>
                    <VacationForm closeForm={handleClose} item={edititem} getVacations={getVacations} />
                </Modal.Body>
            </Modal>

            <Modal show={showgraf} onHide={handleCloseGraf}>
                <button style={{ position: 'absolute', left: '0', top: '0', zIndex: 10 }} onClick={() => handleCloseGraf()}>X</button>
                <Modal.Body>
                    <Graf closeGraf={handleCloseGraf} items={vacations} />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Vacations