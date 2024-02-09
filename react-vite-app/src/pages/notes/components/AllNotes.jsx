
import Context_db from "../../../store/Context_db";
import { useContext } from "react";
import { Actions } from "../../../store/Reducer_db";

function Note(props) {
    const { note } = props;
    const [state, dispatch] = useContext(Context_db);
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
                <button className="bg-blue-500">edit</button>
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
