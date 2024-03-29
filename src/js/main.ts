const courseFormEl = document.getElementById("courseForm") as HTMLFormElement;
const errorMsg = document.getElementById("errorMsg") as HTMLDivElement;
const errorSameCode = document.getElementById("errorSameCode") as HTMLDivElement;

const existingCourseCodes: Set<string> = new Set();

//Interface för kurs
interface Course {
    courseCode: string;
    courseName: string;
    courseProgression: string;
    courseURL: string;
}

function printNewCourse(course: Course): void {

    //Error om man lägger till samma kurskod två gånger
    if (existingCourseCodes.has(course.courseCode)) {
        console.error("En kurs med samma kurskod finns redan.");
        errorSameCode.innerHTML = `En kurs med koden ${course.courseCode} finns redan i listan`;
        return;
    }

    //tar bort Error-meddelandet om kurskoden är ny
    errorSameCode.innerHTML = "";

    const newCourseEl = document.createElement("div");
    newCourseEl.textContent = `Kurskod: ${course.courseCode}, Kursnamn: ${course.courseName}, Progression: ${course.courseProgression}, Kurs-URL: ${course.courseURL}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Radera";
    deleteButton.addEventListener("click", () => {
        newCourseEl.remove();
        existingCourseCodes.delete(course.courseCode); // Ta bort kurskoden från listan när den tas bort
    });

    newCourseEl.appendChild(deleteButton);

    const courseListEl = document.getElementById("courseList");
    if (courseListEl) {
        courseListEl.appendChild(newCourseEl);
    }

    existingCourseCodes.add(course.courseCode); // Lägg till kurskoden i listan över befintliga kurskoder
}


//Funktion för knappen i formuläret, samt vad som händer.
courseFormEl.addEventListener("submit", (event) => {
    event.preventDefault();

    //Hämtar värden från formulär
    const courseCodeInput = document.getElementById("courseCode") as HTMLInputElement;
    const courseNameInput = document.getElementById("courseName") as HTMLInputElement;
    const progressionRadios = document.getElementsByName("progression") as NodeListOf<HTMLInputElement>;
    const courseURLInput = document.getElementById("courseUrl") as HTMLInputElement;

    //Kontrollerar att alla textfällt är ifyllda
    if (courseCodeInput.value.trim() === "" || courseNameInput.value.trim() === "" || courseURLInput.value.trim() === "") {
        console.error("Fyll i alla fält.");
        return; // Avbryt funktionen om något textfält är tomt
    }

    let courseProgression: string | undefined;
    const errorMsgEl = document.getElementById("errorMsg");

    // Loopa genom alla radioknappar för progression och hitta den markerade
    for (const radio of progressionRadios) {
        if (radio.checked) {
            courseProgression = radio.value;
            break; // Avsluta loopen när den markerade radioknappen hittas
        }
    }

    if (courseProgression === undefined) {
        // Om ingen radioknapp är markerad visas felmeddelande
        console.error("Välj en progression.");
        errorMsgEl.innerText = "Välj en progression.";
        return; // Avbryt funktionen om ingen radioknapp är markerad
    }

    const newCourse: Course = {
        courseCode: courseCodeInput.value,
        courseName: courseNameInput.value,
        courseProgression: courseProgression,
        courseURL: courseURLInput.value,
    };

    //Rensar formuläret och tar bort eventuella felmeddelanden
    courseFormEl.reset();
    errorMsgEl.innerText = "";

    printNewCourse(newCourse);
});


