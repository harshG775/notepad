import { useState } from "react";
import AllNotes from "./components/AllNotes";
import CreateNote from "./components/CreateNote";

function Dialog({ children, isOpen, setIsOpen }) {
    const handleToggle = () => setIsOpen(prev=>!prev);
	return (
        <>
            <div onClick={handleToggle} className={` z-[99] fixed inset-0 bg-black bg-opacity-40 ${isOpen?"":"hidden"} flex justify-center items-center w-screen h-screen`}>
            </div>
            <div className={`z-[100] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  bg-blue-500 ${isOpen?"":"hidden"}`}>
                <div className="bg-neutral-50 text-neutral-900 ">
                    <div>
                        <button
                            onClick={handleToggle}
                            className="bg-red-500 text-neutral-50"
                        >
                            +
                        </button>
                    </div>
                    {children}
                </div>
            </div>
            <div>
				<button onClick={handleToggle}>open</button>
			</div>
        </>
	);
}
export default function Notes() {
	const [isOpen, setIsOpen] = useState(false);
    const onSaveChanges = () => setIsOpen(false);
	return (
		<div className="min-h-[calc(100vh-40px)] bg-neutral-900  text-neutral-50">
			<AllNotes/>

			<Dialog {...{ isOpen, setIsOpen }}>
			<CreateNote onSaveChanges={onSaveChanges}/>
            </Dialog>
		</div>
	);
}
