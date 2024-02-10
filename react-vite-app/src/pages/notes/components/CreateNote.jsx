import Context_db from "@/store/Context_db";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import {Actions} from "@/store/Reducer_db";
export default function CreateNote({onSaveChanges}) {
    const { register, handleSubmit } = useForm();
    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = useContext(Context_db);
    const handleOnCreateNote = (formData) => {
        console.log(formData);
        dispatch({
            actionType: Actions.CREATE,
            payload: [...state.notes,{
                id:crypto.randomUUID(),
                title:formData.title,
                content:formData.note
            }]
        })
        onSaveChanges()
    }
    return (
		<form onSubmit={handleSubmit(handleOnCreateNote)}>
			<ul className="grid grid-cols-1 gap-2 p-4">
				<li>
					<label htmlFor="title">title</label>
					<input type="text"  className="w-full bg-neutral-800 text-neutral-50 rounded-md px-4 py-1" {...register("title")} id="title" />
				</li>
				<li>
					<label htmlFor="note">note</label>
					<textarea cols="30" rows="2" className="w-full bg-neutral-800 text-neutral-50 rounded-md px-4 py-1" {...register("note")} id="note"></textarea>
				</li>
			</ul>
            <button className="bg-blue-400 hover:bg-blue-500 text-neutral-50 rounded-md py-1 px-4">Save</button>
		</form>
	);
}