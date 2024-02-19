import { useState } from "react";
import { motion } from "framer-motion"
const DEFAULT_CARDS = [
	// BACKLOG
	{ title: "Look into render bug in dashboard", id: "1", column: "backlog" },
	{ title: "SOX compliance checklist", id: "2", column: "backlog" },
	{ title: "[SPIKE] Migrate to Azure", id: "3", column: "backlog" },
	{ title: "Document Notifications service", id: "4", column: "backlog" },
	// TODO
	{
		title: "Research DB options for new microservice",
		id: "5",
		column: "todo",
	},
	{ title: "Postmortem for outage", id: "6", column: "todo" },
	{ title: "Sync with product on Q3 roadmap", id: "7", column: "todo" },

	// DOING
	{
		title: "Refactor context providers to use Zustand",
		id: "8",
		column: "doing",
	},
	{ title: "Add logging to daily CRON", id: "9", column: "doing" },
	// DONE
	{
		title: "Set up DD dashboards for Lambda listener",
		id: "10",
		column: "done",
	},
];

function DropIndicator(props) {
    const { beforeId, column } = props;
    return (
		<div
			data-before={beforeId || "-1"}
			data-column={column}
			className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
		/>
	);
}
function Card(props) {
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
function AddCard(props) {
    const {column,setCards} = props;
    const [text, setText] = useState("");
    const [adding,setAdding] = useState(false);
    const handleAdd = (e) => {
        e.preventDefault();
        if(!text.trim()) return;
        const newCard = {
            column,
            title: text,
            id: crypto.randomUUID(),
        }
        setCards(p=>[...p,newCard]);
        setAdding(false);
        setText("");
    }
    return (
        <>
        {adding
            ?<motion.form layout onSubmit={handleAdd}>
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
            :<motion.button 
                layout
                type="button"
                onClick={() => {
                    setAdding(true);
                }}
                className="w-full rounded border border-neutral-700 bg-neutral-800 p-3 text-sm text-neutral-100"
                >
                <span>Add Card</span>
            </motion.button>
        }
        </>
    )
}
function Column(props) {
	const { title, headingColor, column, cards, setCards } = props;
	const [active, setActive] = useState(false);
    const handleDragStart = (e,title,id) => {
        e.dataTransfer.setData("cardId",id);
    }
    const handleDragOver = (e) => {
        e.preventDefault();
        heighLighterIndicator(e)
        setActive(true);
    }
    const heighLighterIndicator = (e) => {
        const indicators = getIndicator();
        clearHeighLights(indicators);
        const el = getNearestIndicator(e,indicators);
        el.element.style.opacity = "1";
    }
    const clearHeighLights = (els) => {
        const indicators =els||getIndicator();
        indicators.forEach((el)=>{
            el.style.opacity = "0";
        })
    }
    const getNearestIndicator = (e,indicators) => {
        const DISTANCE_OFFSET = 50;
        const el = indicators.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = e.clientY - (box.top+DISTANCE_OFFSET);
            if(offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            }else {
                return closest;
            }
        }, {
			offset: Number.NEGATIVE_INFINITY,
			element: indicators[indicators.length - 1],
		});
        return el;
    }
    const getIndicator = () => {
        return Array.from(document.querySelectorAll(`[data-column="${column}"]`))
    }
    const handleDragLeave = (e) => {
        e.preventDefault();
        setActive(false);
        clearHeighLights()
    }
    const handleDragEnd = (e) => {
        e.preventDefault();
        setActive(false);
        clearHeighLights()
        const cardId = e.dataTransfer.getData("cardId");
        const indicators = getIndicator();
        const {element} = getNearestIndicator(e,indicators);
        const before = element.dataset.before || "-1";
        if (before !== cardId) {
            let copy = [...cards];
            let cardToTransfer = copy.find((card) => card.id === cardId);
            if(!cardToTransfer) return;
            cardToTransfer = {...cardToTransfer, column};
            copy = copy.filter((card) => card.id !== cardId);
            const moveToBack = before === "-1";
            if (moveToBack) {
                copy.push(cardToTransfer);
            }else {
                const insertAtIndex = copy.findIndex((card) => card.id === before)
                if(insertAtIndex ===undefined) return;
                copy.splice(insertAtIndex, 0, cardToTransfer);
            }
            setCards(copy);
        }
    }
    const filteredCards = cards.filter((card) => card.column === column);
	return (
		<div className="w-56 shrink-0">
			<div className="mb-3 flex items-center justify-between">
				<h4 className={`font-medium ${headingColor}`}>{title}</h4>
				<span className="rounded text-sm text-neutral-400">
					{filteredCards.length}
				</span>
			</div>
			<ul
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDragEnd}
                className={`h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"}`}>
                {filteredCards.map((card) => (
                    <Card key={card.id} {...card} handleDragStart={handleDragStart}/>
                ))}
                <li><DropIndicator beforeId={"-1"} column={column}/></li>
                <li><AddCard column={column} setCards={setCards}/></li>
            </ul>
		</div>
	);
}
const BurnBarrel = ({ setCards }) => {
    const [active, setActive] = useState(false);
    const handleDragOver = (e) => {
        e.preventDefault();
        setActive(true);
    }
    const handleDragLeave = (e) => {
        e.preventDefault();
        setActive(false);
    }
    const handleDrop = (e) => {
        e.preventDefault();
        setActive(false);
        const cardId = e.dataTransfer.getData("cardId");
        console.log(cardId);
        setCards(prev=>prev.filter((card)=>card.id !== cardId));
    }
    return (
		<div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
				active
					? "border-red-800 bg-red-800/20 text-red-500"
					: "border-neutral-500 bg-neutral-500/20 text-neutral-500"
			}`}
		>
            {active ? 
            <svg className="animate-bounce" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M17.66 11.2c-.23-.3-.51-.56-.77-.82c-.67-.6-1.43-1.03-2.07-1.66C13.33 7.26 13 4.85 13.95 3c-.95.23-1.78.75-2.49 1.32c-2.59 2.08-3.61 5.75-2.39 8.9c.04.1.08.2.08.33c0 .22-.15.42-.35.5c-.23.1-.47.04-.66-.12a.58.58 0 0 1-.14-.17c-1.13-1.43-1.31-3.48-.55-5.12C5.78 10 4.87 12.3 5 14.47c.06.5.12 1 .29 1.5c.14.6.41 1.2.71 1.73c1.08 1.73 2.95 2.97 4.96 3.22c2.14.27 4.43-.12 6.07-1.6c1.83-1.66 2.47-4.32 1.53-6.6l-.13-.26c-.21-.46-.77-1.26-.77-1.26m-3.16 6.3c-.28.24-.74.5-1.1.6c-1.12.4-2.24-.16-2.9-.82c1.19-.28 1.9-1.16 2.11-2.05c.17-.8-.15-1.46-.28-2.23c-.12-.74-.1-1.37.17-2.06c.19.38.39.76.63 1.06c.77 1 1.98 1.44 2.24 2.8c.04.14.06.28.06.43c.03.82-.33 1.72-.93 2.27"/></svg>
            :<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m20.37 8.91l-1 1.73l-12.13-7l1-1.73l3.04 1.75l1.36-.37l4.33 2.5l.37 1.37zM6 19V7h5.07L18 11v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2"/></svg>
            }

        </div>
	);
};
  
function Board() {
	const [cards, setCards] = useState(DEFAULT_CARDS);
	return (
		<div className=" flex h-full w-full gap-2 overflow-scroll p-12">
			<Column
				title="Backlog"
				headingColor="text-neutral-500"
				column="backlog"
				cards={cards}
				setCards={setCards}
			/>
			<Column
				title="TODO"
				headingColor="text-yellow-200"
				column="todo"
				cards={cards}
				setCards={setCards}
			/>
			<Column
				title="In Progress"
				headingColor="text-blue-200"
				column="doing"
				cards={cards}
				setCards={setCards}
			/>
			<Column
				title="Complete"
				headingColor="text-green-200"
				column="done"
				cards={cards}
				setCards={setCards}
			/>
            <BurnBarrel 
                setCards={setCards}
            />
		</div>
	);
}
export default function NoteBoard() {
	return (
		<div>
			<div className="h-screen w-full bg-neutral-900 text-neutral-50">
                <Board />
            </div>
		</div>
	);
}
