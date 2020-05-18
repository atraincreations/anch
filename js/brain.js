var purchasePrice;
var purchaseAmount;
var sellPrice;

var totalPurchaseCost;
var finalSale;
var profit;

// trend variables
/* var mondayMorn;
var mondayNoon;
var tuesdayMorn;
var tuesdayNoon;
var wednesdayMorn;
var wednesdayNoon;
var thursdayMorn;
var thursdayNoon;
var fridayMorn;
var fridayNoon;
var saturdayMorn;
var saturdayNoon; */

var trendValue;
var trendArr = [];
var valueArr = [];

var standardValue;
var suddenSpikeValue;
var downwardTrendValue;
var slowSpikeValue;

var lowMarket = 99; // 0 to 99 bells
//var mediumMarket = 199; // 100 to 199 bells
var highMarket = 200; // 200 or more bells


function checkClass(){
    if($(".profit").hasClass("positive")){
        $(".profit").toggleClass("positive")
    }
    if($(".profit").toggleClass("loss")){
        $(".profit").toggleClass("loss")
    }
}

/*
    There are 4 kinds of stock pricing guides
    Standard
    Sudden spike
    Downward trend
    Slow spike

    Create scoring algo to add and subtract from a variable and determine 
    the market with an ending value based on the number of entries

    first a function needs to go through and eval all inputs
*/

function evaluateInputs() {
    console.log("evaluateInputs() running")
    $(".stalks :input").each(function(index){
        if(index <= 11) {
            console.log(index + ": " + $( this ).val());
            if(index <= 11) {
                trendArr.push($(this).val());
            }
        }
    })

    console.log(trendArr);

    // grab opening value
    valueArr.push(trendArr[0]);
    console.log(valueArr);

    // check opening value each day to determine high or low
    $.each(trendArr, function(index){
        if(index %2 !== 0) {
            valueArr.push(trendArr[index]);
        }
    });
    console.log("Printing Value Array: " + valueArr);
};

function standardStocks() {
    // low | u u u d d u u
    // low | up down up
}

function suddenSpike() {
    // h | d d u d d u u 
    // high | down down up
}

function downwardTrend() {
    // m | u u d d d u u
    // medium | up down up
}

function slowSpike() {
    // h | d d d d u d d 
    // high | down down down
}

function marketType() {
    // Array to hold trend data
    var finalTrendArr = [];
    if(valueArr[0] == "" && valueArr[1] == "") {
        $(".trend-description").text("You did not provide enough data");
        $(".trend-suggestion").text("we can only properly predict market trend with first Monday data");
    } else {
        if(valueArr[0] !== "" && valueArr[0] < lowMarket) {
            console.log("Low market");
            finalTrendArr.push("Low");
            $(".trend-description").text("You could be in a Standard Market");
            $(".trend-suggestion").text("Low markets tend to climb throughout the week, and then drop significantly towards the end. They typically rise just before the week ends. Don't panic if it crashes, it may rise again by Saturday night.");
        } else if(valueArr[0] !== "" && valueArr[0] > lowMarket && valueArr[0] < highMarket) {
            console.log("Medium market");
            finalTrendArr.push("Medium");
            $(".trend-suggestion").text("These markets are like a reverse bell-curve. They start high, drop substantially, and then begin to rise to finish out the week. Sell quickly, or ride it out to the end. Don't panic on Wednesday when it's real low.");
            $(".trend-description").text("You could be in a Downward Trending Market")
        } else if(valueArr[0] !== "" && valueArr[0] > highMarket) {
            console.log("High market");
            finalTrendArr.push("High");
            $(".trend-suggestion").text("Slow spike markets are down for most of the week and then will spike over a day only to drop right after. Sudden spike markets are very volatile and will rise and fall every other day.");
            $(".trend-description").text("You could be in a Slow or Sudden Spiking Market")
        } else if(valueArr[0] == "") {
            if(valueArr[1] < lowMarket) {
                console.log("Low market");
                finalTrendArr.push("Low");
                $(".trend-suggestion").text("Low markets tend to climb throughout the week, and then drop significantly towards the end. They typically rise just before the week ends. Don't panic if it crashes, it may rise again by Saturday night.");
                $(".trend-description").text("You could be in a Standard Market")
            } else if(valueArr[1] > lowMarket && valueArr[1] < highMarket) {
                console.log("Medium market");
                finalTrendArr.push("Medium");
                $(".trend-suggestion").text("These markets are like a reverse bell-curve. They start high, drop substantially, and then begin to rise to finish out the week. Sell quickly, or ride it out to the end. Don't panic on Wednesday when it's real low.");
                $(".trend-description").text("You could be in a Downward Trending Market")
            } else if(valueArr[1] > highMarket) {
                console.log("High market");
                finalTrendArr.push("High");
                $(".trend-suggestion").text("Slow spike markets are down for most of the week and then will spike over a day only to drop right after. Sudden spike markets are very volatile and will rise and fall every other day.");
                $(".trend-description").text("You could be in a Slow or Sudden Spiking Market")
            } else {
                $(".trend-description").text("You did not provide enough data");
                $(".trend-suggestion").text("we can only properly predict market trend with first Monday data");
            }
        } else { console.log("error") }
    }
    

    var previousValue = valueArr[0];
    for (i=1; i < valueArr.length; i++) {
        if (valueArr[i] !== "" && previousValue < valueArr[i]){
            finalTrendArr[i] = "Up";
        } else if (valueArr[i] !== "" && previousValue > valueArr[i]) {
            finalTrendArr[i] = "Down";
        } else if (valueArr[i] == "") {
            finalTrendArr[i] = "null";
        } else {
            console.log("A serious error has occured!")
        }

        previousValue = valueArr[i];
    }
    console.log(finalTrendArr);
    
}

$(".predict-btn").on("click", function(){
    console.log("clicked")
    evaluateInputs();
    marketType();
    $("#below-text").text("use the calculator below to see what kind of profit you could make!")
});


$(".calculate").on("click",function(){
    checkClass();

    purchasePrice = $("#purchase-price").val();
    purchaseAmount = $("#quantity").val();
    sellPrice = $("#sell-price").val();

    totalPurchaseCost = purchasePrice * purchaseAmount;
    $(".start-value").text("$" + totalPurchaseCost.toLocaleString('en'));
    finalSale = sellPrice * purchaseAmount;
    $(".end-value").text("$" + finalSale.toLocaleString('en'));
    profit = finalSale - totalPurchaseCost;
    $(".profit").text("$" + profit.toLocaleString('en'));
    if(profit > 0) {
        $(".profit").toggleClass("positive")
    } else {
        $(".profit").toggleClass("loss")
    }
});


