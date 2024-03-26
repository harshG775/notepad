import { useState } from "react";
import { useForm } from "react-hook-form";
import {motion} from "framer-motion"
export default function AddCard(props) {
    const [adding,setAdding]=useState();
    const { handleAddCard ,type} = props;
    const {register,handleSubmit,formState:{errors}} = useForm({})
    const onSubmit=({title})=>{
        handleAddCard({
            title:title,
            type: type,
            id:crypto.randomUUID()
        })
    }
    return (
        <motion.div
        layout
        >
            {adding?
            <form onSubmit={handleSubmit(onSubmit)}>
                <textarea className="w-full bg-slate-800 p-2 rounded-md"
                 type="text" {...register("title",{
                    required: {
                        value:true,
                        message:"input could not be empty"
                    }
                })} />
                <p className="text-xs text-red-700 font-medium">{errors.title&& errors.title.message}</p>
                <div className="flex justify-end gap-2 text-xs">
                    <button onClick={()=>setAdding(false)} type="button">Cancel</button>
                    <button>add</button>
                </div>
            </form>
            
            :
            <button
                className="w-full p-2 border-2 border-neutral-500/20 bg-neutral-800 shadow-sm shadow-neutral-500/20 rounded-md"
                onClick={()=>setAdding(true)}
                >
                Add Note
            </button>
            }
        </motion.div>
    );
}