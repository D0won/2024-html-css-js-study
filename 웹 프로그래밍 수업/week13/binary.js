
function ConvertToBinary() {
    var input1 = document.getElementById("input1").value;
    var input2 = document.getElementById("input2").value;
    
    var binary1 = parseInt(input1, 10).toString(2);
    var binary2 = parseInt(input2, 10).toString(2);
    
    document.getElementById('binary').innerHTML = "입력1의 2진수: " + binary1 + "<br>입력2의 2진수: " + binary2;
    binary1 = binary1.padStart(10, '0');
    binary2 = binary2.padStart(10, '0');
    for (var i = 0; i < 10; i++) {
        document.getElementById('a' + (9 - i)).value = binary1[i];
        document.getElementById('b' + (9 - i)).value = binary2[i];
    }
    return binary;
}

function AddBinary() {
    var binary1 = document.getElementById("input1").value;
    var binary2 = document.getElementById("input2").value;
    var result = parseInt(binary1) + parseInt(binary2);
    binary1 = parseInt(binary1, 10).toString(2);
    binary2 = parseInt(binary2, 10).toString(2);
    
    binary1 = binary1.padStart(10, '0');
    binary2 = binary2.padStart(10, '0');
    var c = 0;
    for(var i = 0; i < 10; i++) {
        (function(i) {
            setTimeout(function() {
                if(parseInt(binary1[9-i]) + parseInt(binary2[9-i]) + c == 0) {
                    document.getElementById('r' + (i)).value = 0;
                    document.getElementById('c' + (i)).value = 0;
                    c = 0;
                }
                else if(parseInt(binary1[9-i]) + parseInt(binary2[9-i]) + c == 1) {
                    document.getElementById('r' + (i)).value = 1;
                    document.getElementById('c' + (i)).value = 0;
                    c = 0;
                }
                else if(parseInt(binary1[9-i]) + parseInt(binary2[9-i]) + c == 2) {
                    document.getElementById('r' + (i)).value = 0;
                    document.getElementById('c' + (i)).value = 1;
                    c = 1;
                }
                else {
                    document.getElementById('r' + (i)).value = 1;
                    document.getElementById('c' + (i)).value = 1;
                    c = 1;
                }
                
            }, i * 250); // 0.25초 간격으로 설정
        })(i);
        
    }
    return result.toString(2);
}

function ConvertToDecimal() {
    var binary1 = document.getElementById("input1").value;
    var binary2 = document.getElementById("input2").value;
    var result = parseInt(binary1) + parseInt(binary2);
    document.getElementById('result').value = result;
    return result;
}