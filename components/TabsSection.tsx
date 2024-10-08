import React from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

interface TabsSectionProps {
  loading: boolean;
  error: string | null;
  activeTab: string;
  handleToggleActiveTab: (value: string) => void;
  filteredFonts: any[];
  filteredFontsSelected: any[];
}

const TabsSection: React.FC<TabsSectionProps> = ({
  loading,
  error,
  activeTab,
  handleToggleActiveTab,
  filteredFonts,
  filteredFontsSelected,
}) => {
  return (
    <div
      className={cn('flex items-center gap-2', {
        disabled: loading || error,
      })}
    >
      <Tabs value={activeTab} onValueChange={handleToggleActiveTab} defaultValue="all-fonts">
        <TabsList>
          <TabsTrigger value="all-fonts">
            All fonts <span className='hidden lg:block'>({filteredFonts.length})</span>
          </TabsTrigger>
          <TabsTrigger value="selected-fonts">
            Selected fonts <span className='hidden lg:block'>({filteredFontsSelected.length})</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TabsSection;
