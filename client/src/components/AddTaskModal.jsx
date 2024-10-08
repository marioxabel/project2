import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddTaskModal = ({ show, toggle, children }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [points, setPoints] = useState(0);
    const [selectedChild, setSelectedChild] = useState('');  // Estado para almacenar el hijo seleccionado

    const handleSubmit = () => {
        const newTask = {
            taskName,
            description,
            points,
            childId: selectedChild,  // El ID del hijo seleccionado
        };
        // Lógica para agregar la tarea
        toggle();  // Cierra el modal después de agregar la tarea
    };

    return (
        <Modal show={show} onHide={toggle}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="taskName">
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="description" className="mt-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>


                    {/* Dropdown para seleccionar el hijo */}
                    <Form.Group controlId="childSelect" className="mt-3">
                        <Form.Label>Select Child</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedChild}
                            onChange={(e) => setSelectedChild(e.target.value)}
                        >
                            <option value="">Select a child...</option>
                            {children.map((child) => (
                                <option key={child.id} value={child.id}>
                                    {child.first_name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={toggle}>Close</Button>
                <Button variant="primary" onClick={handleSubmit}>Save Task</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddTaskModal;
