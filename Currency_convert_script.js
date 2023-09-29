document.addEventListener('DOMContentLoaded', function() {
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const amount = document.getElementById('amount');
    const result = document.getElementById('result');

    // Fetch currencies and populate dropdowns
    fetch('https://open.er-api.com/v6/latest/USD')
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                const option2 = document.createElement('option');
                option1.text = currency;
                option2.text = currency;
                fromCurrency.add(option1);
                toCurrency.add(option2);
            });
        });

    function convert() {
        const from = fromCurrency.value;
        const to = toCurrency.value;
        const amountValue = amount.value;

        if (from === to) {
            result.innerText = "Please select different currencies.";
            return;
        }

        fetch(`https://open.er-api.com/v6/latest/${from}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[to];
                const convertedAmount = (amountValue * rate).toFixed(2);
                result.innerText = `${amountValue} ${from} = ${convertedAmount} ${to}`;
            })
            .catch(error => console.error('Error:', error));
    }

    window.convert = convert;
});
