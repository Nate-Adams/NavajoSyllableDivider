var navinput = "";      // The input from the user
var navarray = [];      // the input gets spliced and added to this array
var bloop = "";         //Delete this and anything including to it later
var cvcarray = [];      // This input contains information about a characters c or v status
var consonantsarray = Array.from(";'bcdghjklmnstwyz");
var vowelsarray = ["a","e","i","o"];
var tonalsarray = ["/","[","]"];
var twocharletterarray = ["ch","dl","dz","gh","hw","k'","kw","sh","t'","t;","ts","zh"];
var threecharletterarray = ["ch'","t;'","ts'"];
var finishedarray = [];
var finishedstring = "";
var slash = "-";
var charandtones = "";
navinput = "Áádóó Éíbel ałdóʼ hadibé áłtsé deishchíinii aláahgo łikʼaii łaʼ jiníłtı̨́. Áko Éíbel áádóó náájiisniiʼígíí éí Bóhólníihii bił yílįįd, 5 nidi Kéin índa nááyiisniiʼígíí doo bił yílįįd da. Áko Kéin tʼáá íiyisí báhóóchįįdgo hashké niidzı̨́ı̨́ʼ noosʼnííʼ. 6 Áko Bóhólníihii éí Kéin áyidííniid, Haʼátʼéegoshąʼ náhóóchįįdgo hashké nínídzin yínílniiʼ? 7 Yáʼátʼééh íinidzaago nidíʼnóodzįįł. Jó, doo yáʼátʼééh íinidzaagóó éí bąąhágiʼátʼéii nídin nilı̨́įgo chʼéʼétiindę́ę́ʼ naa héestı̨́, nidi bikʼeh dídleeh. 8 Nítʼééʼ Kéin hatsilí Éíbel bił ałchʼįʼ yájíłtiʼ, ákohgo dáʼákʼehgi Kéin bitsilí Éíbel yichʼįʼ nídiidzáago yiyiisxı̨́.";
//navinput = "ą́ą óó ií";

navinput = navinput.toLowerCase();
navarray = Array.from(navinput);

console.log(navinput);



for (i=0;i<navarray.length;i++){            //This for loop removes all tonal marks, ł, and ’ and replaces them with other characters
    if (navarray[i] === "́"){
        navarray[i] = "/";
    } else if (navarray[i] === "̨"){
        navarray[i] = "[";
    } else if (navarray[i] === "ł"){
        navarray[i] = ";";
    } else if (navarray[i] === "á"){
        navarray[i] = "a";
        navarray.splice(i + 1, 0, "/");
    } else if (navarray[i] === "ą"){
        navarray[i] = "a";
        navarray.splice(i + 1, 0, "[");
    } else if (navarray[i] === "é"){
        navarray[i] = "e";
        navarray.splice(i + 1, 0, "/");
    } else if (navarray[i] === "ę"){
        navarray[i] = "e";
        navarray.splice(i + 1, 0, "[");
    } else if (navarray[i] === "í"){
        navarray[i] = "i";
        navarray.splice(i + 1, 0, "/");
    } else if (navarray[i] === "į"){
        navarray[i] = "i";
        navarray.splice(i + 1, 0, "[");
    } else if (navarray[i] === "ó"){
        navarray[i] = "o";
        navarray.splice(i + 1, 0, "/");
    } else if (navarray[i] === "ǫ"){
        navarray[i] = "o";
        navarray.splice(i + 1, 0, "[");
    } else if (navarray[i] === "ń"){
        navarray[i] = "n";
        navarray.splice(i + 1, 0, "/");
    } else if (navarray[i] === "ʼ"){
        navarray[i] = "'";
    } else if (navarray[i] === "’"){
        navarray[i] = "'";
    }
}

for (i=0;i<navarray.length;i++){            //This loop removes hightone nazel characters and replaces it with "]"
    if (((navarray[i] === "/") && (navarray[i + 1] === "[")) || ((navarray[i] === "[") && (navarray[i + 1] === "/"))){
        navarray.splice(i + 1,1);
        navarray[i] = "]";
    }
}


