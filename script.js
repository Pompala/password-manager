
		    function wrap(n, low, high)
			{
				var range = high - low;
				var mod = n % range;
				return mod + low;
			}

			function selectText(containerid) {
				if (document.selection) { // IE
					var range = document.body.createTextRange();
					range.moveToElementText(document.getElementById(containerid));
					range.select();
				} else if (window.getSelection) {
					var range = document.createRange();
					range.selectNode(document.getElementById(containerid));
					window.getSelection().removeAllRanges();
					window.getSelection().addRange(range);
					}
			}
			
			function copyToClipboard() {
				var copyText = document.getElementById("wynik1");
				var hiddenText = false;
				if(copyText.type =="password") {
					copyText.type = "text";
					hiddenText = true;
				}
				copyText.select();
				copyText.setSelectionRange(0, 99999)
				document.execCommand("copy");
				if(hiddenText == true) {
					copyText.type = "password";
				}
				alert("Skopiowano do schowka!");
			}

			function generuj()
			{
				var haslo;
				var strona;
				haslo = document.getElementById('password').value;
				strona = document.getElementById('site').value;
				var passhash = CryptoJS.SHA256(haslo + "_" + strona + "_" + "sól").toString();
				var sign = "";
				var finalPass = "";
				var finalSign = "";
				
				// 0 - 32  = ZNAKI niedrukowalne
				// 33 - 126 = znaki drukowalne
				// 127 - DEL
				// 128 - 254 - rozszerzone znaki
				// 255 - spacja
				
				for (var i = 0; i < passhash.length; i+= 2)
				{
					sign = passhash.substr(i, 2).toUpperCase();
					//console.log(sign);
					var signDec = parseInt(sign, 16);
					
					if (signDec > 32 && signDec < 127) 
					{
						finalSign = String.fromCharCode(signDec);
					}
					else if (signDec >= 0 && signDec < 33)
					{
						switch(signDec)
						{
							case 0:
								finalSign = 'a';
								break;
							case 1:
								finalSign = 'b';
								break;
							case 2:
								finalSign = 'c';
								break;
							case 3:
								finalSign = 'd';
								break;
							case 4:
								finalSign = 'e';
								break;
							case 5:
								finalSign = 'f';
								break;
							case 6:
								finalSign = 'g';
								break;
							case 7:
								finalSign = 'h';
								break;
							case 8:
								finalSign = 'i';
								break;
							case 9:
								finalSign = 'j';
								break;
							case 10:
								finalSign = 'k';
								break;
							case 11:
								finalSign = 'l';
								break;
							case 12:
								finalSign = 'm';
								break;	
							case 13:
								finalSign = 'n';
								break;
							case 14:
								finalSign = 'o';
								break;
							case 15:
								finalSign = 'p';
								break;
							case 16:
								finalSign = 'q';
								break;
							case 17:
								finalSign = 'r';
								break;
							case 18:
								finalSign = 's';
								break;
							case 19:
								finalSign = 't';
								break;
							case 20:
								finalSign = 'u';
								break;
							case 21:
								finalSign = 'v';
								break;
							case 22:
								finalSign = 'w';
								break;
							case 23:
								finalSign = 'x';
								break;
							case 24:
								finalSign = 'y';
								break;
							case 25:
								finalSign = 'z';
								break;
							case 26:
								finalSign = '@';
								break;
							case 27:
								finalSign = '#';
								break;
							case 28:
								finalSign = '$';
								break;
							case 29:
								finalSign = '%';
								break;
							case 30:
								finalSign = '~';
								break;
							case 31:
								finalSign = '&';
								break;
							case 32:
								finalSign = '*';
								break;
						}
					}
					else if (signDec == 127)
					{
						finalSign = '+';
					}
					else if (signDec > 127 && signDec < 255)
					{
						finalSign = String.fromCharCode(wrap(signDec, 33, 126));
						//console.log(finalSign);
					}
					else if(signDec == 255) finalSign = '=';
				
					finalPass += finalSign;
				}
				
				
				
				if(haslo=="" && strona=="") {
					window.alert("Podaj haslo i strone!");
				}
				else if(haslo=="") {
					window.alert ("Wpisz haslo!");
				}
				else if(strona=="") {
					window.alert ("Podaj stronę!");
				}
				else {
					document.getElementById('wynik1').value = finalPass;
					document.getElementById('copyButton').style.display = 'initial';
				}

			}
			
			function pokaz() 
			{
				var y = document.getElementById("wynik1");
				var x = document.getElementById("password");
				if(x.type == "password") 
				{
					y.type = "text";
					x.type = "text";
				} 
				else 
				{
					y.type = "password";
					x.type = "password";
				}
			}