
// Create svg
const svg = d3.select('.canvas')
    .append('svg')
        .attr('width', 1200)
        .attr('height', 800)

// Create margins, height and weight
const margin = {top: 50, right: 50, bottom: 50, left: 100}
const graphHeight = 800 - margin.top - margin.bottom;
const graphWidth = 1200 - margin.left - margin.right;

// Create graph where all rects will be included
const graph = svg.append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

// Information axes
const xAxisGroup = graph.append('g')
    .attr('transform', `translate(0, ${graphHeight})`);

const yAxisGroup = graph.append('g');

// Load JSON
d3.json('techs.json').then(data => {

    // X and Y scalers
    const x = d3.scaleBand()
        .domain(data.map(d => d.tech))
        .range([0, graphWidth])
        .paddingInner('0.2')
        .paddingOuter('0.3')

    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([graphHeight, 0])

    // Colours
    const colour = d3.scaleSequential(d3.interpolateBuGn)
        .domain([0, 100])

    const rects = graph.selectAll('rect')
        .data(data)

    // Add rects to rects already in the DOM
    rects.attr('width', x.bandwidth)
        .attr('height', d => graphHeight - y(d.level))
        .attr('x', d => x(d.tech))
        .attr('y', d => y(d.level))
        .attr('fill', (d, i) => colour(d.level))

    // Add new rects to the DOM
    rects.enter()
        .append('rect')
            .attr('width', x.bandwidth)
            .attr('height', d => graphHeight - y(d.level))
            .attr('x', d => x(d.tech))
            .attr('y', d => y(d.level))
            .attr('fill', (d, i) => colour(d.level))
    
    // Create axes
    const xAxis = d3.axisBottom(x)
    const yAxis = d3.axisLeft(y)
        .ticks(20)
        .tickFormat(d => d + ' %');

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    xAxisGroup.selectAll('text')
        .attr('fill', 'black')
        .attr('transform', 'translate(0, 10)')
        .attr('text-anchor', 'center')
    
});