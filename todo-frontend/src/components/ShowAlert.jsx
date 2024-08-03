
export default function ShowAlert({message}) {
  //  const alertBox = document.createElement('div');
  //  alertBox.className = 'custom-alert';
  //  alertBox.innerHTML = `
  //    <p>${message}</p>
  //    <button onclick="document.body.removeChild(this.parentElement)">OK</button>
  //  `;
  //  return alertBox;
  //  document.body.appendChild(alertBox);

   return (
      <div id="alert-message">
         <p>{message}</p>
       <button onClick={() => {
         let alertBox=document.querySelector('.App')
         alertBox.removeChild(document.querySelector('.alert-message'))
         }}>OK</button>
      </div>
   )
 }