// This loop creates a array with sub-arrays containing information about the character
// cvcarray contains sub-arrays with this format: [consonant name (""), consonant("c") vowel("v") or punctuation ("p"), tonal ("")].

for (i=0;i<navarray.length;i++){
    if (consonantsarray.includes(navarray[i])){     //if i is a consonant...
        if ((navarray[i] === "n") && (navarray[i + 1] === "/")){    //checking for higtone n
            cvcarray.splice(cvcarray.length,0,[navarray[i],"c","/"]);
        } else {
            cvcarray.splice(cvcarray.length,0,[navarray[i],"c",null]);
        }
    } else if (vowelsarray.includes(navarray[i])) {  //if i is a vowel
        if (tonalsarray.includes(navarray[i + 1])) {    //if the vowel has a tonal after it
            cvcarray.splice(cvcarray.length,0,[navarray[i],"v",navarray[i + 1]]);
        } else {
            cvcarray.splice(cvcarray.length,0,[navarray[i],"v",null]);
        }
    } else if (tonalsarray.includes(navarray[i])) {     //if i is a tonal, do nothing

    } else {    //Assume its a punctuation character
        cvcarray.splice(cvcarray.length,0,[navarray[i],"p",null]);
    }
}

console.log(cvcarray);




// This fixes multi-character letters

for (var i = 0; i < cvcarray.length; i++) {
    if ((cvcarray[i][1] === "v") && (cvcarray[i + 1][1] === "v")) {         //Makes double vowels one letter
        if ((cvcarray[i][2] === null) && (cvcarray[i + 1][2] === null)){        // Removes 0 in tonal glitch
            cvcarray.splice(i,2,[cvcarray[i][0] + cvcarray[i + 1][0],"v",null]);
        } else {
            cvcarray.splice(i,2,[cvcarray[i][0] + cvcarray[i + 1][0],"v",cvcarray[i][2] + cvcarray[i + 1][2]]);
        }
    } else if (cvcarray[i][1] === "c") {        // is i a consonant
        if ((i + 2 < cvcarray.length) && (threecharletterarray.includes(cvcarray[i][0] + cvcarray[i + 1][0] + cvcarray[i + 2][0]))  ) {  // check for three character letter
            cvcarray.splice(i,3,[cvcarray[i][0] + cvcarray[i + 1][0] + cvcarray[i + 2][0],"c",null]);
        } else if ((i + 1 < cvcarray.length) && (twocharletterarray.includes(cvcarray[i][0] + cvcarray[i + 1][0]))) {      //check for two character letter
            cvcarray.splice(i,2,[cvcarray[i][0] + cvcarray[i + 1][0],"c",null]);
        }
    }
}







console.log(cvcarray);
for (i=0;i<navarray.length;i++){  //Delete this at some point
    bloop = bloop + navarray[i];
}
console.log(bloop);

bloop = "";

for (i=0;i<cvcarray.length;i++){
    bloop = bloop + cvcarray[i][1];
}

console.log(bloop);





//Now we add the vertical bars
for (var i = 0; i < cvcarray.length; i++) {
    if ((cvcarray[i][1] === "c") && (cvcarray[i + 1][1] === "v")) {   // CV
        cvcarray.splice(i,0,[slash,"l",null]);
        i++;
    }
}



bloop = "";  // Delete this
for (var i = 0; i < cvcarray.length; i++) {
    if (cvcarray[i][1] === "l"){
        bloop = bloop + slash;
    } else {
        bloop = bloop + cvcarray[i][1];
    }
}

console.log(bloop);




//Now we start reconstructing the sentense.

