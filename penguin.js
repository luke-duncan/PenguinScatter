console.log("hi")

var sortByProperty = function(property)
{
    return function(a,b)
    {
        if(a[property] == b[property])
            {return 0}
        else if (a[property] < b[property])
            {return 1}
        else
            {return -1}
    }
}

var classDataPromise = d3.json("classData.json");
    classDataPromise.then(function(penguin) {
        console.log("worked", penguin);
        penguin.sort(sortByProperty("property"))
        displayFinalvHW(penguin)
    },
    
    function(err){
        console.log("failed:", err);
    })

var getmeanHW = function(penguin){
var meanHW = penguin.homework.map(function(homework){
            return (homework.grade)})
                                              
            return d3.mean(meanHW)}

var getmeanQuizes = function(penguin)
        {
            var meanQuizes = penguin.quizes.map(function(quizes){
                                                
            return (quizes.grade)
                                                })
        return d3.mean(meanQuizes)}

   var getmeanTest = function(penguin)
    { var meanTest = 
        penguin.test.map(function(test){ 
        return (test.grade)})
    
    return d3.mean(meanTest)}
   
   var getFinal = function(penguin)
   {return penguin.final[0].grade}
   
var displayFinalvHW = function(penguins)
{
    var width = 550;
    var height= 300;
    
   //set height and width
    var svg = d3.select("#spread svg")
            .attr("width",width)
            .attr("height",height)
            .attr("id","graph")
    
   
    //create Scales for each dimension
    var xScale = d3.scaleLinear()
                .domain([
                          d3.min(penguins,getFinal),
                          d3.max(penguins,getFinal)
                        ])
                .range([0,width])
    
    var yScale = d3.scaleLinear()
                .domain([
                          d3.min(penguins,getmeanHW),
                          d3.max(penguins,getmeanHW)
                        ])
                .range([height,0]);

    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);


    svg.selectAll("circle")
        .data(penguins)
        .enter()
        .append("circle")
        .attr("cx",function(penguin,index)
        {
            return xScale(getFinal(penguin));    
        })
        .attr("cy",function(penguin)
        {
            return yScale(getmeanHW(penguin));  
        })
        .attr("r",3)
        .attr("fill",function(penguin)
        {
            return colorScale(penguin.final[0].grade);
        })
    
    
    
    .on("mouseover", function(penguin)
       {var xPosition = d3.event.pageX;
        var yPosition = d3.event.pageY;
            d3.select("#tooltip")
                .style("right", xPosition + "px")
                .style("top", yPosition+ "px")
                .select("img")
                .attr("src", "imgs/" + penguin.picture)
                
        
        d3.select("#tooltip").classed("hidden",false)
        
       }
       ) 
    .on("mouseout", function()
       {
        d3.select("#tooltip").classed("hidden",true)
    }
       )
    
    
    
    
    
    
    
    
        d3.select("#finalvmeanhw").on("click", function()
        {
            d3.selectAll("circle")
            .remove();
            displayFinalvHW(penguins)
        })
    d3.select("#hwmeanvquizmean").on("click", function()
        {
            d3.selectAll("circle")
            .remove();
            displayHWvQuiz(penguins)
        })
    d3.select("#testmeanvfinal").on("click", function()
        {
            d3.selectAll("circle")
            .remove();
            displayTestvFinal(penguins)
        })
     d3.select("#meantestvquizmean").on("click", function()
        {
            d3.selectAll("circle")
            .remove();
            displayTestvQuiz(penguins)
        })
}

