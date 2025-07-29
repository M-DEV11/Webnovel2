import { createClient } from '@supabase/supabase-js';

// ✅ Replace with your actual values
const supabaseUrl = 'https://mpcqgzpjnphzqmvgeytp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wY3FnenBqbnBoenFtdmdleXRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3MDM0ODcsImV4cCI6MjA2OTI3OTQ4N30.x9wKq2t3id5HwJnfzqEixAOP3AZ4HG07OLnE7zAmHDo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const uploadPoster = async (file, bookTitle) => {
  try {
    if (!file) throw new Error("No file provided");

    const safeTitle = bookTitle.replace(/\s+/g, '-').toLowerCase();
    const fileExt = file.name.split('.').pop();
    const filePath = `${safeTitle}/poster.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('webnovelposters')
      .upload(filePath, file, {
        upsert: true,
        cacheControl: '3600',
      });

    if (error) {
      console.error("📦 Supabase upload error:", error);
      throw error;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('webnovelposters')
      .getPublicUrl(filePath);

    if (!urlData?.publicUrl) {
      throw new Error("Failed to retrieve public URL");
    }

    return urlData.publicUrl;
  } catch (err) {
    console.error("❌ Failed to upload poster:", err.message);
    throw err;
  }
};