for (var i = 0; i < cvcarray.length; i++) {
    console.log(cvcarray[i][2]);


    if ((cvcarray[i][1] === "v") && (cvcarray[i][2] !== null)){     // if i is a vowel with a tonal mark
        if (cvcarray[i][0].length === 1) {  //if i is not a double vowel
            charandtones = charandtones + cvcarray[i][0];
            charandtones = charandtones + cvcarray[i][2];

//            finishedarray.splice(i,0,cvcarray[i][0]);
//            finishedarray.splice(i,0,cvcarray[i][2]);
        } else if (cvcarray[i][0].length === 2) {   // if i is a double vowel
            if ((tonalsarray.includes(cvcarray[i][2].charAt(0))) && (tonalsarray.includes(cvcarray[i][2].charAt(1)))){ // if it has 2 tonals
                charandtones = charandtones + cvcarray[i][0].charAt(0);
                charandtones = charandtones + cvcarray[i][2].charAt(0);
                charandtones = charandtones + cvcarray[i][0].charAt(1);
                charandtones = charandtones + cvcarray[i][2].charAt(1);

//                finishedarray.splice(i,0,cvcarray[i][0].charAt(0));
//                finishedarray.splice(i,0,cvcarray[i][2].charAt(0));
//                finishedarray.splice(i,0,cvcarray[i][0].charAt(1));
//                finishedarray.splice(i,0,cvcarray[i][2].charAt(1));
            } else if ((tonalsarray.includes(cvcarray[i][2].charAt(0))) && (tonalsarray.includes(cvcarray[i][2].charAt(1)) === false)) {
                charandtones = charandtones + cvcarray[i][0].charAt(0);
                charandtones = charandtones + cvcarray[i][2].charAt(0);
                charandtones = charandtones + cvcarray[i][0].charAt(1);


//                finishedarray.splice(i,0,cvcarray[i][0].charAt(0));
//                finishedarray.splice(i,0,cvcarray[i][2].charAt(0));
//                finishedarray.splice(i,0,cvcarray[i][0].charAt(1));
            } else if ((tonalsarray.includes(cvcarray[i][2].charAt(1))) && (tonalsarray.includes(cvcarray[i][2].charAt(0)) === false)){
                charandtones = charandtones + cvcarray[i][0];
                charandtones = charandtones + cvcarray[i][2].charAt(4);

//                finishedarray.splice(i,0,cvcarray[i][0]);
//                finishedarray.splice(i,0,cvcarray[i][2].charAt(4));
            }
        }
    } else if ((cvcarray[i][0] === "n") && (cvcarray[i][2] !== null)) {  // if i is hightone n
        charandtones = charandtones + cvcarray[i][0];
        charandtones = charandtones + cvcarray[i][2];

//        finishedarray.splice(i,0,cvcarray[i][0]);
//        finishedarray.splice(i,0,cvcarray[i][2]);
    } else {
        charandtones = charandtones + cvcarray[i][0];

//        finishedarray.splice(i,0,cvcarray[i][0]);
    }


}

console.log(charandtones);

finishedarray = Array.from(charandtones);

for (var i = 0; i < finishedarray.length; i++) {
    if (tonalsarray.includes(finishedarray[i])) {
        if (finishedarray[i] === "/"){
            finishedarray[i] = "́";
        } else if (finishedarray[i] === "[") {
            finishedarray[i] = "̨";
        } else if (finishedarray[i] === "]") {
            finishedarray[i] = "̨́";
        } else {
            console.log("Error in converting tonal symbol to tonal mark");
        }
    } else if (finishedarray[i] === ";") {
        finishedarray[i] = "ł";
    } else if (finishedarray[i] === "'") {
        finishedarray[i] = "’";
    } else if ((finishedarray[i] === " ") && (finishedarray[i + 1] === slash)) {
        finishedarray.splice(i + 1,1);
    }
}

if (finishedarray[0] === slash){
    finishedarray.splice(0,1);
}


/*

for (var i = 0; i < finishedarray.length; i++) {
    finishedstring = finishedstring + finishedarray[i];
}

*/

for (var i = 0; i < finishedarray.length; i++) {
    finishedstring = finishedstring + finishedarray[i];
}

console.log(finishedarray);
console.log(finishedstring);
