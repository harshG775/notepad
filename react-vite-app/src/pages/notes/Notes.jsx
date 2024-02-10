import { useState } from "react";
import AllNotes from "./components/AllNotes";
import CreateNote from "./components/CreateNote";
import Dialog from "@/components/Dialog";
export default function Notes() {
	const [isOpen, setIsOpen] = useState(false);
    const onSaveChanges = () => setIsOpen(false);
	return (
		<div className="min-h-[calc(100vh-40px)] bg-neutral-900  text-neutral-50">
			<AllNotes/>

			<Dialog {...{ isOpen, setIsOpen }} btnLabel="Add Note">
			<CreateNote onSaveChanges={onSaveChanges}/>
            </Dialog>
		</div>
	);
}
