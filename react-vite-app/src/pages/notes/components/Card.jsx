export default function Card(props) {
    const { note } = props
    return (
        <li
         className="cursor-grab p-2 border-2 border-neutral-500/20 bg-neutral-800 shadow-sm shadow-neutral-500/20 rounded-md"
        draggable="true"
        >
            {note.title}
        </li>
    );
}
