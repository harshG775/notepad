import { useState } from "react";
import AddCard from "./AddCard";
import Card from "./Card";
export default function Column(props) {
    const { notes,type,handleAddCard } = props;
    const [active,setActive] = useState(false)
    const title = type.replace("-"," ")
    const filteredNotes = notes.filter((e)=>e.type===type)
    

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
        console.log(e.dataTransfer.getData("cardId"))

    }
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