
const svg = d3.select('.canvas')
    .append('svg')
    .attr('width', 1200)
    .attr('height', 600)

d3.json('techs.json').then(data => {

    const rects = d3.selectAll('rect')
        .data(data)

    const x = d3.scaleBand()
        .domain(data.map(d => d.tech))
        .range([0, 1200])
        .paddingInner('0.2')
        .paddingOuter('0.3')

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.level)])
        .range([600, 0])

    console.log(y(50))

    rects.attr('width', 50)
        .attr('height', d => d.nivell)
        .attr('x', d => d.name)
        .attr('y', d => 50)
        .attr('fill', 'red')
});