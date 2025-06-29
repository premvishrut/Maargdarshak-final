
function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('hidden');
}

async function ask() {
  const question = document.getElementById('question').value;
  const responseDiv = document.getElementById('response');
  responseDiv.innerHTML = "Soch rahe hain...";
  const res = await fetch('/.netlify/functions/maargdarshak', {
    method: 'POST',
    body: JSON.stringify({ question }),
  });
  const data = await res.json();
  responseDiv.innerHTML = `<p>${data.answer}</p>`;
}
