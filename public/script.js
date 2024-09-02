document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const course = document.getElementById('course').value;

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, course }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').textContent = data.message;
        if (data.success) {
            document.getElementById('registrationForm').reset();
        }
    })
    .catch(error => console.error('Error:', error));
});




//accodian
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.accordion-button');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.accordion-icon');

            // Toggle the display of the content
            if (content.style.display === 'block') {
                content.style.display = 'none';
                icon.style.transform = 'rotate(0deg)';
            } else {
                // Hide other open content
                document.querySelectorAll('.accordion-content').forEach(c => {
                    if (c !== content) {
                        c.style.display = 'none';
                        const otherIcon = c.previousElementSibling.querySelector('.accordion-icon');
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                });
                content.style.display = 'block';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
});