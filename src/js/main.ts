const courseFormEl = document.getElementById("courseForm") as HTMLFormElement;

//Interface för kurs
interface Course {
    courseCode: string;
    courseName: string;
    courseProgression: string;
    courseURL: string;
}

//Funktion för att skriva ut kurs på skärmen(just nu bara i konsolen)
function printNewCourse(course: Course): void {
    const newCourseEl = document.getElementById("newCourse");
    if (newCourseEl) {
        console.log(course)
    }
}

courseFormEl.addEventListener("submit", (event) => {
    event.preventDefault();

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

    // Loopa genom alla radioknappar för progression och hitta den markerade
    for (const radio of progressionRadios) {
        if (radio.checked) {
            courseProgression = radio.value;
            break; // Avsluta loopen när den markerade radioknappen hittas
        }
    }

    if (courseProgression === undefined) {
        // Om ingen radioknapp är markerad, göra något här
        console.error("Välj en progression.");
        return; // Avbryt funktionen om ingen radioknapp är markerad
    }

    const newCourse: Course = {
        courseCode: courseCodeInput.value,
        courseName: courseNameInput.value,
        courseProgression: courseProgression,
        courseURL: courseURLInput.value,
    };

    printNewCourse(newCourse);
});


