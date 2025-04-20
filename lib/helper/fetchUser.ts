import { supabase } from '../supabase'; // your supabase client

export const fetchUser = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', (await supabase.auth.getUser())?.data?.user?.id)
    .single();
    console.log("from helper",data);
    
  if (error) throw new Error(error.message);
  return data;

};
