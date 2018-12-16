
const svg = d3.select('.canvas')
    .append('svg')
        .attr('width', 1200)
        .attr('height', 600)

d3.json('techs.json').then(data => {

    const x = d3.scaleBand()
        .domain(data.map(d => d.tech))
        .range([0, 1200])
        .paddingInner('0.2')
        .paddingOuter('0.3')

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.level)])
        .range([600, 0])

    console.log(y(50))

    const rects = svg.selectAll('rect')
        .data(data)

    // Add rects to rects already in the DOM
    rects.attr('width', x.bandwidth)
        .attr('height', d => 600 - y(d.level))
        .attr('x', d => x(d.tech))
        .attr('y', d => y(d.level))
        .attr('fill', 'red')

    // Add new rects to the DOM
    rects.enter()
        .append('rect')
            .attr('width', x.bandwidth)
            .attr('height', d => 600 - y(d.level))
            .attr('x', d => x(d.tech))
            .attr('y', d => y(d.level))
            .attr('fill', 'red')
});