import { supabase } from './supabaseClient';

export async function getCurrentUserId() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) return null;
  return data.user.id;
}

export async function fetchFavorites(userId) {
  const { data, error } = await supabase
    .from('favorites')
    .select('property_id')
    .eq('user_id', userId);
  if (error) return [];
  return data.map(fav => fav.property_id);
}

export async function addFavorite(userId, propertyId) {
  return supabase.from('favorites').insert([{ user_id: userId, property_id: propertyId }]);
}

export async function removeFavorite(userId, propertyId) {
  return supabase.from('favorites').delete().eq('user_id', userId).eq('property_id', propertyId);
} 