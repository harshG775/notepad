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
    const handleDrop = (e) => {
        e.preventDefault()
        setActive(false)
    }
    return (
        <li className={active?"bg-neutral-800/50":""} 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        >
            <h2 className="uppercase whitespace-nowrap font-bold text-blue-700">{title} : {filteredNotes.length}</h2>
            <ul className="bg-neutral-900  text-neutral-50 grid gap-2">
                {filteredNotes.length > 0 && 
                    filteredNotes?.map((note)=>(
                        <Card key={note.id} note={note}/>
                    )
                )}
                <AddCard handleAddCard={handleAddCard} type={type}/>
            </ul>
        </li>
    );
}