var displayHWvQuiz = function(penguins)
{
    var width = 550;
    var height= 300;
    
   //set height and width
    var svg = d3.select("#spread svg")
            .attr("width",width)
            .attr("height",height)
            .attr("id","graph")
    
   
    //create Scales for each dimension
    var xScale = d3.scaleLinear()
                .domain([
                          d3.min(penguins,getmeanHW),
                          d3.max(penguins,getmeanHW)
                        ])
                .range([0,width])
    
    var yScale = d3.scaleLinear()
                .domain([
                          d3.min(penguins,getmeanQuizes),
                          d3.max(penguins,getmeanQuizes)
                        ])
                .range([height,0]);

    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);


    svg.selectAll("circle")
        .data(penguins)
        .enter()
        .append("circle")
        .attr("cx",function(penguin,index)
        {
            return xScale(getmeanHW(penguin));    
        })
        .attr("cy",function(penguin)
        {
            return yScale(getmeanQuizes(penguin));  
        })
        .attr("r",3)
        .attr("fill",function(penguin)
        {
            return colorScale(penguin.final[0].grade);
        })
    .on("mouseover", function(penguin)
       {var xPosition = d3.event.pageX;
        var yPosition = d3.event.pageY;
            d3.select("#tooltip")
                .style("right", xPosition + "px")
                .style("top", yPosition+ "px")
                .select("img")
                .attr("src", "imgs/" + penguin.picture)
                
        
        d3.select("#tooltip").classed("hidden",false)
        
       }
       ) 
    .on("mouseout", function()
       {
        d3.select("#tooltip").classed("hidden",true)
    }
       )
    
}

var displayTestvFinal = function(penguins)
{
    var width = 550;
    var height= 300;
    
   //set height and width
    var svg = d3.select("#spread svg")
            .attr("width",width)
            .attr("height",height)
            .attr("id","graph")
    
   
    //create Scales for each dimension
    var xScale = d3.scaleLinear()
                .domain([
                          d3.min(penguins,getmeanTest),
                          d3.max(penguins,getmeanTest)
                        ])
                .range([0,width])
    
    var yScale = d3.scaleLinear()
                .domain([
                          d3.min(penguins,getFinal),
                          d3.max(penguins,getFinal)
                        ])
                .range([height,0]);

    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);


    svg.selectAll("circle")
        .data(penguins)
        .enter()
        .append("circle")
        .attr("cx",function(penguin,index)
        {
            return xScale(getmeanTest(penguin));    
        })
        .attr("cy",function(penguin)
        {
            return yScale(getFinal(penguin));  
        })
        .attr("r",3)
        .attr("fill",function(penguin)
        {
            return colorScale(penguin.final[0].grade);
        })
    .on("mouseover", function(penguin)
       {var xPosition = d3.event.pageX;
        var yPosition = d3.event.pageY;
            d3.select("#tooltip")
                .style("right", xPosition + "px")
                .style("top", yPosition+ "px")
                .select("img")
                .attr("src", "imgs/" + penguin.picture)
                
        
        d3.select("#tooltip").classed("hidden",false)
        
       }
       ) 
    .on("mouseout", function()
       {
        d3.select("#tooltip").classed("hidden",true)
    }
       )
    
}

var displayTestvQuiz = function(penguins)
{
    var width = 550;
    var height= 300;
    
   //set height and width
    var svg = d3.select("#spread svg")
            .attr("width",width)
            .attr("height",height)
            .attr("id","graph")
    
   
    //create Scales for each dimension
    var xScale = d3.scaleLinear()
                .domain([
                          d3.min(penguins,getmeanTest),
                          d3.max(penguins,getmeanTest)
                        ])
                .range([0,width])
    
    var yScale = d3.scaleLinear()
                .domain([
                          d3.min(penguins,getmeanQuizes),
                          d3.max(penguins,getmeanQuizes)
                        ])
                .range([height,0]);

    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);


    svg.selectAll("circle")
        .data(penguins)
        .enter()
        .append("circle")
        .attr("cx",function(penguin,index)
        {
            return xScale(getmeanTest(penguin));    
        })
        .attr("cy",function(penguin)
        {
            return yScale(getmeanQuizes(penguin));  
        })
        .attr("r",3)
        .attr("fill",function(penguin)
        {
            return colorScale(penguin.final[0].grade);
        })
    .on("mouseover", function(penguin)
       {var xPosition = d3.event.pageX;
        var yPosition = d3.event.pageY;
            d3.select("#tooltip")
                .style("right", xPosition + "px")
                .style("top", yPosition+ "px")
                .select("img")
                .attr("src", "imgs/" + penguin.picture)
                
        
        d3.select("#tooltip").classed("hidden",false)
        
       }
       ) 
    .on("mouseout", function()
       {
        d3.select("#tooltip").classed("hidden",true)
    }
       )
    
}


    
   
   