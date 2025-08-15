"use client";

import React, { createContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface LoadingContextType {
  isLoading: boolean;
}

const LoadingContext = createContext<LoadingContextType>({ isLoading: false });

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const queryCache = queryClient.getQueryCache();
    const mutationCache = queryClient.getMutationCache();
    
    const updateLoadingState = () => {
      const queries = queryCache.getAll();
      const mutations = mutationCache.getAll();
      
      const hasPendingQueries = queries.some(query => query.state.status === 'pending');
      const hasPendingMutations = mutations.some(mutation => mutation.state.status === 'pending');
      
      setIsLoading(hasPendingQueries || hasPendingMutations);
    };

    updateLoadingState();

    const queryUnsubscribe = queryCache.subscribe((event) => {
      if (event.type === 'updated' || event.type === 'added' || event.type === 'removed') {
        updateLoadingState();
      }
    });

    const mutationUnsubscribe = mutationCache.subscribe((event) => {
      if (event.type === 'updated' || event.type === 'added' || event.type === 'removed') {
        updateLoadingState();
      }
    });

    return () => {
      queryUnsubscribe();
      mutationUnsubscribe();
    };
  }, [queryClient]);

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 bg-[#000414]/80 backdrop-blur-sm z-[9999] flex items-center justify-center">
          <div className="bg-[#1A1A1A] rounded-2xl p-8 flex flex-col items-center space-y-4 border border-[#252525]">
            <div className="w-12 h-12 animate-spin rounded-full border-2 border-transparent border-t-[#FFFBC0]"></div>
            <p className="text-[#FFFBC0] font-medium">처리 중...</p>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};
