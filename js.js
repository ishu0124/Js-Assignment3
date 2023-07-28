document.addEventListener('DOMContentLoaded', (event) => {
    // Grabbing elements from the DOM
    const flavor = document.getElementById('flavor'); // Flavor dropdown
    const size = document.getElementById('size'); // Size dropdown
    const additionalInfo = document.getElementById('additionalInfo'); // Additional info textarea
    const totalPrice = document.getElementById('totalPrice'); // Total price span
    const orderButton = document.getElementById('orderButton'); // Order button
    const backButton = document.getElementById('backButton'); // Back button
    const orderSummary = document.getElementById('orderSummary'); // Order summary div
    const summary = document.getElementById('summary'); // Summary paragraph
    const totalDisplay = document.getElementById('totalDisplay'); // Total price display span

    // Array of addition checkboxes
    const additions = [
        document.getElementById('strawberries'), 
        document.getElementById('protein'), 
        document.getElementById('spinach'),
        document.getElementById('peanut'),
        document.getElementById('chocolate'),
        document.getElementById('almonds'),
        document.getElementById('vanilla'),
        document.getElementById('oats'),
        document.getElementById('cinnamon'),
    ];

    // Function to calculate total price
    const calculateTotalPrice = () => {
        let price = parseInt(size.value);
        additions.forEach((addition) => {
            if (addition.checked) {
                price += 1; // Add $1 for each checked addition
            }
        });
        totalPrice.textContent = price; // Display the price
    }

    // Event listeners to recalculate total when changes are made
    flavor.addEventListener('change', calculateTotalPrice);
    size.addEventListener('change', calculateTotalPrice);
    additions.forEach((addition) => {
        addition.addEventListener('change', calculateTotalPrice);
    });

    // Event listener for order button click
    orderButton.addEventListener('click', () => {
        // Filter selected additions and map to their values
        const selectedAdditions = additions.filter((addition) => addition.checked).map((addition) => addition.value);

        // Create order summary
        summary.innerHTML = `
            <strong>Flavor:</strong> ${flavor.value}<br/>
            <strong>Size:</strong> ${size.options[size.selectedIndex].text}<br/>
            <strong>Additions:</strong> ${selectedAdditions.join(', ')}<br/>
            <strong>Additional Info:</strong> ${additionalInfo.value}`;
        
        totalDisplay.textContent = `$${totalPrice.textContent}`; // Display total price

        // Swap form and summary display
        document.getElementById('smoothieForm').style.display = 'none';
        orderSummary.style.display = 'block';
    });

    // Event listener for back button click
    backButton.addEventListener('click', () => {
        // Swap form and summary display
        document.getElementById('smoothieForm').style.display = 'block';
        orderSummary.style.display = 'none';
    });
});
