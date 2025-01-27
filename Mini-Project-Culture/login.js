document.getElementById("loginForm").addEventListener("submit", async function (event) {
  event.preventDefault(); // ป้องกันการ submit แบบธรรมดา

  // ดึงข้อมูลจาก form
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // ตรวจสอบว่า username และ password ไม่เป็นค่าว่าง
  if (!username || !password) {
    alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    return;
  }

  // สร้างข้อมูลที่จะส่งไปยัง API
  const loginData = {
    username: username,
    password: password
  };

  try {
    // ส่ง POST request ไปยัง API /login
    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST", // หรือ 'GET' ตามที่ต้องการ
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData) // ส่งข้อมูลเป็น JSON
    });

    // ตรวจสอบผลลัพธ์จาก API
    const data = await response.json();

    if (response.ok) {
      // ถ้า login สำเร็จ
      if (data.role === 'admin') {
        window.location.href = data.redirect; // Redirect ไปหน้า admin-dashboard
      } else if (data.role === 'user') {
        window.location.href = data.redirect; // Redirect ไปหน้า main_user.html
      }
    } else {
      // ถ้ามีข้อผิดพลาด
      alert(data.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
  }
});

function togglePasswordVisibility() {
  const passwordField = document.getElementById("password");
  const eyeIcon = document.getElementById("eyeIcon");

  if (passwordField.type === "password") {
    passwordField.type = "text";
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  } else {
    passwordField.type = "password";
    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");
  }
}
