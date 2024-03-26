import { motion } from "framer-motion"
export default function Card(props) {
    const { note ,handleDragStart} = props
    return (
        <motion.li
        layout
         className="cursor-grab p-2 border-2 border-neutral-500/20 bg-neutral-800 shadow-sm shadow-neutral-500/20 rounded-md"
        draggable="true"
        onDragStart={(e)=>handleDragStart(e,note.id,note.type)}
        >
            {note.title}
        </motion.li>
    );
}
