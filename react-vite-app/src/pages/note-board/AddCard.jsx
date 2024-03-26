import { useState } from "react";
import { motion } from "framer-motion";
export default function AddCard(props) {
    const { column, setCards } = props;
    const [text, setText] = useState("");
    const [adding, setAdding] = useState(false);
    const handleAdd = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        const newCard = {
            column,
            title: text,
            id: crypto.randomUUID(),
        };
        setCards((p) => [...p, newCard]);
        setAdding(false);
        setText("");
    };
    return (
        <>
            {adding ? (
                <motion.form layout onSubmit={handleAdd}>
                    <div>
                        <label htmlFor="card-title">card title</label>
                        <textarea
                            onChange={(e) => setText(e.target.value)}
                            autoFocus
                            placeholder="Add new task..."
                            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
                        ></textarea>
                    </div>
                    <div className="mt-1.5 flex items-center justify-end gap-1.5">
                        <button
                            type="button"
                            onClick={() => setAdding(false)}
                            className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
                        >
                            <span>Add</span>
                        </button>
                    </div>
                </motion.form>
            ) : (
                <motion.button
                    layout
                    type="button"
                    onClick={() => {
                        setAdding(true);
                    }}
                    className="w-full rounded border border-neutral-700 bg-neutral-800 p-3 text-sm text-neutral-100"
                >
                    <span>Add Card</span>
                </motion.button>
            )}
        </>
    );
}
