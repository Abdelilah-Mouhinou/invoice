// first methode
// var div =document.getElementById("toAddON");
// function delette() {
//     div.remove();
// }
//Second Methode
// var div =document.getElementById("toAddON");
// function delette() {
//     div.parentNode.removeChild(div);
// }

// window.onload = function(){
//     document.getElementById("download").addEventListener("click",()=>{
//         const body = document.getElementById("body");
//         // console.log(body);
//         // console.log(window);
//         html2pdf().from(body).save();
//     });
// }

async function generatePDF(){
    var downloading = document.getElementById("body");
    var h = document.querySelector(".container h1");
    var printer = document.querySelector(".icon-printer");
    var sold_du = document.getElementById("Solde-du");
    var doc = new jsPDF("l","pt");
    downloading.style.textShadow = "none";
    downloading.style.background = "gray";
    downloading.style.color = "black";
    h.style.letterSpacing = "0px";
    printer.style.display = "none"
    sold_du.style.textShadow = "none"

    await html2canvas(downloading,{
       allowTaint:true,
        useCORS:true, 
    }).then((canvas)=>{
        doc.addImage(canvas.toDataURL("image/png"),"PNG",-15,-8, 880,616)
    })

    doc.save("Facture d'achat.pdf");
    downloading.style.textShadow = "";
    h.style.letterSpacing = "";
    printer.style.display = "";
    sold_du.style.textShadow = ""
    downloading.style.background = "";
    downloading.style.color = "";

}

function getImagePreview(event) {
    // var spn = getElementById("spn");
    var image = URL.createObjectURL(event.target.files[0]);
    var imagediv = document.getElementById("span-llogo");
    var newimg = document.createElement("img");
    document.getElementById("prr").style.display = "none";
    document.getElementById("prr").innerHTML = '';
    imagediv.innerHTML = "";
    newimg.src = image;
    newimg.style.minWidth = "350px";
    newimg.style.height = "150px";
    newimg.style.objectFit = "cover"
    imagediv.appendChild(newimg);
  }
  
  v=0;
 
  function Add() {
     v++;
       
        const para = document.createElement(`div`);
        para.id="a"+v;
    
    let  ajouter = `<div><table id="table"><tr id="toAddON"> <td> <select onchange="addProduit()" id="listDeProduit">
  
          
      
       <optgroup label="PC Portable">
        <option value="HP">PC Portable 1HP Pro 174</option>
        <option value="LENOVO">PC Portable LENOVO</option>
        <option value="ASUS">PC Portable ASUS</option>
        </optgroup>
   
  
      <optgroup label="SMART PHONES">
          <option value="SAMSUNG">Smart PHONE,SAMSUNG NOTE 9</option>
          <option value="REDMI">Smart PHONE,REDMI 9T</option>
          <option value="IPHONE">Smart PHONE,IPHONE 13 PRO</option>
        </optgroup>
   
     
   </select></td>
      <td><input type="number" value = "1" id="QT"  min="1" max="10"  onchange="addProduit()" /></td>
      <td><span class="currency">MAD</span><input type="number" readonly style="cursor: default" id="PRIX-UNITAIRE" value="2540" /></td>
      <td><span class="currency">MAD</span><input type="number" readonly style="cursor: default" id="PRIX-TOTAL" value="2540" /></td>
      <td class="delete"><span id="delete">X</span></td></tr> </table></div>`;
      
     let tab =document.getElementById("produit");
      tab.appendChild(para) ;
       let table=document.getElementById(`a${v}`);
       console.log(table)
       table.innerHTML+=ajouter


    var current_tasks = document.querySelectorAll(".delete");
    for (var i =1; i < current_tasks.length ;i++) {
        current_tasks[i].onclick = function(){
            this.parentNode.remove();
        }
    }
    Currency();
    addProduit()
}

function Currency(){
    var crr = document.querySelectorAll(".currency");
    for (let i = 0; i < crr.length; i++) {
    switch (document.getElementById("select").value) {
        case "MAD":
            crr[i].textContent = "MAD"
            break;
        case "Dollar":
            crr[i].textContent = "DOLLAR"
            break;
        case "Euro":
            crr[i].textContent = "EURO"
            break;
        case "AED":
            crr[i].textContent = "AED"
            break;
        default:
            crr[i].textContent = "MAD"
            break;
    }
    }
    
}

function addProduit(){
    var listdeproduit = document.querySelectorAll("#listDeProduit");
    var quantite = document.querySelectorAll("#QT");
    var prix_unitaire = document.querySelectorAll("#PRIX-UNITAIRE");
    var prix_total = document.querySelectorAll("#PRIX-TOTAL");
    for (let i = 0; i < listdeproduit.length ; i++) {
    switch (listdeproduit[i].value) {
        case "HP":
        prix_unitaire[i].value = "2540"
        prix_total[i].value = prix_unitaire[i].value * quantite[i].value 
        break;
        case "LENOVO":
        prix_unitaire[i].value = "4500"
        prix_total[i].value = prix_unitaire[i].value * quantite[i].value
        break;
        case "ASUS":
        prix_unitaire[i].value = "4000"
        prix_total[i].value = prix_unitaire[i].value * quantite[i].value
        break;
        case "SAMSUNG":
        prix_unitaire[i].value = "2499"
        prix_total[i].value = prix_unitaire[i].value * quantite[i].value
        break;
        case "REDMI":
        prix_unitaire[i].value = "2199"
        prix_total[i].value = prix_unitaire[i].value * quantite[i].value
        break;
        case "IPHONE":
        prix_unitaire[i].value = "9900"
        prix_total[i].value = prix_unitaire[i].value * quantite[i].value
        break;
        default:
        prix_unitaire[i].value = ""
        prix_total[i].value =prix_unitaire[i].value * quantite[i].value 
        break;    
    } 
    }
}

function Calculer(){
    var prix_total = document.querySelectorAll("#PRIX-TOTAL");
    var tot = document.getElementById("tot");
    var total = 0;
    var solde = document.getElementById("solde").value;
    var taxe = document.getElementById("taxe").value;
    var livraison = document.getElementById("livraison").value;
    var totf = document.getElementById("totf");
    var montantPaye = document.getElementById("montantPaye");
    for (let i = 0; i < prix_total.length ; i++){
        total +=parseFloat(prix_total[i].value) 
    }
    tot.innerHTML =total;
    var TOTAL = total + (total * (solde/100)) + (total * (taxe/100)) + (total * (livraison/100));
    totf.innerHTML = TOTAL.toFixed(2);
    montantPaye.value = totf.innerHTML;
}

// function Currency(){
// for (let i = 0; i < crr.length; i++) {
//     if (document.getElementById("select").value = "MAD") {
//         crr[i].textContent = "MAD"
//         break
//     }
//     if (document.getElementById("select").value = "Dollar") {
//         crr[i].textContent = "DOLLAR"
//         break
//     }
//     if (document.getElementById("select").value = "Euro") {
//         crr[i].textContent = "EURO"
//         break
//     }
//     if (document.getElementById("select").value = "AED") {
//         crr[i].textContent = "AED"
//         break
//     }
    
// }
// }

