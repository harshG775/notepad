import { useState } from "react";
import Card from "./Card";
import DropIndicator from "./DropIndicator";
import AddCard from "./AddCard";

export default function Column(props) {
    const { title, headingColor, column, cards, setCards } = props;
    const [active, setActive] = useState(false);
    const handleDragStart = (e, title, id) => {
        e.dataTransfer.setData("cardId", id);
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        heighLighterIndicator(e);
        setActive(true);
    };
    const heighLighterIndicator = (e) => {
        const indicators = getIndicator();
        clearHeighLights(indicators);
        const el = getNearestIndicator(e, indicators);
        el.element.style.opacity = "1";
    };
    const clearHeighLights = (els) => {
        const indicators = els || getIndicator();
        indicators.forEach((el) => {
            el.style.opacity = "0";
        });
    };
    const getNearestIndicator = (e, indicators) => {
        const DISTANCE_OFFSET = 50;
        const el = indicators.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = e.clientY - (box.top + DISTANCE_OFFSET);
                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            },
            {
                offset: Number.NEGATIVE_INFINITY,
                element: indicators[indicators.length - 1],
            }
        );
        return el;
    };
    const getIndicator = () => {
        return Array.from(
            document.querySelectorAll(`[data-column="${column}"]`)
        );
    };
    const handleDragLeave = (e) => {
        e.preventDefault();
        setActive(false);
        clearHeighLights();
    };
    const handleDragEnd = (e) => {
        e.preventDefault();
        setActive(false);
        clearHeighLights();
        const cardId = e.dataTransfer.getData("cardId");
        const indicators = getIndicator();
        const { element } = getNearestIndicator(e, indicators);
        const before = element.dataset.before || "-1";
        if (before !== cardId) {
            let copy = [...cards];
            let cardToTransfer = copy.find((card) => card.id === cardId);
            if (!cardToTransfer) return;
            cardToTransfer = { ...cardToTransfer, column };
            copy = copy.filter((card) => card.id !== cardId);
            const moveToBack = before === "-1";
            if (moveToBack) {
                copy.push(cardToTransfer);
            } else {
                const insertAtIndex = copy.findIndex(
                    (card) => card.id === before
                );
                if (insertAtIndex === undefined) return;
                copy.splice(insertAtIndex, 0, cardToTransfer);
            }
            setCards(copy);
        }
    };
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
                className={`h-full w-full transition-colors ${
                    active ? "bg-neutral-800/50" : "bg-neutral-800/0"
                }`}
            >
                {filteredCards.map((card) => (
                    <Card
                        key={card.id}
                        {...card}
                        handleDragStart={handleDragStart}
                    />
                ))}
                <li>
                    <DropIndicator beforeId={"-1"} column={column} />
                </li>
                <li>
                    <AddCard column={column} setCards={setCards} />
                </li>
            </ul>
        </div>
    );
}
