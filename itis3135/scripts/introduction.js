document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("introForm");
    const clearBtn = document.getElementById("clearBtn");
    const addCourseBtn = document.getElementById("addCourseBtn");
    const coursesContainer = document.getElementById("coursesContainer");
    const formOutput = document.getElementById("formOutput");
    const resetViewBtn = document.getElementById("resetViewBtn");

    // 3. Add Control Buttons: 'Clear' button functionality
    clearBtn.addEventListener("click", function() {
        // Find all inputs and textareas within the form
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (input.type === 'text' || input.type === 'date' || input.tagName.toLowerCase() === 'textarea') {
                input.value = ''; // Clear text, date, and textarea
            } else if (input.type === 'file') {
                input.value = null; // Clear file input
            }
            // Note: 'reset' button handles resetting to default values
        });
    });

    // 4. JavaScript Functionality: Add new course text boxes
    addCourseBtn.addEventListener("click", function() {
        const courseCount = coursesContainer.getElementsByClassName("course-entry").length + 1;
        
        const newCourseEntry = document.createElement("div");
        newCourseEntry.className = "course-entry";
        
        newCourseEntry.innerHTML = `
            <label>Course ${courseCount}</label>
            <input type="text" name="courseDept[]" placeholder="Department (e.g., ITIS)">
            <input type="text" name="courseNum[]" placeholder="Number (e.g., 3135)">
            <input type="text" name="courseName[]" placeholder="Course Name">
            <textarea name="courseReason[]" placeholder="Reason for taking"></textarea>
            <button type="button" class="delete-course">Delete</button>
        `;
        
        coursesContainer.appendChild(newCourseEntry);
    });

    // 4. JavaScript Functionality: Add delete button beside each new course
    // We use event delegation to handle clicks on delete buttons
    coursesContainer.addEventListener("click", function(e) {
        if (e.target.classList.contains("delete-course")) {
            // Find the parent .course-entry and remove it
            e.target.closest(".course-entry").remove();
        }
    });

    // 4. JavaScript Functionality: Prevent default, gather data, and display
    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Prevents page refresh/default submit

        // --- Gather Data ---
        const formData = new FormData(form);
        
        // Build the output HTML
        let outputHTML = `<h2>${formData.get('fname')} ${formData.get('lname')} || ${formData.get('mascotAdj')} ${formData.get('mascotAnimal')}</h2>`;

        // Handle Image
        const imgFile = formData.get('picUpload');
        if (imgFile && imgFile.size > 0) {
            outputHTML += `<img src="${URL.createObjectURL(imgFile)}" alt="${formData.get('picCaption')}">`;
        } else {
            outputHTML += `<img src="images/me.jpg" alt="${formData.get('picCaption')}">`; // Default image
        }

        outputHTML += `<ul>`;
        outputHTML += `<li><strong>Personal Background:</strong> ${formData.get('personalBg')}</li>`;
        outputHTML += `<li><strong>Professional Background:</strong> ${formData.get('profBg')}</li>`;
        outputHTML += `<li><strong>Academic Background:</strong> ${formData.get('acadBg')}</li>`;
        outputHTML += `<li><strong>Primary Computer:</strong> ${formData.get('compBg')}</li>`;
        
        // Handle Courses
        outputHTML += `<li><strong>Courses I’m Taking:</strong><br><ul>`;
        const courseDepts = formData.getAll('courseDept[]');
        const courseNums = formData.getAll('courseNum[]');
        const courseNames = formData.getAll('courseName[]');
        const courseReasons = formData.getAll('courseReason[]');

        for(let i = 0; i < courseDepts.length; i++) {
            outputHTML += `<li>${courseDepts[i]} ${courseNums[i]} - ${courseNames[i]}: ${courseReasons[i]}</li>`;
        }
        outputHTML += `</ul></li>`;

        // Handle Extras
        if (formData.get('quote')) {
            outputHTML += `<li><strong>Quote:</strong> "${formData.get('quote')}" - <i>${formData.get('quoteAuthor') || 'Unknown'}</i></li>`;
        }
        if (formData.get('funnyThing')) {
            outputHTML += `<li><strong>Funny Thing:</strong> ${formData.get('funnyThing')}</li>`;
        }
        if (formData.get('shareThing')) {
            outputHTML += `<li><strong>Something to Share:</strong> ${formData.get('shareThing')}</li>`;
        }
        
        // Handle Links
        const links = [formData.get('link1'), formData.get('link2'), formData.get('link3'), formData.get('link4'), formData.get('link5')];
        const validLinks = links.filter(link => link.trim() !== '');
        if (validLinks.length > 0) {
            outputHTML += `<li><strong>Links:</strong><ul>`;
            validLinks.forEach(link => {
                outputHTML += `<li><a href="${link}" target="_blank">${link}</a></li>`;
            });
            outputHTML += `</ul></li>`;
        }
        
        outputHTML += `</ul>`;

        // --- Display Content & Hide Form ---
        formOutput.innerHTML = outputHTML;
        formOutput.style.display = "block";
        form.style.display = "none";
        
        // Show the 'Reset Form Page' button
        resetViewBtn.style.display = "block";
    });

    // 4. JavaScript Functionality: Reset link at the bottom
    resetViewBtn.addEventListener("click", function() {
        // Hide output and show form
        formOutput.style.display = "none";
        form.style.display = "block";
        resetViewBtn.style.display = "none";
        
        // Reset the form to its initial 'value' attributes
        form.reset();
    });
});