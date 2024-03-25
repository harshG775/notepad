import { useForm } from "react-hook-form";
export default function AddCard(props) {
    const { handleAddCard ,type} = props;
    const {register,handleSubmit} = useForm({})
    const onSubmit=({title})=>{
        handleAddCard({
            title:title,
            type: type,
            id:crypto.randomUUID()
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("title")} />
                <button>add</button>
            </form>
        </div>
    );
}