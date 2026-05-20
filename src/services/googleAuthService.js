import api from "@/lib/axios";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

/**
 * Load the Google Identity Services library.
 */
function loadGoogleScript() {
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error("Failed to load Google Sign In"));
    document.head.appendChild(script);
  });
}

/**
 * Initialize Google Identity Services and get an ID token.
 */
export async function getGoogleIdToken() {
  await loadGoogleScript();

  return new Promise((resolve, reject) => {
    if (!window.google?.accounts?.id) {
      reject(new Error("Google Sign In not available"));
      return;
    }

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (response) => {
        if (response.credential) {
          resolve(response.credential);
        } else {
          reject(new Error("No credential received from Google"));
        }
      },
      error_callback: (error) => {
        reject(new Error(error.message || "Google Sign In failed"));
      },
    });

    // Use the prompt method to show the One Tap dialog
    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // If One Tap is not displayed, try the popup flow
        reject(new Error("Google Sign In popup was blocked or dismissed"));
      }
    });
  });
}

/**
 * Exchange Google ID token for user session.
 */
export async function exchangeGoogleToken(idToken) {
  const response = await api.post("/auth/google", { idToken });
  return response.data;
}

/**
 * Open Google OAuth popup and return the ID token.
 */
export async function signInWithGoogle() {
  try {
    const idToken = await getGoogleIdToken();
    const result = await exchangeGoogleToken(idToken);
    return result;
  } catch (error) {
    throw error;
  }
}
