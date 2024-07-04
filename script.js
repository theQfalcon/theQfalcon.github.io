document.addEventListener("DOMContentLoaded", function() {
    const lectureNotes = [
        { title: "MTH102", link: "MTH102.pdf" },
        { title: "Drug Metabolism", link: "#" },
        { title: "Pharmacokinetics", link: "#" },
        { title: "Pharmacodynamics", link: "#" },
        { title: "Clinical Trials", link: "#" }
    ];

    const lectureNotesContainer = document.getElementById("lecture-notes");

    lectureNotes.forEach(note => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("lecture-note");

        const noteTitle = document.createElement("span");
        noteTitle.textContent = note.title;

        const noteLink = document.createElement("a");
        noteLink.href = note.link;
        noteLink.textContent = "Download";

        noteElement.appendChild(noteTitle);
        noteElement.appendChild(noteLink);

        lectureNotesContainer.appendChild(noteElement);
    });
});
