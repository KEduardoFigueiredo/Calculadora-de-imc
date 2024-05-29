function calculateIMC() {
    const gender = document.getElementById('gender').value;
    const age = document.getElementById('age').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const bodyFat = document.getElementById('bodyFat').value;
    const activityLevel = document.getElementById('activityLevel').value;

    if (height === '' || weight === '') {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    const heightMeters = height / 100;
    const imc = weight / (heightMeters * heightMeters);
    let imcCategory = '';

    if (imc < 18.5) {
        imcCategory = 'Abaixo do peso';
    } else if (imc < 24.9) {
        imcCategory = 'Peso normal';
    } else if (imc < 29.9) {
        imcCategory = 'Sobrepeso';
    } else {
        imcCategory = 'Obesidade';
    }

    let bmr;
    if (bodyFat) {
        bmr = 370 + (21.6 * (1 - bodyFat / 100) * weight);
    } else {
        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }
    }

    let caloriasDiarias;
    switch (activityLevel) {
        case 'sedentary':
            caloriasDiarias = bmr * 1.2;
            break;
        case 'light':
            caloriasDiarias = bmr * 1.375;
            break;
        case 'moderate':
            caloriasDiarias = bmr * 1.55;
            break;
        case 'high':
            caloriasDiarias = bmr * 1.725;
            break;
        case 'intense':
            caloriasDiarias = bmr * 1.9;
            break;
    }

    const proteinas = (0.8 * weight).toFixed(2);
    const carboidratos = (4 * weight).toFixed(2);
    const gorduras = (0.5 * weight).toFixed(2);

    const idealWeightMin = (18.5 * heightMeters * heightMeters).toFixed(2);
    const idealWeightMax = (24.9 * heightMeters * heightMeters).toFixed(2);

    document.getElementById('result').innerHTML = `
        <p>Seu IMC é: ${imc.toFixed(2)} (${imcCategory})</p>
        <p>Calorias diárias recomendadas: ${caloriasDiarias.toFixed(2)} kcal</p>
        <p>Proteínas diárias recomendadas: ${proteinas} g</p>
        <p>Carboidratos diários recomendados: ${carboidratos} g</p>
        <p>Gorduras diárias recomendadas: ${gorduras} g</p>
        <p>Peso ideal: ${idealWeightMin} kg - ${idealWeightMax} kg</p>
    `;
}