import AllNotes from "./components/AllNotes";
import CreateNote from "./components/CreateNote";
export default function Notes() {
    return (
        <div className="min-h-[calc(100vh-40px)] bg-neutral-900  text-neutral-50">
            <CreateNote/>
            <AllNotes/>
        </div>
    );
}