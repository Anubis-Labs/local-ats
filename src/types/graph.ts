export type GraphEntityType =
  | 'candidate'
  | 'employer'
  | 'role'
  | 'skill'
  | 'certification'
  | 'project'
  | 'job'
  | 'team_member'
  | 'location';

export type GraphRelationshipType =
  | 'worked_at'
  | 'held_role'
  | 'worked_on'
  | 'has_skill'
  | 'applied_to'
  | 'interviewed_for'
  | 'worked_with'
  | 'referred_by'
  | 'shared_project'
  | 'located_in';

export interface GraphNode {
  id: string;
  label: string;
  type: GraphEntityType;
  subType?: string;
  metadata?: Record<string, string | number | boolean>;
  connectionCount?: number;
  highlighted?: boolean;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relationship: GraphRelationshipType;
  label: string;
  evidenceSnippet?: string;
  dateRange?: string;
  confidence: number;
}

export interface KnowledgeGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
