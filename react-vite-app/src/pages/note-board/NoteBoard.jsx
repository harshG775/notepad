import { useState } from "react";
import BurnBarrel from "./BurnBarrel";
import Column from "./Column";
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

export default function NoteBoard() {
    const [cards, setCards] = useState(DEFAULT_CARDS);
    return (
        <div>
            <div className="h-screen w-full bg-neutral-900 text-neutral-50">
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
                    <BurnBarrel setCards={setCards} />
                </div>
            </div>
        </div>
    );
}
