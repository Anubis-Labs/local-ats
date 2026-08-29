import { DEFAULT_STAGES, PipelineStageConfig } from '../types/pipeline';
import { PipelineStageId } from '../types/candidate';

class PipelineService {
  private stages: PipelineStageConfig[] = [...DEFAULT_STAGES];

  async getStages(): Promise<PipelineStageConfig[]> {
    return [...this.stages];
  }

  async reorderStages(newOrder: PipelineStageId[]): Promise<PipelineStageConfig[]> {
    this.stages = newOrder
      .map((id, index) => {
        const found = this.stages.find((s) => s.id === id);
        return found ? { ...found, order: index + 1 } : null;
      })
      .filter((s): s is PipelineStageConfig => s !== null);
    return [...this.stages];
  }
}

export const pipelineService = new PipelineService();
