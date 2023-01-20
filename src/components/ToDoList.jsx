import React, { useState } from 'react';
import uuid from 'react-uuid';
export default function ToDoList() {
    const initNotes = [
        {id:uuid(),name:'Task1',finished:false },
        {id:uuid(),name:'Task2',finished:true },
        {id:uuid(),name:'Task3',finished:false },
        {id:uuid(),name:'Task4',finished:false },
    ]
    const [notes, setNotes] = useState(initNotes);
	const [obj, setObj] = useState(getInitObj());
	const [editId, setEditId] = useState(null);
	function delItem(id){
        setNotes(notes.filter(note => note.id!==id))
    }
	const result = notes.map(note => {
		return <ul class = 'task' key={note.id}>
            <li><input type="checkbox" class ='check' value = {note.finished} checked = {note.finished} onClick={(event)=>changeCheck(note.id)}/></li>
            <p>{note.finished}</p>
            <li class = {note.finished?'finished task__text':'task__text'} onClick = {() => setEditId(note.id)}  >  {note.name}</li>
			<button class = 'btn'onClick={() => delItem(note.id)}>Delete</button>
		</ul>;
	});
    
    function changeCheck(id){
		setNotes(notes.map(note =>note.id === id ? {...note,finished:!note.finished} : note));

    }
	function getValue(prop) {
		if (editId) {
			return notes.reduce((res, note) => note.id === editId ? note[prop] : res, '');
		} else {
			return obj[prop];
		}
	}
	
	function changeItem(prop, event) {
		if (editId) {
			setNotes(notes.map(note =>
				note.id === editId ? {...note, [prop]: event.target.value} : note
			));
		} else {
			setObj({...obj, [prop]: event.target.value});
		}
	}
	
	function saveItem() {
		if (editId) {
			setEditId(null);
		} else {
			setNotes([...notes, obj]);
			setObj(getInitObj());
		}
	}
	
	return <div>
        <div className="container">
		<input class = 'input' placeholder='Add Todo...' value={getValue('name')} onChange={event => changeItem('name', event)}/>
		<button onClick={saveItem}>submit</button>

		{result}
        </div>
	</div>;
}

function getInitObj() {
	return {
		id: uuid(),
		name: '',
		finished: false,
	}
}