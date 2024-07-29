document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('price-form');
    const resultModal = document.getElementById('resultModal');
    const closeBtn = document.getElementsByClassName('close')[0];
    const resultText = document.getElementById('result');

    if (!form || !resultModal || !resultText || !closeBtn) {
        console.error('One or more elements are missing');
        return;
    }

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const formDataObj = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataObj)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            resultText.innerText = `Predicted Price: $${result.prediction.toFixed(2)}`;
            resultModal.style.display = 'block';
        } catch (error) {
            console.error('Error:', error);
            resultText.innerText = 'An error occurred while predicting the price.';
            resultModal.style.display = 'block';
        }
    });

    // Close the modal when the user clicks on <span> (x)
    closeBtn.onclick = function() {
        resultModal.style.display = 'none';
    }

    // Close the modal when the user clicks anywhere outside of the modal
    window.onclick = function(event) {
        if (event.target == resultModal) {
            resultModal.style.display = 'none';
        }
    }
});
