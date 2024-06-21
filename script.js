document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const uploadBtn = document.getElementById('upload-btn');
    const pdfList = document.getElementById('pdf-list');
    const dbRequest = indexedDB.open('BerylPharmacoDB', 1);

    let db;

    dbRequest.onupgradeneeded = function(event) {
        db = event.target.result;
        const objectStore = db.createObjectStore('pdfs', { keyPath: 'name' });
    };

    dbRequest.onsuccess = function(event) {
        db = event.target.result;
        loadPDFList();
    };

    dbRequest.onerror = function(event) {
        console.error('Database error:', event.target.error);
    };

    uploadBtn.addEventListener('click', () => {
        const file = fileInput.files[0];
        if (file && file.type === 'application/pdf') {
            const reader = new FileReader();
            reader.onload = function(event) {
                const pdfData = event.target.result;
                const transaction = db.transaction(['pdfs'], 'readwrite');
                const objectStore = transaction.objectStore('pdfs');
                const pdfRecord = {
                    name: file.name,
                    data: pdfData
                };
                const request = objectStore.add(pdfRecord);

                request.onsuccess = function() {
                    loadPDFList();
                };

                request.onerror = function() {
                    console.error('Failed to save PDF');
                };
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload a valid PDF file');
        }
    });

    function loadPDFList() {
        while (pdfList.firstChild) {
            pdfList.removeChild(pdfList.firstChild);
        }
        const transaction = db.transaction(['pdfs'], 'readonly');
        const objectStore = transaction.objectStore('pdfs');
        const request = objectStore.openCursor();

        request.onsuccess = function(event) {
            const cursor = event.target.result;
            if (cursor) {
                const link = document.createElement('a');
                link.href = cursor.value.data;
                link.textContent = cursor.value.name;
                link.target = '_blank';
                pdfList.appendChild(link);
                cursor.continue();
            }
        };

        request.onerror = function() {
            console.error('Failed to retrieve PDFs');
        };
    }
});
