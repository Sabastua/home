import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://slfvkdyckjrtfiijohit.supabase.co', // Replace with your Supabase project URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsZnZrZHlja2pydGZpaWpvaGl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3Njk5ODQsImV4cCI6MjA2NjM0NTk4NH0.VxH9SU8Vv8kv2HmYo5XbS8YjMr5Fcbst0c3joS4gxfM' // Replace with your Supabase anon/public key
); 