import localforage from "localforage";
import { create } from "zustand";
import { noteKey } from "../data/Consts";

interface INote {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    modifiedAt: Date;
}

interface INotesState {
    notes: INote[];
    openedNote: INote | null;
    initializeNotepad: () => Promise<void>;
    createNote: () => void;
    removeNote: (id: number) => void;
    openNote: (id: number) => void;
    closeNote: () => void;
    editContentNote: (content: string) => void;
    editTitleNote: (title: string) => void;
    noteListView: "simple" | "detailed";
    setNoteListView: (view: "simple" | "detailed") => void;
}

export const useNotesState = create<INotesState>((set, get) => ({
    notes: [],
    openedNote: null,
    initializeNotepad: async () => {
        try {
            const savedNotes = await localforage.getItem<INote[]>(noteKey);
            const notelistView = await localforage.getItem<
                "simple" | "detailed"
            >("noteListView");
            set({
                notes: savedNotes || [],
                noteListView: notelistView || "detailed",
            });
        } catch (error) {
            console.error("Failed to load notes:", error);
        }
    },
    createNote: () => {
        const date = new Date();
        const notes = get().notes;

        const newNote: INote = {
            id: date.valueOf(),
            title: "Untitled",
            content: "",
            createdAt: date,
            modifiedAt: date,
        };

        const newNotes = [...notes, newNote];

        localforage.setItem(noteKey, newNotes);

        set({
            openedNote: newNote,
            notes: newNotes,
        });
    },
    removeNote: (id) => {
        const notes = get().notes;
        const newNotes = notes.filter((note) => id != note.id);

        localforage.setItem(noteKey, newNotes);

        set({
            openedNote: null,
            notes: newNotes,
        });
    },
    openNote: (id) => {
        const notes = get().notes;
        const note = notes.find((note) => id == note.id);

        set({
            openedNote: note || null,
        });
    },
    closeNote: () => set({ openedNote: null }),
    editContentNote: (content) => {
        const s = get();
        if (!s.openedNote) return;
        const updatedNote = {
            ...s.openedNote,
            content,
            modifiedAt: new Date(),
        };

        const updatedNotes = s.notes.map((n) =>
            n.id === updatedNote.id ? updatedNote : n,
        );

        localforage.setItem(noteKey, updatedNotes);

        set({
            openedNote: updatedNote,
            notes: updatedNotes,
        });
    },
    editTitleNote: (title) => {
        const s = get();
        if (!s.openedNote) return;
        const updatedNote = {
            ...s.openedNote,
            title,
            modifiedAt: new Date(),
        };

        const updatedNotes = s.notes.map((n) =>
            n.id === updatedNote.id ? updatedNote : n,
        );

        localforage.setItem(noteKey, updatedNotes);

        set({
            openedNote: updatedNote,
            notes: updatedNotes,
        });
    },
    noteListView: "detailed",
    setNoteListView: (view) => {
        localforage.setItem("noteListView", view);
        set({ noteListView: view });
    },
}));
