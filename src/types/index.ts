export type SubscriptionStatus = "free" | "pro";

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  subscription_status: SubscriptionStatus;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  created_at: string;
}

export interface Test {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  question_count: number;
  is_pro: boolean;
  duration_minutes: number;
  created_at: string;
}

export interface Question {
  id: string;
  test_id: string;
  text: string;
  options: string[];
  correct_index: number;
  explanation: string;
  order: number;
}

export interface TestAttempt {
  id: string;
  user_id: string;
  test_id: string;
  started_at: string;
  completed_at: string | null;
  score: number | null;
  answers: Record<string, number>;
}

export interface Material {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  is_pro: boolean;
  thumbnail_url: string | null;
  read_time_minutes: number;
  created_at: string;
}

export interface UserMaterialProgress {
  user_id: string;
  material_id: string;
  last_read_at: string;
  completed: boolean;
}
