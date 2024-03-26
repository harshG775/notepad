import { motion } from "framer-motion";
import DropIndicator from "./DropIndicator";
export default function Card(props) {
    const { title, id, column ,handleDragStart} = props;
    return(
        <li>
            <DropIndicator beforeId={id} column={column}/>
            <motion.div
                layout
                layoutId={id}
                draggable="true"
                onDragStart={e=>handleDragStart(e,title, id, column)}
                className=" cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing">
                <p className="text-sm text-neutral-100">{title}</p>
            </motion.div>
        </li>
    )
}