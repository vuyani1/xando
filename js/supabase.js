import {createClient} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
export const SUPABASE_URL = 'https://wwcedhbbdoyrmquokyjj.supabase.co'
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3Y2VkaGJiZG95cm1xdW9reWpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwMzYyNjUsImV4cCI6MjA3MTYxMjI2NX0.s29eO4ZQ74R6Jktn5zKZ-AiH6_QYC-_9WFqAS_m1kj4'
export const supabase = createClient(SUPABASE_URL,SUPABASE_ANON_KEY)
