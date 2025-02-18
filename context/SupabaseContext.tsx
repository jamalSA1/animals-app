import { createContext, useContext } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useAuth } from '@clerk/clerk-expo';
import { decode } from 'base64-arraybuffer';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

export const ANIMALS_TABLE = 'animals';
export const CATEGORIES_TABLE = 'categories';
export const FAVORITES_TABLE = 'favorites';
export const USERS_TABLE = 'users';
export const FILES_BUCKET = 'animals-images';

export const VIDEOS_TABLE = 'animal_videos';
export const VIDEOS_BUCKET = 'animal-videos';

type ProviderProps = {
  userId: string | null;
  // وظائف الحيوانات
  createAnimal: (data: { title: string, price: number, description: string, category_id: string }) => Promise<any>;
  getAnimals: (categoryId?: string) => Promise<any>;
  getAnimalDetails: (animalId: string) => Promise<any>;
  updateAnimal: (id: string, data: any) => Promise<any>;
  deleteAnimal: (id: string) => Promise<any>;
  
  // وظائف التصنيفات
  getCategories: () => Promise<any>;
  
  // وظائف المفضلة
  addToFavorites: (animalId: string) => Promise<any>;
  removeFromFavorites: (animalId: string) => Promise<any>;
  getFavorites: () => Promise<any>;
  
  // وظائف الملفات
  uploadImage: (filePath: string, base64: string, contentType: string) => Promise<string | undefined>;
  getImageUrl: (path: string) => Promise<string | undefined>;
  
  // وظائف الفيديو
  uploadVideo: (filePath: string, base64: string) => Promise<string | undefined>;
  getVideoUrl: (path: string) => Promise<string | undefined>;
  addVideoToAnimal: (animalId: string, videoPath: string) => Promise<any>;
  getAnimalVideos: (animalId: string) => Promise<any>;
};

export const SupabaseContext = createContext<Partial<ProviderProps>>({});

export function useSupabase() {
  return useContext(SupabaseContext);
}

export const SupabaseProvider = ({ children }: any) => {
  const { userId } = useAuth();

  // وظائف الحيوانات
  const createAnimal = async (data: { title: string, price: number, description: string, category_id: string }) => {
    const { data: result, error } = await supabase
      .from(ANIMALS_TABLE)
      .insert({ ...data, owner_id: userId })
      .select()
      .single();

    if (error) {
      console.error('Error creating animal:', error);
    }
    return result;
  };

  const getAnimals = async (categoryId?: string) => {
    let query = supabase
      .from(ANIMALS_TABLE)
      .select(`
        *,
        categories (*),
        users (id, first_name, avatar_url)
      `)
      .eq('status', 'active');

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    const { data } = await query;
    return data || [];
  };

  const getAnimalDetails = async (animalId: string) => {
    const { data } = await supabase
      .from(ANIMALS_TABLE)
      .select(`
        *,
        categories (*),
        users (id, first_name, avatar_url, phone)
      `)
      .eq('id', animalId)
      .single();
    return data;
  };

  // وظائف المفضلة
  const addToFavorites = async (animalId: string) => {
    return await supabase
      .from(FAVORITES_TABLE)
      .insert({ user_id: userId, animal_id: animalId });
  };

  const removeFromFavorites = async (animalId: string) => {
    return await supabase
      .from(FAVORITES_TABLE)
      .delete()
      .match({ user_id: userId, animal_id: animalId });
  };

  const getFavorites = async () => {
    const { data } = await supabase
      .from(FAVORITES_TABLE)
      .select(`
        *,
        animals (*)
      `)
      .eq('user_id', userId);
    return data || [];
  };

  // وظائف الصور
  const uploadImage = async (filePath: string, base64: string, contentType: string) => {
    const { data } = await supabase.storage
      .from(FILES_BUCKET)
      .upload(filePath, decode(base64), { contentType });
    return data?.path;
  };

  const getImageUrl = async (path: string) => {
    const { data } = await supabase.storage
      .from(FILES_BUCKET)
      .createSignedUrl(path, 60 * 60);
    return data?.signedUrl;
  };

  const uploadVideo = async (filePath: string, base64: string) => {
    const { data } = await supabase.storage
      .from(VIDEOS_BUCKET)
      .upload(filePath, decode(base64), {
        contentType: 'video/mp4',
        cacheControl: '3600'
      });
    return data?.path;
  };

  const getVideoUrl = async (path: string) => {
    const { data } = await supabase.storage
      .from(VIDEOS_BUCKET)
      .createSignedUrl(path, 60 * 60); // 1 hour expiry
    return data?.signedUrl;
  };

  const addVideoToAnimal = async (animalId: string, videoPath: string) => {
    const { data, error } = await supabase
      .from(VIDEOS_TABLE)
      .insert({
        animal_id: animalId,
        video_url: videoPath,
        uploaded_by: userId
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding video:', error);
    }
    return data;
  };

  const getAnimalVideos = async (animalId: string) => {
    const { data } = await supabase
      .from(VIDEOS_TABLE)
      .select('*')
      .eq('animal_id', animalId)
      .order('created_at', { ascending: false });
    return data || [];
  };

  const value = {
    userId,
    createAnimal,
    getAnimals,
    getAnimalDetails,
    addToFavorites,
    removeFromFavorites,
    getFavorites,
    uploadImage,
    getImageUrl,
    uploadVideo,
    getVideoUrl,
    addVideoToAnimal,
    getAnimalVideos,
  };

  return <SupabaseContext.Provider value={value}>
    {children}
  </SupabaseContext.Provider>;
};