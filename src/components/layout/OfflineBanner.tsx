import React from 'react';
import { WifiOff, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';

export const OfflineBanner: React.FC = () => {
  const { isOffline, isHostOnline, settings } = useWorkspace();

  if (!isOffline && isHostOnline) return null;

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-1.5 text-xs text-amber-700 dark:text-amber-300 flex items-center justify-between transition-colors">
      <div className="flex items-center gap-2">
        {isOffline ? (
          <>
            <WifiOff className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-semibold">Local-Only Mode Active:</span>
            <span>All candidate pipelines, notes, search and resumes remain fully readable and operable on your machine.</span>
          </>
        ) : !isHostOnline ? (
          <>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-semibold">Shared Host Computer ({settings?.hostComputerName}) is unreachable:</span>
            <span>Operating from your local cache replica. Changes will synchronize once the host rejoins the local network.</span>
          </>
        ) : null}
      </div>
      <div className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Data Encrypted Locally</span>
      </div>
    </div>
  );
};
