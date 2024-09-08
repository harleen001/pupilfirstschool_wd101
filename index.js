document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const entriesTable = document.getElementById('entriesTable').getElementsByTagName('tbody')[0];

    // Load saved entries from localStorage
    loadEntries();

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = new Date(document.getElementById('dob').value);
        const acceptedTerms = document.getElementById('terms').checked;

        // Validate Date of Birth
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        const isValidAge = age >= 18 && age <= 55 && (monthDiff > 0 || (monthDiff === 0 && today.getDate() >= dob.getDate()));

        if (!isValidAge) {
            alert('Date of Birth must be between 18 and 55 years old.');
            return;
        }

        // Add entry to local storage
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.push({ name, email, password, dob: dob.toISOString().split('T')[0], acceptedTerms });
        localStorage.setItem('entries', JSON.stringify(entries));

        // Add entry to the table
        addEntryToTable(name, email, password, dob.toISOString().split('T')[0], acceptedTerms ? 'Yes' : 'No');

        // Clear the form
        form.reset();
        document.getElementById('terms').checked = false;
    });

    function loadEntries() {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.forEach(entry => {
            addEntryToTable(entry.name, entry.email, entry.password, entry.dob, entry.acceptedTerms ? 'Yes' : 'No');
        });
    }

    function addEntryToTable(name, email, password, dob, acceptedTerms) {
        const newRow = entriesTable.insertRow();
        newRow.insertCell().textContent = name;
        newRow.insertCell().textContent = email;
        newRow.insertCell().textContent = password;
        newRow.insertCell().textContent = dob;
        newRow.insertCell().textContent = acceptedTerms;
    }
});
