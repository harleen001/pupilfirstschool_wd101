

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
        const newRow = entriesTable.insertRow();
        newRow.insertCell().textContent = name;
        newRow.insertCell().textContent = email;
        newRow.insertCell().textContent = password;
        newRow.insertCell().textContent = dob.toISOString().split('T')[0];
        newRow.insertCell().textContent = acceptedTerms ? 'Yes' : 'No';

        // Clear the form
        form.reset();
        document.getElementById('terms').checked = false;
    });

    function loadEntries() {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.forEach(entry => {
            const newRow = entriesTable.insertRow();
            newRow.insertCell().textContent = entry.name;
            newRow.insertCell().textContent = entry.email;
            newRow.insertCell().textContent = entry.password;
            newRow.insertCell().textContent = entry.dob;
            newRow.insertCell().textContent = entry.acceptedTerms ? 'Yes' : 'No';
        });
    }
});
