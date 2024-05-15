//Student Management System
//This project is a system console based Student Management System, In this project you will be 
//learning how to add new students, how to generate a 5 digit unique studentID for each students.
//how to enroll students in the given courses.Also, you will be implementing the following
//operations enroll, view balance, pay tution fees,show status,ets.
//The status will show all the details of the student including name, id,courses enrolled and balance.
//This is one of the best projects to implement the object Oriented Programming concepts.
//Create a Github repository for the project and submit its URL in the project submission form.
import inquirer from "inquirer";
const StudentInfo = [];
const generateStudentId = () => {
    const newId = Math.floor(10000 + Math.random() * 90000).toString();
    return StudentInfo.some((student) => student.studentId === newId)
        ? generateStudentId() : newId;
};
const addStudent = async () => {
    const studentData = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter student name",
        },
        {
            type: "number",
            name: "age",
            message: "Enter student age",
        },
    ]);
    const newStudent = {
        ...studentData,
        studentId: generateStudentId(),
        balance: 0,
    };
    StudentInfo.push(newStudent);
    console.log("The student has been successfully added to the database.");
    console.log(newStudent);
};
const enroll = async (student) => {
    const { course } = await inquirer.prompt([
        {
            type: "list",
            name: "course",
            message: "Select the course you want to enroll in",
            choices: [
                "Web Development",
                "Mobile Development",
                "AI",
                "Cloud Computing",
                "Blockchain",
                "Generative Ai",
            ],
        },
    ]);
    student.courseEnrolled = course;
    console.log(`${student.name}has been enrolled in ${course}.`);
};
const viewBalance = (student) => {
    console.log(`Balance for ${student.name}: $${student.balance}`);
};
const addBalance = async (student) => {
    const { amount } = await inquirer.prompt([
        {
            type: "number",
            name: "amount",
            message: "Enter the amount to add in you account.",
        },
    ]);
    student.balance += amount;
    console.log(`Balance for ${student.name}: $$ {student.balance}`);
};
const payTuition = async (student) => {
    let amount = 4500;
    student.balance -= amount;
    console.log(`${student.name} has paid $${amount} towards tuition.`);
};
const showStatus = (student) => {
    console.log(`Name: ${student.name}`);
    console.log(`Age: ${student.age}`);
    console.log(`Student ID: ${student.studentId}`);
    console.log(`Courses Enrolled: ${student.courseEnrolled}`);
    console.log(`Balance: $${student.balance}`);
};
const updateStudent = async (student) => {
    const studentData = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter student name",
        },
        {
            type: "number",
            name: "age",
            message: "Enter student age",
        },
        {
            type: "number",
            name: "batch",
            message: "Enter student batch",
        },
        {
            type: "list",
            name: "courseEnrolled",
            message: "Enter student course enrolled",
            choices: [
                "Web Development",
                "Mobile Development",
                "AI",
                "Cloud Computing",
                "Blockchain",
                "Generative Ai",
            ],
        },
    ]);
    Object.assign(student, studentData);
    console.log("The student has been successfully updated in the database.");
    showStatus(student);
};
const deleteStudent = async () => {
    const { studentId } = await inquirer.prompt([
        {
            type: "input",
            name: "studentId",
            message: "Enter student ID",
        },
    ]);
    const index = StudentInfo.findIndex((student) => student.studentId === studentId);
    if (index !== -1) {
        StudentInfo.splice(index, 1);
        console.log("The student has been successfully deleted from the database.");
    }
    else {
        console.log("Student not found with the given ID.");
    }
};
const showStudents = () => {
    console.log("Student Database:");
    console.log(StudentInfo);
};
const main = async () => {
    const choice = await inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What do you want to do?",
            choices: [
                "Show Students",
                "Add Student",
                "Update Student",
                "Delete Student",
                "Show Status",
                "Enroll",
                "View Balance",
                "Pay Tuition",
                "Add Balance",
                "Exit",
            ],
        },
    ]);
    switch (choice) {
        case "Add Student":
            await addStudent();
            break;
        case "Update Student":
            const { studentId } = await inquirer.prompt([
                {
                    type: "input",
                    name: "studentId",
                    message: "Enter student ID",
                },
            ]);
            const studentToUpdate = StudentInfo.find((student) => studentId.studentId === studentId);
            if (studentToUpdate) {
                await updateStudent(studentToUpdate);
            }
            else {
                console.log("Student not found with the given ID.");
            }
            break;
        case "Delete Student":
            await deleteStudent();
            break;
        case "Enroll":
            const { student: enrollStudentId } = await inquirer.prompt([
                {
                    type: "input",
                    name: "studentId",
                    message: "Enter student ID",
                },
            ]);
            const studentToEnroll = StudentInfo.find((student) => student.studentId === enrollStudentId);
            if (studentToEnroll) {
                await enroll(studentToEnroll);
            }
            else {
                console.log("Student not found with the given ID.");
            }
            break;
        case "View Balance":
            const { studentId: viewBalanceStudentid } = await inquirer.prompt([
                {
                    type: "input",
                    name: "studenId",
                    message: "Enter student ID",
                },
            ]);
            const studentToViewBalance = StudentInfo.find((student) => student.studentId === viewBalanceStudentid);
            if (studentToViewBalance) {
                viewBalance(studentToViewBalance);
            }
            else {
                console.log("Student not found with the given ID.");
            }
            break;
        case "Pay Tuition":
            const { studentId: payTuitionStudentId } = await inquirer.prompt([
                {
                    type: "input",
                    name: "studentId",
                    message: "Enter student ID",
                },
            ]);
            const studentToPayTuition = StudentInfo.find((student) => student.studentId === payTuitionStudentId);
            if (studentToPayTuition) {
                await payTuition(studentToPayTuition);
            }
            else {
                console.log("Student not found with the given ID.");
            }
            break;
        case "Add Balance":
            const { studentId: addBalanceStudentId } = await inquirer.prompt([
                {
                    type: "input",
                    name: "studentId",
                    message: "Enter student ID",
                },
            ]);
            const studentToAddBalance = StudentInfo.find((student) => student.studentId === addBalanceStudentId);
            if (studentToAddBalance) {
                await addBalance(studentToAddBalance);
            }
            else {
                console.log("Student not found with the given ID.");
            }
            break;
        case "Show Students":
            showStudents();
            break;
        case "Show Status":
            const { studenId: showStatusStudentId } = await inquirer.prompt([
                {
                    type: "input",
                    name: "studenId",
                    message: "Enter student ID",
                },
            ]);
            const showStatusOfStudeend = StudentInfo.find((student) => student.studentId === showStatusStudentId);
            if (showStatusOfStudeend) {
                await showStatus(showStatusOfStudeend);
            }
            else {
                console.log("Student not found with the given Id.");
            }
            break;
        case "Exit":
            return;
    }
    await main();
};
main();
