import { KnowledgeGraphData } from '../types/graph';
import { mockKnowledgeGraph } from '../mock/graphData';

class RelationshipService {
  private graphData: KnowledgeGraphData = { ...mockKnowledgeGraph };

  async getGraphData(filter?: { entityType?: string; search?: string }): Promise<KnowledgeGraphData> {
    let nodes = [...this.graphData.nodes];
    let edges = [...this.graphData.edges];

    if (filter?.entityType && filter.entityType !== 'all') {
      nodes = nodes.filter(n => n.type === filter.entityType);
      const nodeIds = new Set(nodes.map(n => n.id));
      edges = edges.filter(e => nodeIds.has(e.source) && nodeIds.has(e.target));
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase();
      const matchedNodes = nodes.filter(n => n.label.toLowerCase().includes(q) || n.type.toLowerCase().includes(q));
      const matchedIds = new Set(matchedNodes.map(n => n.id));
      const connectedNodeIds = new Set<string>(matchedIds);
      edges.forEach(e => {
        if (matchedIds.has(e.source)) connectedNodeIds.add(e.target);
        if (matchedIds.has(e.target)) connectedNodeIds.add(e.source);
      });
      nodes = this.graphData.nodes.filter(n => connectedNodeIds.has(n.id));
      edges = this.graphData.edges.filter(e => connectedNodeIds.has(e.source) && connectedNodeIds.has(e.target));
    }

    return { nodes, edges };
  }

  async getRelationshipsForCandidate(candidateId: string) {
    const edges = this.graphData.edges.filter(e => e.source === candidateId || e.target === candidateId);
    const relatedNodeIds = new Set(edges.map(e => e.source === candidateId ? e.target : e.source));
    const nodes = this.graphData.nodes.filter(n => relatedNodeIds.has(n.id));
    return { edges, nodes };
  }
}

export const relationshipService = new RelationshipService();
