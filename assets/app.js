(() => {
  const $ = (selector) => document.querySelector(selector);
  const setMessage = (node, message, success = false) => { node.textContent = message; node.classList.toggle('success', success); };
  const savedUser = () => JSON.parse(localStorage.getItem('aiTutorUser') || 'null');

  document.querySelectorAll('.toggle-password').forEach((button) => {
    button.addEventListener('click', () => {
      const input = button.parentElement.querySelector('input');
      const visible = input.type === 'text';
      input.type = visible ? 'password' : 'text';
      button.textContent = visible ? '显示' : '隐藏';
      button.setAttribute('aria-label', visible ? '显示密码' : '隐藏密码');
    });
  });

  const registerForm = $('#registerForm');
  if (registerForm) {
    const password = $('#registerPassword'); const confirm = $('#confirmPassword'); const strength = $('#passwordStrength'); const message = $('#registerMessage');
    password.addEventListener('input', () => {
      const score = [password.value.length >= 8, /[A-Za-z]/.test(password.value), /\d/.test(password.value), /[^A-Za-z\d]/.test(password.value)].filter(Boolean).length;
      const labels = ['', '密码强度：较弱', '密码强度：一般', '密码强度：良好', '密码强度：很强'];
      strength.textContent = password.value ? labels[score] : '';
      strength.className = `strength ${score < 3 ? 'weak' : score < 4 ? 'medium' : 'strong'}`;
    });
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!registerForm.checkValidity()) { registerForm.reportValidity(); return; }
      if (password.value !== confirm.value) { setMessage(message, '两次输入的密码不一致，请检查后重试。'); confirm.focus(); return; }
      const data = Object.fromEntries(new FormData(registerForm));
      localStorage.setItem('aiTutorUser', JSON.stringify({ name:data.name, grade:data.grade, email:data.email, phone:data.phone, subject:data.subject, password:data.password }));
      setMessage(message, '注册成功，正在跳转到登录页……', true);
      setTimeout(() => { window.location.href = 'index.html'; }, 850);
    });
  }

  const loginForm = $('#loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault(); const message = $('#loginMessage');
      if (!loginForm.checkValidity()) { loginForm.reportValidity(); return; }
      const data = Object.fromEntries(new FormData(loginForm)); const user = savedUser();
      if (!user || !([user.email, user.phone].includes(data.account) && user.password === data.password)) { setMessage(message, '账号或密码不正确。请先注册，或检查输入内容。'); return; }
      sessionStorage.setItem('aiTutorLoggedIn', 'true'); setMessage(message, '登录成功，正在进入答疑页……', true);
      setTimeout(() => { window.location.href = 'assistant.html'; }, 650);
    });
  }

  const questionForm = $('#questionForm');
  if (questionForm) {
    if (sessionStorage.getItem('aiTutorLoggedIn') !== 'true') window.location.href = 'index.html';
    const user = savedUser(); if (user) $('#studentName').textContent = user.name;
    questionForm.addEventListener('submit', (event) => {
      event.preventDefault(); const question = $('#question'); if (!question.checkValidity()) { question.reportValidity(); return; }
      const chat = $('#chat'); const userBubble = document.createElement('article'); userBubble.className = 'user-bubble'; userBubble.textContent = question.value; chat.append(userBubble);
      const answer = document.createElement('article'); answer.className = 'assistant-bubble'; answer.textContent = '我已收到你的问题。一个好的解题思路通常是：① 明确已知条件和目标；② 把问题拆成更小的步骤；③ 逐步验证每一步。课程演示版暂未接入真实大模型，但页面已完整模拟答疑流程。'; chat.append(answer);
      question.value = ''; chat.scrollTop = chat.scrollHeight;
    });
    $('#logout').addEventListener('click', () => { sessionStorage.removeItem('aiTutorLoggedIn'); window.location.href = 'index.html'; });
  }
})();
