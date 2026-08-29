import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Network,
  Search,
  Filter,
  List,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { relationshipService } from '../services/relationshipService';
import { mockKnowledgeGraph } from '../mock/graphData';
import { KnowledgeGraphData, GraphNode, GraphEdge, GraphEntityType } from '../types/graph';
import { Badge, Button, Input, Card, cn } from '../components/ui';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

export const RelationshipsPage: React.FC = () => {
  const [graphData, setGraphData] = useState<KnowledgeGraphData>(mockKnowledgeGraph);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(mockKnowledgeGraph.nodes[0] || null);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const data = await relationshipService.getGraphData({
        entityType: filterType,
        search: searchQuery
      });
      setGraphData(data);
      if (data.nodes.length > 0 && !selectedNode) {
        setSelectedNode(data.nodes[0]);
      }
    };
    load();
  }, [filterType, searchQuery]);

  const nodePositions = React.useMemo(() => {
    const positions: Record<string, { x: number; y: number }> = {};
    const total = graphData.nodes.length;
    const centerX = 360;
    const centerY = 260;

    graphData.nodes.forEach((node, idx) => {
      const angle = (idx / total) * 2 * Math.PI;
      const radius = idx % 2 === 0 ? 180 : 120;
      positions[node.id] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    });
    return positions;
  }, [graphData]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ========================================================================= */}
      {/* 1. COMPACT KNOWLEDGE GRAPH HEADER */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="engineering-cad" opacity="opacity-35 dark:opacity-20" />
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1">
            <div className="flex items-center gap-2.5">
              <Network className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                  <span>Relational Sourcing</span>
                  <span className="opacity-30">•</span>
                  <span>{graphData.nodes.length} Verified Entity Nodes</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                  Knowledge Graph & Network Linkages
                </h1>
              </div>
            </div>
          </div>

          {/* Filter Toolbar */}
          <div className="flex items-center gap-3 pt-3 mt-3 border-t border-black/[0.08] dark:border-white/[0.08] relative z-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 dark:text-zinc-400 absolute left-3 top-2.5" />
              <Input
                placeholder="Search coworkers, past employers, or projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-8 text-xs bg-white dark:bg-[#12151D] border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="h-8 px-3 rounded-[6px] border border-black/10 dark:border-white/10 bg-white dark:bg-[#12151D] text-xs font-semibold text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="all">All Entities</option>
              <option value="candidate">Candidates</option>
              <option value="employer">Employers</option>
              <option value="project">Energy Projects</option>
              <option value="team_member">Internal Hiring Team</option>
            </select>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. GRAPH CANVAS WITH NEURAL MESH & TOPOGRAPHY INSPECTOR */}
      {/* ========================================================================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* Visual Graph Viewport */}
        <main className="flex-1 overflow-hidden relative p-6 bg-card-mesh flex items-center justify-center">
          <svg className="w-full h-full max-w-[800px] max-h-[600px]">
            {/* Edges */}
            {graphData.edges.map((edge) => {
              const src = nodePositions[edge.source];
              const tgt = nodePositions[edge.target];
              if (!src || !tgt) return null;

              return (
                <g key={edge.id}>
                  <line
                    x1={src.x}
                    y1={src.y}
                    x2={tgt.x}
                    y2={tgt.y}
                    stroke="rgba(212, 197, 169, 0.25)"
                    strokeWidth="1.5"
                  />
                </g>
              );
            })}

            {/* Nodes */}
            {graphData.nodes.map((node) => {
              const pos = nodePositions[node.id];
              if (!pos) return null;
              const isSelected = selectedNode?.id === node.id;

              return (
                <g
                  key={node.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onClick={() => setSelectedNode(node)}
                  className="cursor-pointer"
                >
                  <circle
                    r={isSelected ? 18 : 14}
                    fill={node.type === 'candidate' ? '#D4C5A9' : node.type === 'team_member' ? '#56A396' : '#242936'}
                    stroke={isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.3)'}
                    strokeWidth={isSelected ? 3 : 1.5}
                  />
                  <text
                    y={26}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="10"
                    fontWeight="600"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </main>

        {/* Selected Entity Inspector */}
        {selectedNode && (
          <aside className="w-80 border-l border-white/[0.08] bg-card-topography p-6 space-y-5 overflow-y-auto shrink-0 select-none text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-bold text-xs uppercase tracking-wider text-white">
                Entity Details
              </span>
              <Badge variant="champagne" size="sm">{selectedNode.type}</Badge>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-base text-white">{selectedNode.label}</h3>
              {selectedNode.subType && (
                <div className="text-xs text-zinc-300">{selectedNode.subType}</div>
              )}
            </div>

            {selectedNode.metadata && Object.keys(selectedNode.metadata).length > 0 && (
              <div className="p-3.5 rounded-[8px] bg-black/40 border border-white/10 space-y-1 text-xs">
                {Object.entries(selectedNode.metadata).map(([k, v]) => (
                  <div key={k} className="flex justify-between text-zinc-300">
                    <span className="text-zinc-400 capitalize">{k}:</span>
                    <span className="font-semibold text-white">{String(v)}</span>
                  </div>
                ))}
              </div>
            )}

            {selectedNode.type === 'candidate' && (
              <div className="pt-2">
                <Button
                  size="xs"
                  variant="machined"
                  onClick={() => navigate(`/candidates/${selectedNode.id}`)}
                  className="w-full justify-center font-semibold"
                >
                  Open Candidate Dossier →
                </Button>
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  );
};
