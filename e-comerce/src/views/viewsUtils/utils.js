function sEnd(button) {
  const jsonData = prompt('Ingrese el JSON para comparar:');
  if(button != 'showAlertButton'){
    if (button != 'showAlertButton2') {
      if (jsonData) {
        try {
          JSON.parse(jsonData); // Intenta parsear el JSON para verificar su validez
              
              // Crear un formulario oculto para enviar los datos al servidor
              const form = document.createElement('form');
              form.method = 'POST';
              form.action = '/profile/users/premium';
    
              // Crear un campo oculto para almacenar el JSON
              const hiddenField = document.createElement('input');
              hiddenField.type = 'hidden';
              hiddenField.name = 'jsonData';
              hiddenField.value = jsonData;
              form.appendChild(hiddenField);
    
              document.body.appendChild(form);
              form.submit();
        } catch (e) {
          alert('JSON inválido. Por favor, intente nuevamente.');
        }
      }
    } 
    else {
      if (jsonData) {
        try {
          JSON.parse(jsonData); // Intenta parsear el JSON para verificar su validez
              
              // Crear un formulario oculto para enviar los datos al servidor
              const form = document.createElement('form');
              form.method = 'POST';
              form.action = '/profile/users';
    
              // Crear un campo oculto para almacenar el JSON
              const hiddenField = document.createElement('input');
              hiddenField.type = 'hidden';
              hiddenField.name = 'jsonData';
              hiddenField.value = jsonData;
              form.appendChild(hiddenField);
    
              document.body.appendChild(form);
              form.submit();
        } catch (e) {
          alert('JSON inválido. Por favor, intente nuevamente.');
        }
      }
    }
  }
  else{
    if (jsonData) {
      try {
        JSON.parse(jsonData); // Intenta parsear el JSON para verificar su validez
            
            // Crear un formulario oculto para enviar los datos al servidor
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = '/profile/users/current';
  
            // Crear un campo oculto para almacenar el JSON
            const hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = 'jsonData';
            hiddenField.value = jsonData;
            form.appendChild(hiddenField);
  
            document.body.appendChild(form);
            form.submit();
      } catch (e) {
        alert('JSON inválido. Por favor, intente nuevamente.');
      }
    }
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const isAuthenticated = {isAuthenticated};
  if (isAuthenticated) {
    document.getElementById('register-nav-item').style.display = 'none';
    document.getElementById('login-nav-item').style.display = 'none';
  }
});

const showAlertButton = document.getElementById('showAlertButton');
const showAlertButton2 = document.getElementById('showAlertButton2');
const showAlertButton3 = document.getElementById('showAlertButton3');

showAlertButton.addEventListener('click', function() {sEnd('showAlertButton')});
showAlertButton2.addEventListener('click', function() { sEnd('showAlertButton2')});
showAlertButton3.addEventListener('click', function() { sEnd('showAlertButton3')});
