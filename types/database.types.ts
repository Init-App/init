export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      environments: {
        Row: {
          id: string;
          name: string;
          url: string | null;
          is_enabled: boolean;
          team_id: string | null;
          created_at: string | null;
          updated_at: string | null;
          api_key: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          url?: string | null;
          is_enabled?: boolean;
          team_id?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          api_key?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          url?: string | null;
          is_enabled?: boolean;
          team_id?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          api_key?: string | null;
        };
      };
      profiles: {
        Row: {
          id: string;
          updated_at: string | null;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          website: string | null;
          has_completed_onboarding: boolean;
        };
        Insert: {
          id: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
          has_completed_onboarding?: boolean;
        };
        Update: {
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
          has_completed_onboarding?: boolean;
        };
      };
      settings: {
        Row: {
          id: string;
          name: string;
          value: string;
          is_enabled: boolean;
          environment_id: string;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          value: string;
          is_enabled?: boolean;
          environment_id: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          value?: string;
          is_enabled?: boolean;
          environment_id?: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      teams: {
        Row: {
          id: string;
          name: string;
          logo: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          logo?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          logo?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      users_teams: {
        Row: {
          id: string;
          user_id: string;
          team_id: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          team_id: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          team_id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
