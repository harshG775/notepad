import { useEffect, useState } from "react";
import Column from "./components/Column";
import BurnBarrel from "./components/BurnBarrel";

const notesData = [
    {
        title:"Document",
        type: "completed",
        id:"1"
    },
    {
        title:"service",
        type: "in-progress",
        id:"2"
    },
    {
        title:"Notifications",
        type: "todo",
        id:"3"
    },
    {
        title:"post",
        type: "on-hold",
        id:"4"
    },
]
export default function Notes() {
    const [notes,setNotes] = useState([])
    useEffect(()=>{
        setNotes(notesData)
    },[])
    const handleAddCard = (newCard)=>{
        setNotes((prev)=>{
            return [
                ...prev,
                newCard
            ]
        })
    }
    const handleDeleteCard = (newCard)=>{
        setNotes((prev)=>{
            return [
                ...prev,
                newCard
            ]
        })
    }
	return (
        <>
            <BurnBarrel
                handleDeleteCard={handleDeleteCard}
            />
            <ul className="min-h-[calc(100vh-40px)] overflow-x-auto   text-neutral-50
                grid grid-cols-[repeat(4,200px)] gap-2 p-2
            ">
                <Column 
                    notes={notes} 
                    type={"todo"}
                    handleAddCard={handleAddCard}
                />
                <Column 
                    notes={notes} 
                    type={"in-progress"}
                    handleAddCard={handleAddCard}
                />
                <Column 
                    notes={notes} 
                    type={"completed"}
                    handleAddCard={handleAddCard}
                />
                <Column 
                    notes={notes} 
                    type={"on-hold"}
                    handleAddCard={handleAddCard}
                />
            </ul>
        </>
	);
}







// import { useState } from "react";
// import AllNotes from "./components/AllNotes";
// import CreateNote from "./components/CreateNote";
// import Dialog from "@/components/Dialog";
// export default function Notes() {
// 	const [isOpen, setIsOpen] = useState(false);
//     const onSaveChanges = () => setIsOpen(false);
// 	return (
// 		<div className="min-h-[calc(100vh-40px)] bg-neutral-900  text-neutral-50">
// 			<AllNotes/>

// 			<Dialog {...{ isOpen, setIsOpen }} btnLabel="Add Note">
// 			<CreateNote onSaveChanges={onSaveChanges}/>
//             </Dialog>
// 		</div>
// 	);
// }
