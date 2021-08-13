import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Table from '../components/Table';

function HomePage({ setExerciseToEdit }) {
    const [exercises, setExercises] = useState([]);
    const history = useHistory();

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }

    const deleteExercise = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setExercises(exercises.filter(e => e._id !== _id));
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`);
        }
    };

    const editExercise = exercise => {
        setExerciseToEdit(exercise);
        history.push('/edit-exercise');
    }

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <h1>Exercise Tracker</h1>
            <p>Keep track of your workout regimen.</p>
            <Table exercises={exercises} deleteExercise={deleteExercise} editExercise={editExercise} />
            <Link to="/add-exercise">Add an exercise</Link>
        </>
    );
}

export default HomePage;