function typeWriter(element, lines, delay = 100, lineDelay = 500) {
    let lineIndex = 0;
    let charIndex = 0;

    function addLetter() {
        if (lineIndex < lines.length) {
            if (charIndex < lines[lineIndex].length) {
                element.innerHTML += lines[lineIndex].charAt(charIndex);
                charIndex++;
                setTimeout(addLetter, delay);
            } else {
                element.innerHTML += '\n';
                charIndex = 0;
                lineIndex++;
                setTimeout(addLetter, lineDelay);
            }
       }
   }
    addLetter();
}

let binary1 = '';
let binary2 = '';
let sinput1 = 0;
let sinput2 = 0;
function ConvertToBinary() {
    var input1 = document.getElementById("input1").value;
    var input2 = document.getElementById("input2").value;
    sinput1 = parseInt(input1, 10);
    sinput2 = parseInt(input2, 10);
    const result1 = document.getElementById('result1');
    const result2 = document.getElementById('result2');
    result1.innerHTML = '';
    result2.innerHTML = '';
    input1 = Math.abs(sinput1);
    input2 = Math.abs(sinput2);
    const step1 = [];
    const step2 = [];
    binary1 = '';
    binary2 = '';
    
    while (input1 > 0) {
        var remainder = input1 % 2;
        step1.push(`${input1} ÷ 2 = ${Math.floor(input1 / 2)}...${remainder}`);
        binary1 = remainder + binary1;
        input1 = Math.floor(input1 / 2);
    }

    while (input2 > 0) {
        var remainder = input2 % 2;
        step2.push(`${input2} ÷ 2 = ${Math.floor(input2 / 2)}...${remainder}`);
        binary2 = remainder + binary2;
        input2 = Math.floor(input2 / 2);
    }

    binary1 = binary1 || '0';
    binary2 = binary2 || '0';

    
    binary1 = binary1.padStart(9, '0');
    
    binary2 = binary2.padStart(9, '0');

    if (sinput1 < 0) {
        binary1 = '1' + binary1;
    }
    else
    {
        binary1 = '0' + binary1;    
    }

    if (sinput2 < 0) {
        binary2 = '1' + binary2; 
    }
    else
    {
        binary2 = '0' + binary2;
    }

    const result1Text = [
        `Input1: ${sinput1}`,
        `Input1's Binary: ${binary1}`,
        `Steps:`,
        ...step1
    ];

    const result2Text = [
        `Input2: ${sinput2}`,
        `Input2's Binary: ${binary2}`,
        `Steps:`,
        ...step2
    ];

    typeWriter(result1, result1Text, 50, 200);
    typeWriter(result2, result2Text, 50, 200);

    if(Math.abs(sinput1)< Math.abs(sinput2))
    {
        alert("절댓값 Input1이 절댓값 Input2보다 작습니다. Input1과 Input2를 교환합니다.");
        var temp = binary1;
        binary1 = binary2;
        binary2 = temp;
    }
    
    for (var i = 0; i < 10; i++) {
        document.getElementById('a' + (9 - i)).value = binary1[i];
        document.getElementById('b' + (9 - i)).value = binary2[i];
    }
}

function AddBinary() {
    var result = parseInt(binary1) + parseInt(binary2);
    if(sinput1 > 0 && sinput2 > 0 || sinput1 < 0 && sinput2 < 0) {
        var c = 0;
        for(var i = 0; i < 9; i++) {
            (function(i) {
                setTimeout(function() {
            if(parseInt(binary1[9-i]) + parseInt(binary2[9-i]) + c == 0) {
                document.getElementById('r' + (i)).value = 0;
                document.getElementById('cb' + (i)).value = 0;
                c = 0;
            }
            else if(parseInt(binary1[9-i]) + parseInt(binary2[9-i]) + c == 1) {
                document.getElementById('r' + (i)).value = 1;
                document.getElementById('cb' + (i)).value = 0;
                c = 0;
            }
            else if(parseInt(binary1[9-i]) + parseInt(binary2[9-i]) + c == 2) {
                document.getElementById('r' + (i)).value = 0;
                document.getElementById('cb' + (i)).value = 1;
                c = 1;
            }
            else {
                document.getElementById('r' + (i)).value = 1;
                document.getElementById('cb' + (i)).value = 1;
                c = 1;
            }

        }, i*250); // 0.25초 간격으로 설정
         })(i);
    }
        if(sinput1 < 0 && sinput2 < 0)
        {
            document.getElementById('r' + (9)).value = 1;
        }
        else
        {
            document.getElementById('r' + (9)).value = 0;
        
        }
    }
    else
    {
        var br = 0;
        for(var i = 0; i < 10; i++) {
            (function(i) {
            setTimeout(function() {
            document.getElementById('r' + (i)).value = (parseInt(binary1[9-i]) ^ parseInt(binary2[9-i]))^br; 
            document.getElementById('cb' + (i)).value =br;
            br = br & (~(parseInt(binary1[9-i]) ^ parseInt(binary2[9-i]))) | ((~parseInt(binary1[9-i])) & parseInt(binary2[9-i]))
            }, i*250); // 0.25초 간격으로 설정
        })(i);
        } 
    }
}

function ConvertToDecimal() {
    var binary1 = document.getElementById("input1").value;
    var binary2 = document.getElementById("input2").value;
    var result = parseInt(binary1) + parseInt(binary2);
    document.getElementById('result').value = result;
}