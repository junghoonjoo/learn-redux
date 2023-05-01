import * as d3 from "d3";
import { forceCenter, forceLink, forceManyBody, forceSimulation } from "d3";
import { useEffect, useRef } from "react";

const NnGraph8 = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 600;
    const height = 1000;

    const data = {
      nodes: [
        { id: 0, layer: 0, activation: "input" },
        { id: 1, layer: 1, activation: "sigmoid" },
        { id: 2, layer: 2, activation: "tanh" },
        { id: 3, layer: 3, activation: "softmax" },
      ],
      links: [
        { source: 0, target: 1 },
        { source: 1, target: 2 },
        { source: 2, target: 3 },
      ],
    };

    const nodes = data.nodes.map((d) => ({
      ...d,
      x: d.layer * (width / (data.nodes.length - 1)),
      y: height / 2,
    }));

    const links = data.links.map((d) => ({
      ...d,
      source: nodes.find((n) => n.id === d.source),
      target: nodes.find((n) => n.id === d.target),
    }));

    const simulation = forceSimulation(nodes)
      .force("charge", forceManyBody().strength(-100))
      .force(
        "link",
        forceLink(links).id((d) => d.id)
      )
      .force("center", forceCenter(width / 2, height / 2));

    const svg = d3.select(svgRef.current);

    const link = svg
      .selectAll(".link")
      .data(links)
      .join((enter) => enter.append("line").attr("class", "link"));

    const node = svg
      .selectAll(".node")
      .data(nodes)
      .join((enter) =>
        enter.append("g").attr("class", "node").call(drag(simulation))
      );

    node.append("circle").attr("r", 3);

    node
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .text((d) => `Layer ${d.layer + 1}\n${d.activation}`);

    // update node and link positions
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    // drag handler
    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

    return () => {
      simulation.stop();
    };
  }, []);

  return <svg ref={svgRef}></svg>;
};


export default NnGraph8;