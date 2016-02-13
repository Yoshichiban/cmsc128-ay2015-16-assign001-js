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

  /******************
      Analyze input string starting from the rightmost position
  *******************/
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
