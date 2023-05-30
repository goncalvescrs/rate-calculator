document.getElementById('calculator-form').addEventListener('submit', function(event) {
event.preventDefault();

var initialAmount = parseFloat(document.getElementById('initial-amount').value);
var monthlyDeposit = parseFloat(document.getElementById('monthly-deposit').value);
var interestRate = parseFloat(document.getElementById('interest-rate').value) / 100;
var investmentPeriod = parseInt(document.getElementById('investment-period').value);

var calculateButton = document.getElementById('calculate-button');
calculateButton.innerHTML = 'Calculando';
calculateButton.disabled = true;

setTimeout(function() {
  var futureValue = calculateFutureValue(initialAmount, monthlyDeposit, interestRate, investmentPeriod);
  var totalWithoutInterest = initialAmount + (monthlyDeposit * investmentPeriod);
  var interestOnly = futureValue - totalWithoutInterest;

  clearPage();
  displayResult(futureValue, totalWithoutInterest, interestOnly);
  }, 1500);
});

function calculateFutureValue(initialAmount, monthlyDeposit, interestRate, investmentPeriod) {
  var futureValue = initialAmount;

  for (var i = 0; i < investmentPeriod; i++) {
    futureValue *= (1 + interestRate);
    futureValue += monthlyDeposit;
  }


  return futureValue;
}

function clearPage() {
  var calculatorForm = document.getElementById('calculator-form');
  var resultDiv = document.getElementById('result');

  calculatorForm.style.display = 'none';
  resultDiv.innerHTML = '';
  resultDiv.style.display = 'block';
}

// function displayResult(futureValue, totalWithoutInterest, interestOnly) {
//   var resultDiv = document.getElementById('result');

//   resultDiv.innerHTML = `
//     <h3>Agora veja como os juros compostos podem te enriquecer a logo prazo</h3>
//     <h4>Dinheiro Investido</h4>
//     <p class="result-value">R$ ${totalWithoutInterest.toFixed(2)}</p>
//     <h4>Juros Acumulado com Juros Compostos</h4>
//     <p class="result-value">R$ ${interestOnly.toFixed(2)}</p>
//     <h4>Total Acumulado</h4>
//     <p class="result-value-end">R$ ${futureValue.toFixed(2)}</p>
//     <div class="end"></div>
//   `;
// }

function displayResult(futureValue, totalWithoutInterest, interestOnly) {
  var resultDiv = document.getElementById('result');

  function formatarNumero(numero) {
    return numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  resultDiv.innerHTML = `
    <h3>Agora veja como os juros compostos podem te enriquecer a longo prazo</h3>
    <h4>Dinheiro Investido</h4>
    <p class="result-value">R$ ${formatarNumero(totalWithoutInterest)}</p>
    <h4>Juros Acumulado com Juros Compostos</h4>
    <p class="result-value">R$ ${formatarNumero(interestOnly)}</p>
    <h4>Total Acumulado</h4>
    <p class="result-value-end">R$ ${formatarNumero(futureValue)}</p>
    <div class="end"></div>
  `;
}


