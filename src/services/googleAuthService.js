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
 * Render Google Sign In button in a container element.
 * This is more reliable than the One Tap prompt.
 */
export async function renderGoogleButton(container, onSuccess, onError) {
  await loadGoogleScript();

  if (!window.google?.accounts?.id) {
    onError(new Error("Google Sign In not available"));
    return;
  }

  window.google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: async (response) => {
      if (response.credential) {
        try {
          const result = await exchangeGoogleToken(response.credential);
          onSuccess(result);
        } catch (error) {
          onError(error);
        }
      } else {
        onError(new Error("No credential received from Google"));
      }
    },
  });

  window.google.accounts.id.renderButton(container, {
    type: "standard",
    theme: "outline",
    size: "large",
    text: "continue_with",
    shape: "rectangular",
    logo_alignment: "left",
    width: container.offsetWidth || 300,
  });
}

/**
 * Exchange Google ID token for user session.
 */
export async function exchangeGoogleToken(idToken) {
  const response = await api.post("/auth/google", { idToken });
  return response.data;
}
