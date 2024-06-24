document.addEventListener('DOMContentLoaded', () => {
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('fileInput');
    const notesList = document.getElementById('notesList');

    uploadBtn.addEventListener('click', () => {
        const file = fileInput.files[0];
        if (file) {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = URL.createObjectURL(file);
            link.download = file.name;
            link.textContent = file.name;
            listItem.appendChild(link);
            notesList.appendChild(listItem);
        } else {
            alert('Please select a file to upload.');
        }
    });
});
