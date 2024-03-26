import { useState } from "react";
import AddCard from "./AddCard";
import Card from "./Card";
export default function Column(props) {
    const { notes,setNotes,type,handleAddCard } = props;
    const [active,setActive] = useState(false)
    const title = type.replace("-"," ")

    const handleDragOver = (e) => {
        e.preventDefault()
        setActive(true)
    }
    const handleDragLeave = (e) => {
        e.preventDefault()
        setActive(false)
    }
    const handleDragStart = (e,id) => {
        e.dataTransfer.setData("cardId",id)
    }
    const handleDrop = (e) => {
        e.preventDefault()
        setActive(false)
        const draggedCardId= e.dataTransfer.getData("cardId");
        const copyNotes = [...notes]
        const newCardData = copyNotes.find((note)=>note.id === draggedCardId)
        if(newCardData.type===type){
            return
        }
        newCardData.type=type
        /* deleted from old column */
        const  filteredNotes = notes.filter((note)=>note.id !== draggedCardId)
        setNotes([...filteredNotes,newCardData])

        

        

    }
    const filteredNotes = notes.filter((e)=>e.type===type)

    return (
        <li 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        >
            <h2 className="uppercase whitespace-nowrap font-bold text-blue-700">{title} : {filteredNotes.length}</h2>
            <ul className={`${active?"bg-neutral-900/90":""}   text-neutral-50 space-y-2 gap-2 rounded-md min-h-96`}>
                {filteredNotes.length > 0 && 
                    filteredNotes?.map((note)=>(
                        <Card key={note.id} note={note} handleDragStart={handleDragStart}/>
                    )
                )}
                <AddCard handleAddCard={handleAddCard} type={type}/>
            </ul>
        </li>
    );
}