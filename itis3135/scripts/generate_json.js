document.addEventListener("DOMContentLoaded", function() {
    // 1. Add a "Generate JSON" button
    const jsonBtn = document.getElementById("jsonBtn");
    
    // 2. When the user clicks it...
    jsonBtn.addEventListener("click", function() {
        
        // --- Gather Data from Form ---
        const courses = [];
        const courseEntries = document.querySelectorAll("#coursesContainer .course-entry");
        
        // Loop through each course and build an object
        courseEntries.forEach(entry => {
            const department = entry.querySelector('input[name="courseDept[]"]').value;
            const number = entry.querySelector('input[name="courseNum[]"]').value;
            const name = entry.querySelector('input[name="courseName[]"]').value;
            const reason = entry.querySelector('textarea[name="courseReason[]"]').value;
            
            courses.push({ department, number, name, reason });
        });

        // Build links array (matching example format)
        const links = [];
        const linkInputs = [
            { name: "LinkedIn", value: document.getElementById('link1').value },
            { name: "GitHub", value: document.getElementById('link2').value },
            { name: "Link 3", value: document.getElementById('link3').value },
            { name: "Link 4", value: document.getElementById('link4').value },
            { name: "Link 5", value: document.getElementById('link5').value }
        ];

        linkInputs.forEach(link => {
            if (link.value) {
                links.push({ name: link.name, href: link.value });
            }
        });

        // Create the main JSON object using exact keys from instructions
        const jsonData = {
            firstName: document.getElementById('fname').value,
            preferredName: document.getElementById('nname').value,
            middleInitial: document.getElementById('mname').value,
            lastName: document.getElementById('lname').value,
            divider: document.getElementById('divider').value,
            mascotAdjective: document.getElementById('mascotAdj').value,
            mascotAnimal: document.getElementById('mascotAnimal').value,
            image: "images/me.jpg", // Default image from form
            imageCaption: document.getElementById('picCaption').value,
            personalBackground: document.getElementById('personalBg').value,
            professionalBackground: document.getElementById('profBg').value,
            academicBackground: document.getElementById('acadBg').value,
            primaryComputer: document.getElementById('compBg').value,
            courses: courses,
            links: links
        };

        // --- Manipulate the DOM ---

        // 5. Change the H2
        document.querySelector('main h2').textContent = 'Introduction HTML';

        // Get DOM elements
        const form = document.getElementById("introForm");
        const formOutput = document.getElementById("formOutput");
        const resetViewBtn = document.getElementById("resetViewBtn");

        // 2. Create a JSON text file on the page that replaces the form
        // 3. Use... <pre> and <code>
        const jsonString = JSON.stringify(jsonData, null, 2); // Pretty-print JSON
        
        // Create elements for highlighting
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.className = 'language-json'; // For Highlight.js
        code.textContent = jsonString; // 4. A viewer should be able to highlight everything

        // Append and display
        pre.appendChild(code);
        formOutput.innerHTML = ''; // Clear previous output
        formOutput.appendChild(pre);

        // 3. Use something like Highlight.js
        hljs.highlightElement(code); // Apply highlighting

        // Hide form, show output
        form.style.display = 'none';
        formOutput.style.display = 'block';
        resetViewBtn.style.display = 'block'; // Show the reset button
    });
});