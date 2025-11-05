document.addEventListener("DOMContentLoaded", function() {
    // 1. Find the new "Generate HTML" button
    const htmlBtn = document.getElementById("htmlBtn");

    // 2. When the user clicks it...
    htmlBtn.addEventListener("click", function() {
        
        // --- Gather Data from Form ---
        const fname = document.getElementById('fname').value;
        const mname = document.getElementById('mname').value;
        const nname = document.getElementById('nname').value;
        const lname = document.getElementById('lname').value;
        const mascotAdj = document.getElementById('mascotAdj').value;
        const mascotAnimal = document.getElementById('mascotAnimal').value;
        const divider = document.getElementById('divider').value;
        
        const picCaption = document.getElementById('picCaption').value;
        
        const personalBg = document.getElementById('personalBg').value;
        const profBg = document.getElementById('profBg').value;
        const acadBg = document.getElementById('acadBg').value;
        const compBg = document.getElementById('compBg').value;

        // --- Helper function to build the name string ---
        function buildNameString() {
            let name = fname;
            if (mname) name += ` ${mname}`;
            if (nname) name += ` "${nname}"`;
            name += ` ${lname}`;
            name += ` ${divider} ${mascotAdj} ${mascotAnimal}`;
            return name;
        }

        // --- Build the HTML String (as text) ---
        // We build a single string of HTML code.
        let htmlCode = `<h2>Introduction HTML</h2>\n\n`;
        htmlCode += `<h3>${buildNameString()}</h3>\n\n`;
        
        htmlCode += `<figure>\n`;
        htmlCode += `    <img src="images/me.jpg" alt="${picCaption}">\n`;
        htmlCode += `    <figcaption>${picCaption}</figcaption>\n`;
        htmlCode += `</figure>\n\n`;
        
        htmlCode += `<ul>\n`;
        htmlCode += `    <li><strong>Personal Background:</strong> ${personalBg}</li>\n`;
        htmlCode += `    <li><strong>Professional Background:</strong> ${profBg}</li>\n`;
        htmlCode += `    <li><strong>Academic Background:</strong> ${acadBg}</li>\n`;
        htmlCode += `    <li><strong>Primary Computer:</strong> ${compBg}</li>\n`;

        // Add Courses
        htmlCode += `    <li><strong>Courses I'm Taking:</strong>\n        <ul>\n`;
        const courseEntries = document.querySelectorAll("#coursesContainer .course-entry");
        courseEntries.forEach(entry => {
            const department = entry.querySelector('input[name="courseDept[]"]').value;
            const number = entry.querySelector('input[name="courseNum[]"]').value;
            const name = entry.querySelector('input[name="courseName[]"]').value;
            const reason = entry.querySelector('textarea[name="courseReason[]"]').value;
            htmlCode += `            <li>${department} ${number} - ${name}: ${reason}</li>\n`;
        });
        htmlCode += `        </ul>\n    </li>\n`;
        
        // Add Extras
        const quote = document.getElementById('quote').value;
        const quoteAuthor = document.getElementById('quoteAuthor').value;
        if (quote) {
             htmlCode += `    <li><strong>Quote:</strong> "${quote}" - <i>${quoteAuthor || 'Unknown'}</i></li>\n`;
        }
        
        // ... (You can add similar logic for funnyThing, shareThing, and links if needed) ...
        
        htmlCode += `</ul>\n`;

        // --- Manipulate the DOM ---
        
        // 5. Change the H2
        document.querySelector('main h2').textContent = 'Introduction HTML';

        const form = document.getElementById("introForm");
        const formOutput = document.getElementById("formOutput");
        const resetViewBtn = document.getElementById("resetViewBtn");

        // 3. Use <pre> and <code> to display formatted code
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.className = 'language-html'; // For Highlight.js
        
        // 4. Set textContent to display the HTML code, not render it
        code.textContent = htmlCode;
        
        pre.appendChild(code);
        formOutput.innerHTML = ''; // Clear previous output
        formOutput.appendChild(pre);

        // 3. Use Highlight.js
        hljs.highlightElement(code);

        // 2. Replace the form with the output
        form.style.display = 'none';
        formOutput.style.display = 'block';
        resetViewBtn.style.display = 'block';
    });
});