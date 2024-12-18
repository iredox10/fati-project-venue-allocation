import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

// Sample data for courses and assignments
const courses = [
  {
    id: 1,
    title: "Mathematics",
    code: "MATH101",
    instructor: "Dr. Jane Smith",
  },
  {
    id: 2,
    title: "Computer Science",
    code: "CS101",
    instructor: "Prof. John Doe",
  },
  { id: 3, title: "History", code: "HIST201", instructor: "Ms. Sarah Connor" },
];

const assignments = [
  {
    id: 1,
    title: "Algebra Assignment",
    dueDate: "2024-12-20",
    description: "Complete exercise 2.2 and submit.",
  },
  {
    id: 2,
    title: "Programming Project",
    dueDate: "2024-12-22",
    description: "Build a simple to-do application.",
  },
  {
    id: 3,
    title: "Research Paper",
    dueDate: "2025-01-10",
    description: "Write a 5-page paper on World War II.",
  },
];

const StudentPage = () => {

  const { id } = useParams();
  
  const { data: student, loading, error } = useFetch(`/get-student/${id}`);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-blue-600 text-white p-6">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <p className="mt-1 text-sm">Welcome back, {student && student.student.fullName}</p>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          {student && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Profile</h2>
              <p className="text-gray-700">Name: {student.student.fullName}</p>
              <p className="text-gray-700">
                Candidate Number: {student.student.candidateNo}
              </p>
              <p className="text-gray-700">
                Department: {student.student.department}
              </p>
              <p className="text-gray-700">Class: {student.student.level}</p>
              <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500">
                Edit Profile
              </button>
            </div>
          )}

          {/* Courses Card */}
          <div className="bg-white rounded-lg shadow-md p-6 col-start-2 col-span-3">
            <h2 className="text-xl font-semibold mb-4">Courses</h2>
            <ul className="space-y-3">
              {student &&
                student.courses.map((course) => (
                  <li
                    key={course.id}
                    className="p-3 bg-gray-100 rounded-md shadow"
                  >
                    <h3 className="font-semibold">{course.name}</h3>
                    <p className="text-gray-600">Duration: {course.duration}</p>
                    <p className="text-gray-600">Code: {course.code}</p>
                    <p className="text-gray-600">
                      venue: {course.venue ? course.venue : "not assign"}
                    </p>
                    
                  </li>
                ))}
            </ul>
            <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500">
              View All Courses
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentPage;
