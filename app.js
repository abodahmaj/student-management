// ربط التطبيق بقاعدة بيانات Supabase
const SUPABASE_URL = 'https://gnokyilofrbtmgczxpyrc.supabase.co'; // استبدل بـ URL الخاص بمشروعك
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdub2t5aWxvZnJidG1nY3p4cHlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyMzk5NzksImV4cCI6MjA0MTgxNTk3OX0.y7DZAf9SVqN58acfGhPHm4S95bSN0RjInXHJoDKDQkY';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// دالة لإضافة طالب جديد إلى قاعدة البيانات
async function addStudent(studentId, name, nationalId, grade, seatNumber, correctionNumber) {
  const { data, error } = await supabase
    .from('students')
    .insert([
      { studentId, name, nationalId, grade, seatNumber, correctionNumber }
    ]);
  
  if (error) {
    console.error("Error inserting student:", error);
  } else {
    console.log("Student added:", data);
  }
}

// دالة لجلب الطلاب من قاعدة البيانات
async function getStudents() {
  const { data, error } = await supabase
    .from('students')
    .select('*');
  
  if (error) {
    console.error("Error fetching students:", error);
  } else {
    console.log("Students:", data);
    return data;
  }
}

// التعامل مع إدخال النموذج
document.getElementById('student-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  // جمع بيانات النموذج
  const studentId = document.getElementById('studentId').value;
  const name = document.getElementById('name').value;
  const nationalId = document.getElementById('nationalId').value;
  const grade = document.getElementById('grade').value;
  const seatNumber = Math.floor(Math.random() * 1000) + 1; // توليد رقم جلوس عشوائي
  const correctionNumber = Math.floor(Math.random() * 1000) + 1; // توليد رقم تصحيح عشوائي

  // إضافة الطالب إلى قاعدة البيانات
  await addStudent(studentId, name, nationalId, grade, seatNumber, correctionNumber);

  // تحديث قائمة الطلاب
  const students = await getStudents();
  displayStudents(students);
});

// دالة لعرض الطلاب في HTML
function displayStudents(students) {
  let studentsList = '';

  students.forEach(student => {
    studentsList += `
      <p>
        رقم الطالب: ${student.studentId}<br>
        اسم الطالب: ${student.name}<br>
        رقم الهوية: ${student.nationalId}<br>
        الصف الدراسي: ${student.grade}<br>
        رقم الجلوس: ${student.seatNumber}<br>
        رقم التصحيح: ${student.correctionNumber}
      </p><hr>`;
  });

  document.getElementById('students-list').innerHTML = studentsList;
}
