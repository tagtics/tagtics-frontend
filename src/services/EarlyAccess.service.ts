import { environment } from "../environments/environment.prod";

interface RegistrationResponse {
  success: boolean;
  message?: string;
  userId?: string;
  error?: string;
  warning?: string;
  retryAfter?: number;
}

interface RegistrationRequest {
  name: string;
  email: string;
}

export async function registerForEarlyAccess(
  name: string,
  email: string
): Promise<RegistrationResponse> {
  const env = environment;
  try {
    if (!name || !email) {
      return {
        success: false,
        error: 'Name and email are required'
      };
    }

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return {
        success: false,
        error: 'Invalid email format'
      };
    }

    if (normalizedName.length < 2 || normalizedName.length > 100) {
      return {
        success: false,
        error: 'Name must be between 2 and 100 characters'
      };
    }

    const response = await fetch(
      `${env.SUPABASE_URL}/register-user`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': env.SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${env.SUPABASE_ANON_KEY}`, 
        },
        body: JSON.stringify({
          name: normalizedName,
          email: normalizedEmail,
        } as RegistrationRequest),
      }
    );

    const data: RegistrationResponse = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Registration failed',
        retryAfter: data.retryAfter
      };
    }

    return {
      success: true,
      message: data.message,
      userId: data.userId,
      warning: data.warning
    };

  } catch (error) {
    console.error('Early access registration error:', error);

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error. Please try again.'
    };
  }
}

