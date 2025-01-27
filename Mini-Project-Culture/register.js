document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
  
    form.addEventListener('submit', async function (event) {
      event.preventDefault(); // ป้องกันการ submit แบบปกติ
  
      const username = usernameInput.value;
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
  
      // ตรวจสอบว่า password และ confirmPassword ตรงกันหรือไม่
      if (password !== confirmPassword) {
        alert('Password และ Confirm Password ต้องตรงกัน');
        return;
      }
  
      // ตรวจสอบว่า username และ password ไม่ว่าง
      if (!username || !password) {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน');
        return;
      }
  
      const data = {
        username,
        password,
        confirmPassword,
      };
  
      try {
        const response = await fetch('http://localhost:3001/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          alert(result.message); // แสดงข้อความเมื่อสมัครสำเร็จ
          form.reset(); // รีเซ็ตฟอร์ม
        } else {
          alert(result.message); // แสดงข้อความหากเกิดข้อผิดพลาด
        }
      } catch (error) {
        console.error('Error:', error);
        alert('เกิดข้อผิดพลาดในการสมัครสมาชิก');
      }
    });
  });
  