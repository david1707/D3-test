
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

// Load JSON
d3.json('techs.json').then(data => {
    const x = d3.scaleBand()
        .domain(data.map(d => d.tech))
        .range([0, graphWidth])
        .paddingInner('0.2')
        .paddingOuter('0.3')

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.level)])
        .range([graphHeight, 0])

    const rects = graph.selectAll('rect')
        .data(data)

    // Add rects to rects already in the DOM
    rects.attr('width', x.bandwidth)
        .attr('height', d => graphHeight - y(d.level))
        .attr('x', d => x(d.tech))
        .attr('y', d => y(d.level))
        .attr('fill', 'red')

    // Add new rects to the DOM
    rects.enter()
        .append('rect')
            .attr('width', x.bandwidth)
            .attr('height', d => graphHeight - y(d.level))
            .attr('x', d => x(d.tech))
            .attr('y', d => y(d.level))
            .attr('fill', 'red')
});