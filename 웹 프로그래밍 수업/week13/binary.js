
function ConvertToBinary() {
    var input1 = document.getElementById("input1").value;
    var input2 = document.getElementById("input2").value;
    
    var binary1 = parseInt(input1, 10).toString(2);
    var binary2 = parseInt(input2, 10).toString(2);
    
    document.getElementById('binary').innerHTML = "입력1의 2진수: " + binary1 + "<br>입력2의 2진수: " + binary2;
   
    
    return binary;
}