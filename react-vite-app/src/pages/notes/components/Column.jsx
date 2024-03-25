import AddCard from "./AddCard";

function Card(props) {
    const { note } = props
    return (
        <li>
            {note.title}
        </li>
    );
}

export default function Column(props) {
    const { notes,type,handleAddCard } = props;
    const title = type.replace("-"," ")
    const filteredNotes = notes.filter((e)=>e.type===type)
    return (
        <li>
            <h2 className="uppercase whitespace-nowrap font-bold text-blue-700">{title}</h2>
            <ul className="bg-neutral-900  text-neutral-50">
                {filteredNotes.length > 0 && 
                    filteredNotes?.map((note)=>(
                        <Card key={note.id} note={note}/>
                    )
                )}
            </ul>
            <AddCard handleAddCard={handleAddCard} type={type}/>
        </li>
    );
}