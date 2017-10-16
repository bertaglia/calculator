var answArr = [];
var scr = [];

var disp = $('#res');
var hist = $('#hist');

disp[0].innerText = '0';
hist[0].innerText = '0';

$(document).ready(function() {
    $(document).on('click', 'button', function t() {action($(this).val());});
    $(document).on("keydown", function k(event) {translateKeyPressed(event.key);});
});

function translateKeyPressed(key){

    switch (key) {
        case "C":
        case "c":
            action("clear");
            break;

        case "a":
        case "A":
            action("aClear");
            break;

        case "Enter":
            action("=");
            break;

        case "Delete":
            action("Backspace")
            break;

        case ",":
            action(".")
            break;

        default:
            action(key);
    }
}


function action(input) {
    //limit display to 12 characters
    if (disp[0].innerText.length < 13 || input == '=' || input == 'aClear' || input == 'clear' || input == 'backspace' ||  input == '-1') {
        switch (input) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '.':
                if ((answArr.length > 0) && (!isNaN(answArr[answArr.length - 1]))) {
                    answArr[answArr.length - 1] += input;
                    scr[scr.length - 1] += input;
                } else {
                    answArr.push(input);
                    scr.push(input);
                }
                disp[0].innerText = scr.join('');
                break;

            case '+':
            case '-':
            case '/':
            case '*':
                if (answArr.length              >  0   &&
                    answArr[answArr.length - 1] != '+' &&
                    answArr[answArr.length - 1] != '-' &&
                    answArr[answArr.length - 1] != '/' &&
                    answArr[answArr.length - 1] != '*') {

                    answArr.push(input);
                    switch (input) {
                        case '*':
                            scr.push('x');
                            break;
                        case '/':
                            scr.push('\xF7');
                            break;
                        default:
                            scr.push(input);
                            break;
                    }
                    disp[0].innerText = scr.join('');
                }
                break;

            case '(':
            case ')':
                answArr.push(input);
                scr.push(input);
                disp[0].innerText = scr.join('');
                break;

            case '-1':
                if ((answArr.length > 0) && (!isNaN(answArr[answArr.length - 1]))) {
                    answArr[answArr.length - 1] = answArr[answArr.length - 1] * -1;
                    scr[scr.length - 1] = scr[scr.length - 1] * -1;
                    disp[0].innerText = scr.join('');
                }
                break;

            case '%':
                if (answArr.length > 0) {
                    if (!isNaN(answArr[answArr.length - 1])) {
                        answArr[answArr.length - 1] = (Number(answArr[answArr.length - 1] / 100).toFixed(2)).toString();
                        scr[scr.length - 1] += input;
                        disp[0].innerText = scr.join('');
                    }
                }
                break;

            case '=':
                hist[0].innerText = scr.join('');
                try {
                    if (eval(answArr.join('')).toString().length <= 12) {
                        disp[0].innerText = eval(answArr.join(''));
                    } else {
                        disp[0].innerText = eval(answArr.join('')).toFixed(11);
                    }
                } catch (e) {
                    disp[0].innerText = 'syntax error'
                }
                scr = [];
                answArr = [];
                break;

            case 'aClear':
                scr = [];
                answArr = [];
                disp[0].innerText = '0';
                hist[0].innerText = '0';
                break;

            case 'clear':
                answArr.pop();
                scr.pop();
                disp[0].innerText = scr.join('');
                break;

            case 'Backspace':
                if (answArr.length > 0) {
                    if (answArr[answArr.length - 1].length > 1) {
                        answArr[answArr.length - 1] = answArr[answArr.length - 1].substring(0, answArr[answArr.length - 1].length - 1);
                        scr[scr.length - 1] = scr[scr.length - 1].substring(0, scr[scr.length - 1].length - 1);
                    } else if (answArr[answArr.length - 1].length == 1) {
                        answArr.pop();
                        scr.pop();
                    }
                }
                disp[0].innerText = scr.join('');
                break;
            default:
        }
    }

    if (disp[0].innerText == '') {
        disp[0].innerText = '0';
    }
}
