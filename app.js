// Utility Functions

// Function to show a specific section and hide all others
function showSection(sectionId) {
    document.querySelectorAll("section").forEach((section) => section.classList.add("hidden"));
    document.getElementById(sectionId).classList.remove("hidden");
  }
  
  // Function to clear all input fields within a section
  function clearSection(sectionId) {
    document.querySelectorAll(`#${sectionId} input[type="number"]`).forEach((input) => (input.value = ""));
    document.querySelectorAll(`#${sectionId} select`).forEach((select) => (select.value = "0"));
  }
  
  // Function to dynamically generate course GPA input fields
  function generateCourseInputs(courseCount) {
    const courseContainer = document.getElementById("course-grades");
    courseContainer.innerHTML = ""; // Clear previous inputs
  
    if (courseCount > 0) {
      const gradeOptions = `
        <option value="4.0">A (4.0)</option>
        <option value="3.7">A- (3.7)</option>
        <option value="3.3">B+ (3.3)</option>
        <option value="3.0">B (3.0)</option>
        <option value="2.7">B- (2.7)</option>
        <option value="2.3">C+ (2.3)</option>
        <option value="2.0">C (2.0)</option>
        <option value="1.7">C- (1.7)</option>
        <option value="1.3">D+ (1.3)</option>
        <option value="1.0">D (1.0)</option>
        <option value="0.0">F (0.0)</option>
      `;
  
      for (let i = 1; i <= courseCount; i++) {
        const label = document.createElement("label");
        label.innerHTML = `Course ${i} GPA: 
          <select id="courseGpa${i}">
            ${gradeOptions}
          </select>`;
        courseContainer.appendChild(label);
        courseContainer.appendChild(document.createElement("br"));
      }
  
      document.getElementById("course-inputs").classList.remove("hidden");
    } else {
      document.getElementById("course-inputs").classList.add("hidden");
    }
  }
  
  // Event Listeners
  
  // Handle "Calculate CGPA" button
  document.getElementById("calculate-cgpa-btn").addEventListener("click", () => {
    showSection("calculate-cgpa-section");
  });
  

  
  // Handle "Go Back" buttons
  document.getElementById("go-back-btn").addEventListener("click", () => showSection("menu"));
  document.getElementById("go-back-btn-semester").addEventListener("click", () => showSection("calculate-cgpa-section"));
  
  // Handle course count change
  document.getElementById("semesterCourses").addEventListener("change", (event) => {
    const courseCount = parseInt(event.target.value) || 0;
    generateCourseInputs(courseCount);
  });
  
  // Handle CGPA calculation
  document.getElementById("calculate-btn").addEventListener("click", () => {
    let totalPoints = 0;
    let totalCredits = 0;
  
    // Grades mapping for fixed grade inputs
    const grades = {
      A: 4.0,
      Aminus: 3.7,
      Bplus: 3.3,
      B: 3.0,
      Bminus: 2.7,
      Cplus: 2.3,
      C: 2.0,
      Cminus: 1.7,
      Dplus: 1.3,
      D: 1.0,
      F: 0.0,
    };
  
    // Calculate total points and credits for fixed inputs
    for (const grade in grades) {
      const count = parseInt(document.getElementById(grade)?.value || 0);
      totalPoints += count * grades[grade] * 3; // Assuming each course is 3 credits
      totalCredits += count * 3;
    }
  
    // Add dynamically added courses
    const courseCount = parseInt(document.getElementById("semesterCourses").value) || 0;
    for (let i = 1; i <= courseCount; i++) {
      const gpa = parseFloat(document.getElementById(`courseGpa${i}`).value) || 0;
      totalPoints += gpa * 3; // Assuming each course is 3 credits
      totalCredits += 3;
    }
  
    // Calculate and display CGPA
    const cgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
    document.getElementById("cgpa-result").textContent = `Your calculated CGPA is: ${cgpa}`;
    showSection("cgpa-result-section");
  });
  
  // Clear inputs from "Calculate CGPA" section
  document.getElementById("clear-btn").addEventListener("click", () => {
    clearSection("calculate-cgpa-section");
  });
  
  // Clear inputs from "Semester Input" section
  document.getElementById("clear-semester-btn").addEventListener("click", () => {
    clearSection("semester-input-section");
    document.getElementById("course-inputs").classList.add("hidden");
  });
  
  // Handle "Next" button
  document.getElementById("next-btn").addEventListener("click", () => {
    showSection("semester-input-section");
  });

  document.getElementById("go-back-btn-previous").addEventListener("click", () => {
    showSection("semester-input-section")
  })
  
  document.getElementById("return-btn").addEventListener("click", () => {
    showSection("menu")
  })
  // Page Initialization
  // Handle "Minimum GPA for Target" button
// document.getElementById("required-gpa-btn").addEventListener("click", () => {
//   showSection("required-gpa-section");
// });

// // Handle calculation for the required GPA
// document.getElementById("calculate-required-gpa-btn").addEventListener("click", () => {
//   // Get user inputs
//   const completedCredits = parseFloat(document.getElementById("completedCredits").value);
//   const currentCgpa = parseFloat(document.getElementById("currentCgpa").value);
//   const targetCgpa = parseFloat(document.getElementById("targetCgpa").value);
//   const totalCredits = parseFloat(document.getElementById("totalCredits").value);

//   // Validate inputs
//   if (
//     isNaN(completedCredits) ||
//     isNaN(currentCgpa) ||
//     isNaN(targetCgpa) ||
//     isNaN(totalCredits) ||
//     completedCredits <= 0 ||
//     currentCgpa < 0 ||
//     targetCgpa < 0 ||
//     totalCredits <= 0 ||
//     currentCgpa > 4.0 ||
//     targetCgpa > 4.0 ||
//     completedCredits > totalCredits
//   ) {
//     alert("Please enter valid inputs.");
//     return;
//   }

//   // Calculate the required GPA for remaining courses
//   const remainingCredits = totalCredits - completedCredits;
//   if (remainingCredits <= 0) {
//     document.getElementById("required-gpa-result").textContent =
//       "You have already completed all credits!";
//     showSection("required-gpa-result-section");
//     return;
//   }

//   const totalTargetPoints = targetCgpa * totalCredits;
//   const achievedPoints = currentCgpa * completedCredits;
//   const requiredPoints = totalTargetPoints - achievedPoints;
//   const requiredGpa = requiredPoints / remainingCredits;

//   // Display the result
//   let resultMessage;
//   if (requiredGpa > 4.0) {
//     resultMessage = `It is not possible to achieve your target CGPA (${targetCgpa}) based on the remaining credits (${remainingCredits}).`;
//   } else {
//     resultMessage = `To achieve your target CGPA of ${targetCgpa}, you need to score an average GPA of ${requiredGpa.toFixed(
//       2
//     )} in the remaining ${remainingCredits} credits.`;
//   }

//   document.getElementById("required-gpa-result").textContent = resultMessage;
//   showSection("required-gpa-result-section");
// });

// // Clear inputs in "Minimum GPA for Target" section
// document.getElementById("clear-required-gpa-btn").addEventListener("click", () => {
//   clearSection("required-gpa-section");
// });

// // Go back to the main menu from "Minimum GPA for Target" section
// document
//   .getElementById("go-back-required-gpa-btn")
//   .addEventListener("click", () => {
//     showSection("menu");
//   });

// // Go back to the main menu from the result section
// document
//   .getElementById("return-to-required-gpa-menu")
//   .addEventListener("click", () => {
//     showSection("menu");
//   });

//   //Minimum GPA calculation
  



  // Default: Show the main menu
  showSection("menu");
  