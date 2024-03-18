const create = (req, res) => {
    res.json("create");
};
const getAllNotes = (req, res) => {
    res.json("getAllNotes");
};
const getNoteById = (req, res) => {
    res.json("getNoteById");
};
const updateNoteById = (req, res) => {
    res.json("updateNoteById");
};
const deleteNoteById = (req, res) => {
    res.json("deleteNoteById");
};
export default {
    create,
    getAllNotes,
    getNoteById,
    updateNoteById,
    deleteNoteById,
};
