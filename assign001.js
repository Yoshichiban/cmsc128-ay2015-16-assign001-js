/*******

  Converts input number to its equivalent word form
  
*******/
function numToWords(input){

  var output = "";
  var pointer;  //utilizes the value of the input as an index to retrieve the corresponding word form from the array for the number
  var n;  //counter to loop from rightmost to leftmost of the input
  var p = 1;  //counter to determine the current position(set of 3 numbers)
  var str = "";
  var temp = "";

  //arrays for the string outputs
  var ones = [null, "one","two","three","four","five","six","seven","eight","nine"];  //the null is necessary in dealing with zeroes outside the ones position
  var tensSpecial = ["ten", "eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
  var tens = [null,null,"twenty","thirty","fourty","fifty","sixty","seventy","eighty","ninety"]

  n = input.length - 1;
  input = input.split("");

  /***
      Analyze input string starting from the rightmost position
  ***/
  //loop to deal with the ones and tens position

  while(n >= 0 && p<=3){
    if(n-1 < 0){ //if the set consists of a single digit number
      if(input[n] == 0 && p == 1){
        str = "zero";
      }
      else if(input[n] == 0 && p ==3){//0 at the millions digit
        str = "";
      }
      else{
        str = ones[input[n]];  //if not a zero, find the corresponding word from the ones array
      }
    }
    else if(input[n-2] == 0 || n-2 < 0){  //the hundreds/thousands position is either 0 or not existing(null); output the tens and ones digit then move the pointer n to the left(next set of digits, if existing)
      if(input[n-1] == 1){   //loop to deal with the special "tens" combination
        str = tensSpecial[input[n]];
      }
      else if(input[n-1] != 0){
        str = tens[input[n-1]];
      }
      if(input[n] != 0 && input[n-1] != 1){ //if the ones digit is not zero and is not part of a special tens combination, concatenate the ones digit
        str = str.concat(" " + ones[input[n]]);
      }
    }
       
    else{ //else, proceed normally for the 3-number set
      str = ones[input[n-2]];
      str = str.concat(" hundred ");
      if(input[n-1] == 1){
         str = str.concat(tensSpecial[input[n]]); //loop to deal with the special "tens combination"
      }
      else if(input[n-1] != 0){
        str = str.concat(tens[input[n-1]] + " ");
      }
      if([input[n]] != 0 && input[n-1] != 1){ //if the ones digit is not zero and is not part of a special tens combination, concatenate the ones digit
        str = str.concat(ones[input[n]]);
      }
    }

    if(p == 2 && (input[n] != 0 || input[n-1] !=0 || input[n-2] !=0)){
      str = str.concat(" thousand ");

    }
    if(p == 3 && input[n] != 0){
      str = str.concat(" million ");
    }
    str = str.concat(output);
    output = str;
    p = p+1;  //update the "level" of the set of 3 numbers
    n = n-3;  //move pointer to the next set of 3 numbers
  }
  document.write(output);
}

/*******

  Accepts a number in word form (from zero to 1 million) and returns it in numerical form.
  Input must be in lowercase.
  
  Converts a number in word form to its numerical form.
  
*******/
function wordsToNum(input){

  var n;  //length of the array containing the words
  var i;  //counter
  var val;  //array for the values that will be computed
  var temp = "("; //output; return value

  /*******
  "hash"/objects to get the value of each word
  *******/
  var num = {"zero" : 0, "one" : 1,"two" : 2,"three" : 3,"four" : 4,"five" : 5,"six" : 6,"seven" : 7,"eight" : 8,"nine" : 9,
  "ten": 10, "eleven" : 11,"twelve" : 12,"thirteen" : 13,"fourteen" : 14,"fifteen" : 15,"sixteen" : 16,"seventeen" : 17,"eighteen" : 18,"nineteen" : 19,"twenty" : 20,"thirty" : 30,"fourty" : 40,"fifty" : 50,"sixty" : 60,"seventy" : 70,"eighty" : 80,"ninety" : 90,};
  var places = {"hundred" : 100};
  var group = {"thousand" : 1000, "million" : 1000000};


  str = input.split(" ");
  n = str.length;

  for(i = 0; i<n; i++){ //convert each and every words into its corresponding value, along with the appropriate operators
    //add numbers depending on which array they exist
    if(str[i] in num){
      temp = temp.concat(num[str[i]]);
    }
    else if(str[i] in places){
      temp = temp.concat(places[str[i]]);
    }
    else{
      temp = temp. concat(")*" + group[str[i]] + "+(");
    }

    //add operators depending on what type the next will be
    if(str[i+1] in num && !(str[i] in group)){
      temp = temp.concat("+");
    }
    else if(str[i+1] in places && !(str[i] in group)){
      temp = temp.concat("*");
    }
    else if(str[i+1] == null){
      temp = temp.concat(")");
    }
  }
  temp = eval(temp);  //evaluate the string expression to get the number converted from the input strings
  return temp;
}

/*******

  Accepts two arguments:
  the first argument is the number in word form(from zero to 1 million) and
  the second argument is any of the following: JPY, PHP, USD. 
  The function returns the number in words to its numerical form with a prefix of the currency.

*******/
function wordsToCurrency(input,currency){

  var n;  //length of the array containing the words
  var i;  //counter
  var val;  //array for the values that will be computed
  var temp = "("; //output; return value

  /*******
  "hash"/objects to get the value of each word
  *******/
  var num = {"zero" : 0, "one" : 1,"two" : 2,"three" : 3,"four" : 4,"five" : 5,"six" : 6,"seven" : 7,"eight" : 8,"nine" : 9,
  "ten": 10, "eleven" : 11,"twelve" : 12,"thirteen" : 13,"fourteen" : 14,"fifteen" : 15,"sixteen" : 16,"seventeen" : 17,"eighteen" : 18,"nineteen" : 19,"twenty" : 20,"thirty" : 30,"fourty" : 40,"fifty" : 50,"sixty" : 60,"seventy" : 70,"eighty" : 80,"ninety" : 90,};
  var places = {"hundred" : 100};
  var group = {"thousand" : 1000, "million" : 1000000};
  var currList = ['JPY',"PHP","USD"]; //array of accepted currency types


  str = input.split(" ");
  n = str.length;

  for(i = 0; i<n; i++){ //convert each and every words into its corresponding value, along with the appropriate operators
    //add numbers depending on which array they exist
    if(str[i] in num){
      temp = temp.concat(num[str[i]]);
    }
    else if(str[i] in places){
      temp = temp.concat(places[str[i]]);
    }
    else{
      temp = temp. concat(")*" + group[str[i]] + "+(");
    }

    //add operators depending on what type the next will be
    if(str[i+1] in num && !(str[i] in group)){
      temp = temp.concat("+");
    }
    else if(str[i+1] in places && !(str[i] in group)){
      temp = temp.concat("*");
    }
    else if(str[i+1] == null){
      temp = temp.concat(")");
    }
  }
  temp = eval(temp);  //evaluate the string expression to get the number converted from the input strings

  if(currList.includes(currency)){  //concatenate the value to the input currency if it is valid(exists in the currList array)
    currency = currency.concat(temp);
    return currency;
  }
  else{ //loop for invalid currency input
    temp = temp.toString(); //convert to string for concat function to work
    temp = temp.concat(" *** invalid currency");
    return temp;
  }
}
