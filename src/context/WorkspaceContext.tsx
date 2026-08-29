import React, { createContext, useContext, useEffect, useState } from 'react';
import { WorkspaceSettings } from '../types/settings';
import { settingsService, initialSettings } from '../services/workspaceService';

interface WorkspaceContextType {
  settings: WorkspaceSettings;
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  isHostOnline: boolean;
  setIsHostOnline: (online: boolean) => void;
  refreshSettings: () => Promise<void>;
  updateSettings: (partial: Partial<WorkspaceSettings>) => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<WorkspaceSettings>(initialSettings);
  const [isOffline, setIsOffline] = useState(false);
  const [isHostOnline, setIsHostOnline] = useState(true);

  const refreshSettings = async () => {
    const s = await settingsService.getSettings();
    setSettings(s);
  };

  const updateSettings = async (partial: Partial<WorkspaceSettings>) => {
    const updated = await settingsService.updateSettings(partial);
    setSettings(updated);
  };

  useEffect(() => {
    refreshSettings();
  }, []);

  return (
    <WorkspaceContext.Provider
      value={{
        settings,
        isOffline,
        setIsOffline,
        isHostOnline,
        setIsHostOnline,
        refreshSettings,
        updateSettings
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error('useWorkspace must be used within WorkspaceProvider');
  return context;
};
