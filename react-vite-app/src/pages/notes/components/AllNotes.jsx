
import Context_db from "@/store/Context_db";
import { useContext, useState } from "react";
import { Actions } from "@/store/Reducer_db";
import Dialog from "@/components/Dialog";

import { useForm } from "react-hook-form";
function EditNote({note,setIsEditorOpen}) {
    const [state, dispatch] = useContext(Context_db);
    const { register, handleSubmit } = useForm({
        defaultValues: {
            title: note.title,
            note: note.content
        }
    });
    const OnSave=(formData)=>{
        const updatedNote = {
            id:note.id,
            title:formData.title,
            content:formData.note
        }
        dispatch({
            actionType: Actions.EDIT,
            payload: state.notes.filter((note)=>note.id !== updatedNote.id).concat(updatedNote)
        })
        setIsEditorOpen(false)
    }
	return (
		<form onSubmit={handleSubmit(OnSave)}>
			<ul>
				<li>
					<label htmlFor="title">title</label>
					<input type="text" {...register("title")} id="title" />
				</li>
				<li>
					<label htmlFor="note">note</label>
					<input type="text" {...register("note")} id="note" />
				</li>
			</ul>
            <button>Save</button>
		</form>
	);
}
function Note(props) {
    const { note } = props;
    const [state, dispatch] = useContext(Context_db);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const handleDeleteNote = ()=>{
        const id = note.id
        const filtered = state.notes.filter((note)=>{
            return note.id !== id
        })
        dispatch({
            actionType: Actions.CREATE,
            payload: filtered
        })

    }
    return (
        <li className="p-2 border border-b-lime-600 rounded-md grid grid-cols-[1fr_auto]">
            <div>
                <div>{note.title}</div>
                <div>{note.content}</div>
            </div>
            <div className="text-xs flex flex-col justify-end gap-2">
                <button className="bg-blue-500" onClick={handleDeleteNote}>del</button>
                <Dialog isOpen={isEditorOpen} setIsOpen={setIsEditorOpen} btnLabel="Edit">
                    <EditNote note={note} setIsEditorOpen={setIsEditorOpen}/>
                </Dialog>
            </div>
        </li>
    )
}
export default function AllNotes() {
    // eslint-disable-next-line no-unused-vars
    const [state, _] = useContext(Context_db);
    return (
        <div>
            <div>All Notes</div>
            <ul className='grid gap-2 p-2 sm:grid-cols-4'>
                {state?.notes.map((note) => (
                    <Note key={note.id} note={note}/>
                ))}
            </ul>
            {state?.notes.length === 0 && <div>No Notes</div>}
        </div>
    )
}
