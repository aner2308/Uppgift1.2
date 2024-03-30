interface Course {
    courseCode: string;
    courseName: string;
    courseProgression: string;
    courseURL: string;
}

const existingCourses: Course[] = []; // Använd en array för att lagra alla kurser
const errorMsgEl = document.getElementById("errorMsg") as HTMLDivElement;
const errorSameCodeEl = document.getElementById("errorSameCode") as HTMLDivElement;

// Funktion för att kontrollera om kurskoden redan finns
function isDuplicateCourseCode(courseCode: string): boolean {
    return existingCourses.some(course => course.courseCode === courseCode);
}

// Funktion för att lägga till en ny kurs och spara den i localStorage
function addCourse(course: Course): void {
    existingCourses.push(course);
    updateLocalStorage();
}

// Funktion för att ta bort en kurs och uppdatera localStorage
function removeCourse(courseCode: string): void {
    const index = existingCourses.findIndex(course => course.courseCode === courseCode);
    if (index !== -1) {
        existingCourses.splice(index, 1);
        updateLocalStorage();
    }
}

// Funktion för att uppdatera localStorage med alla kurser
function updateLocalStorage(): void {
    localStorage.setItem("courses", JSON.stringify(existingCourses));
}

// Funktion för att ladda kurser från localStorage när sidan laddas
function loadCoursesFromLocalStorage(): void {
    const savedCourses = localStorage.getItem("courses");
    if (savedCourses) {
        existingCourses.push(...JSON.parse(savedCourses));
        // Uppdatera DOM med de sparade kurserna
        existingCourses.forEach(course => printNewCourse(course));
    }
}

// Kör funktionen för att ladda sparade kurser när sidan laddas
window.addEventListener("DOMContentLoaded", () => {
    loadCoursesFromLocalStorage();
});

// Funktion för att skriva ut en kurs i DOM:en
function printNewCourse(course: Course): void {
    
    // Skapa element för kursen
    const newCourseEl = document.createElement("div");
    newCourseEl.innerHTML = `
        <table>
            <tr>
                <td>Kurskod:</td>
                <td>${course.courseCode}</td>
            </tr>
            <tr>
                <td>Kursnamn:</td>
                <td>${course.courseName}</td>
            </tr>
            <tr>
                <td>Progression:</td>
                <td>${course.courseProgression}</td>
            </tr>
            <tr>
                <td>Kurs-URL:</td>
                <td>${course.courseURL}</td>
            </tr>
        </table>`;

    // Skapa knapp för att ta bort kursen
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Radera";
    deleteButton.addEventListener("click", () => {
        newCourseEl.remove();
        removeCourse(course.courseCode);
    });

    // Lägg till knappen i kursens element
    newCourseEl.appendChild(deleteButton);

    // Lägg till kursens element i DOM:en
    const courseListEl = document.getElementById("courseList");
    if (courseListEl) {
        courseListEl.appendChild(newCourseEl);
    }
}

const courseFormEl = document.getElementById("courseForm") as HTMLFormElement;

courseFormEl.addEventListener("submit", (event) => {
    event.preventDefault();

    // Hämta värden från formuläret
    const courseCodeInput = document.getElementById("courseCode") as HTMLInputElement;
    const courseNameInput = document.getElementById("courseName") as HTMLInputElement;
    const progressionRadios = document.getElementsByName("progression") as NodeListOf<HTMLInputElement>;
    const courseURLInput = document.getElementById("courseUrl") as HTMLInputElement;

        // Kontrollera om kurskoden redan finns
        const courseCode = courseCodeInput.value.trim();
        if (isDuplicateCourseCode(courseCode)) {
            errorSameCodeEl.innerText = `En kurs med koden ${courseCode} finns redan.`;
            return;
        } else {
            errorSameCodeEl.innerText = "";
        }

        // Kontrollera om någon radioknapp är markerad
        const isChecked = Array.from(progressionRadios).some(radio => radio.checked);

        // Om ingen radioknapp är markerad, visa felmeddelande och avbryt
        if (!isChecked) {
            errorMsgEl.innerHTML = `<p>Välj en progression.<p>`;
            return;
        } else {
            errorMsgEl.innerHTML = `<p>Vänligen fyll i din kurs.<p>`;
        }

    // Validering och skapa ny kurs
    const courseProgression = Array.from(progressionRadios).find(radio => radio.checked)?.value || "";
    const newCourse: Course = {
        courseCode: courseCodeInput.value,
        courseName: courseNameInput.value,
        courseProgression: courseProgression,
        courseURL: courseURLInput.value,
    };

    // Lägg till kursen i DOM och localStorage
    printNewCourse(newCourse);
    addCourse(newCourse);

    // Rensa formuläret
    courseFormEl.reset();
});
