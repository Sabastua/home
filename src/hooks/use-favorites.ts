import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/hooks/use-toast';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load favorites based on user status
  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      
      if (user) {
        // User is logged in - load from database
        try {
          const { data, error } = await supabase
            .from('favorites')
            .select('property_id')
            .eq('user_id', user.id);
          
          if (error) {
            console.error('Error loading favorites:', error);
            toast({
              title: "Error",
              description: "Failed to load favorites",
              variant: "destructive"
            });
          } else {
            const favoriteIds = data?.map(fav => fav.property_id) || [];
            setFavorites(favoriteIds);
          }
        } catch (error) {
          console.error('Error loading favorites:', error);
        }
      } else {
        // User is not logged in - load from localStorage
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
          try {
            const favoriteIds = JSON.parse(storedFavorites);
            setFavorites(favoriteIds);
          } catch (error) {
            console.error('Error parsing stored favorites:', error);
            setFavorites([]);
          }
        } else {
          setFavorites([]);
        }
      }
      
      setLoading(false);
    };

    loadFavorites();
  }, [user, toast]);

  const toggleFavorite = async (propertyId: string) => {
    const isFavorite = favorites.includes(propertyId);
    
    if (user) {
      // User is logged in - update database
      try {
        if (isFavorite) {
          // Remove from favorites
          const { error } = await supabase
            .from('favorites')
            .delete()
            .eq('user_id', user.id)
            .eq('property_id', propertyId);
          
          if (error) {
            console.error('Error removing favorite:', error);
            toast({
              title: "Error",
              description: "Failed to remove from favorites",
              variant: "destructive"
            });
            return;
          }
        } else {
          // Add to favorites
          const { error } = await supabase
            .from('favorites')
            .insert([{ user_id: user.id, property_id: propertyId }]);
          
          if (error) {
            console.error('Error adding favorite:', error);
            toast({
              title: "Error",
              description: "Failed to add to favorites",
              variant: "destructive"
            });
            return;
          }
        }
        
        // Update local state
        setFavorites(prev => 
          isFavorite 
            ? prev.filter(id => id !== propertyId)
            : [...prev, propertyId]
        );
        
        toast({
          title: isFavorite ? "Removed from favorites" : "Added to favorites",
          description: isFavorite 
            ? "Property removed from your favorites list"
            : "Property added to your favorites list",
        });
        
      } catch (error) {
        console.error('Error toggling favorite:', error);
        toast({
          title: "Error",
          description: "Failed to update favorites",
          variant: "destructive"
        });
      }
    } else {
      // User is not logged in - update localStorage
      const updatedFavorites = isFavorite
        ? favorites.filter(id => id !== propertyId)
        : [...favorites, propertyId];
      
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      
      toast({
        title: isFavorite ? "Removed from favorites" : "Added to favorites",
        description: isFavorite 
          ? "Property removed from your favorites list"
          : "Property added to your favorites list",
      });
    }
  };

  const addFavorite = async (propertyId: string) => {
    if (!favorites.includes(propertyId)) {
      await toggleFavorite(propertyId);
    }
  };

  const removeFavorite = async (propertyId: string) => {
    if (favorites.includes(propertyId)) {
      await toggleFavorite(propertyId);
    }
  };

  const isFavorite = (propertyId: string) => {
    return favorites.includes(propertyId);
  };

  return {
    favorites,
    loading,
    user,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}; 