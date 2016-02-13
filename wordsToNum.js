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
