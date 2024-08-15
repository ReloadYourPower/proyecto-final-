 // Inicializar Stripe
 const stripe = stripe(LLAVE_SECRET_STRET_FRONT); // Reemplaza con tu clave pública
 const elements = stripe.elements();
 
 // Crear un elemento de tarjeta
 const cardElement = elements.create('card');
 cardElement.mount('#card-element');

//  Un script que controla la visibilidad de los campos adicionales basados en el método de pago seleccionado.
 document.getElementById('paymentMethod').addEventListener('change', function() {
    const cardDetails = document.getElementById('card-details');
    if (this.value === 'creditCard' || this.value === 'debitCard') {
      cardDetails.style.display = 'block';
    } else {
      cardDetails.style.display = 'none';
    }
  });document.addEventListener('DOMContentLoaded', function() {
    const paymentMethod = document.getElementById('paymentMethod');
    const cardDetails = document.getElementById('card-details');

    paymentMethod.addEventListener('change', function() {
      if (this.value === 'creditCard' || this.value === 'debitCard') {
        cardDetails.style.display = 'block';
      } else {
        cardDetails.style.display = 'none';
      }
    });

    // Trigger change event on page load to set initial visibility
    paymentMethod.dispatchEvent(new Event('change'));
  });