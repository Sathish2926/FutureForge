import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api, setToken } from "../api/client";
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  isFirebaseEnvConfigured,
} from "../firebase";
import { Sparkles, Mail, Lock, User, ArrowRight, ArrowLeft, Info } from "lucide-react";

export default function Login() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [infoNotice, setInfoNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  async function syncWithBackend(fbUser: any, nameOverride?: string) {
    const token = await fbUser.getIdToken();
    const displayName = nameOverride || fbUser.displayName || fbUser.email?.split("@")[0] || "Student";
    const res = await api.firebaseAuth(fbUser.email, displayName, fbUser.uid, token);
    setToken(res.access_token);
    navigate("/dashboard");
  }

  async function handleGoogleSignIn() {
    setError(null);
    setInfoNotice(null);

    if (!isFirebaseEnvConfigured) {
      setInfoNotice(
        "To enable Google Sign-In with Firebase, please set VITE_FIREBASE_API_KEY in frontend/.env. Email/Password login works directly below!"
      );
      return;
    }

    setGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await syncWithBackend(result.user);
    } catch (err: any) {
      console.warn("Firebase Google auth error:", err);
      if (err.code === "auth/popup-closed-by-user") {
        setError("Sign-in popup was closed before completion.");
      } else if (err.code?.includes("api-key-not-valid") || err.code === "auth/invalid-api-key") {
        setError(
          "Your Firebase API key in .env is invalid. Please check your Firebase Console settings."
        );
      } else if (err.code === "auth/unauthorized-domain") {
        const domain = window.location.hostname;
        setError(
          `Domain "${domain}" is not authorized in Firebase Console. To enable Google Sign-In, go to Firebase Console -> Authentication -> Settings -> Authorized domains -> Add "${domain}". Or use Email/Password below!`
        );
      } else {
        setError(err.message || "Failed to sign in with Google.");
      }
    } finally {
      setGoogleLoading(false);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfoNotice(null);
    setLoading(true);

    try {
      // 1. Try Firebase Auth if configured
      if (isFirebaseEnvConfigured) {
        try {
          let fbUser;
          if (mode === "register") {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            fbUser = userCred.user;
            if (name.trim()) {
              await updateProfile(fbUser, { displayName: name.trim() });
            }
          } else {
            const userCred = await signInWithEmailAndPassword(auth, email, password);
            fbUser = userCred.user;
          }
          await syncWithBackend(fbUser, name);
          return;
        } catch (fbErr: any) {
          console.warn("Firebase auth failed, evaluating fallback:", fbErr);
          if (fbErr.code === "auth/email-already-in-use") {
            setError("An account with this email already exists. Please click 'Sign in to your account' below.");
            setLoading(false);
            return;
          }
          if (fbErr.code === "auth/wrong-password" || fbErr.code === "auth/invalid-credential") {
            setError("Incorrect password. Please check your credentials and try again.");
            setLoading(false);
            return;
          }
        }
      }

      // 2. Direct backend API fallback (SQLite database auth)
      const res =
        mode === "login"
          ? await api.login(email, password)
          : await api.register(email, password, name);
      setToken(res.access_token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-full lg:w-1/2 relative z-10 bg-white shadow-2xl shadow-slate-200/50">
        <Link to="/" className="absolute top-8 left-8 sm:left-12 flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
        
        <div className="mx-auto w-full max-w-sm lg:w-[400px]">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center shadow-lg mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-heading">
              {mode === "login" ? "Welcome back" : "Your future starts here."}
            </h2>
            <p className="mt-3 text-slate-500 text-base">
              {mode === "login" ? "Sign in to continue your career journey." : "Create your account to start building your personalized career roadmap."}
            </p>
          </div>

          {/* Firebase Google Auth Button */}
          <div className="mb-6">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading || loading}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-2xl shadow-sm transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {googleLoading ? (
                <span>Connecting Google...</span>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider">
              <span className="px-3 bg-white text-slate-400 font-semibold">Or continue with email</span>
            </div>
          </div>

          <div>
            <form onSubmit={submit} className="space-y-4">
              {mode === "register" && (
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Full name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <User className="h-5 w-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                    </div>
                    <input className="input pl-12 py-3.5 text-base" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                </div>
              )}
              
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Email address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                  </div>
                  <input className="input pl-12 py-3.5 text-base" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                  </div>
                  <input className="input pl-12 py-3.5 text-base" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                </div>
              </div>

              {infoNotice && (
                <div className="text-xs text-blue-800 font-medium bg-blue-50 p-3.5 rounded-xl border border-blue-200 flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{infoNotice}</span>
                </div>
              )}

              {error && (
                <div className="text-sm text-red-700 font-semibold bg-red-50 p-4 rounded-xl border border-red-100 flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">!</div>
                  <span>{error}</span>
                </div>
              )}

              <button className="btn-primary w-full py-4 text-lg shadow-xl shadow-brand-500/20" disabled={loading || googleLoading}>
                {loading ? "Authenticating..." : (
                  <>
                    {mode === "login" ? "Sign in" : "Create account"} <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500">
                  {mode === "login" ? "New to FutureForge?" : "Already have an account?"}
                </span>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                className="w-full btn-ghost py-3.5 text-base bg-slate-50 hover:bg-slate-100 border border-slate-200"
                onClick={() => setMode(mode === "login" ? "register" : "login")}
              >
                {mode === "login" ? "Create an account" : "Sign in to your account"}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:flex lg:flex-1 relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/95 via-slate-900/95 to-slate-900/95 z-10"></div>
        <img
          className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-overlay"
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Students studying"
        />
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-[100px] z-10"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] z-10"></div>
        
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center p-12 text-center text-white">
          <div className="glass-panel p-12 rounded-[3rem] max-w-xl backdrop-blur-2xl bg-white/5 border border-white/10 shadow-2xl">
            <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/20">
              <Sparkles className="w-10 h-10 text-brand-300" />
            </div>
            <h2 className="text-4xl font-bold tracking-tight mb-6 text-white font-heading leading-tight">Shape your future with AI.</h2>
            <p className="text-xl text-brand-100/80 leading-relaxed font-medium">
              Discover personalized career pathways, generate actionable roadmaps, and match with the perfect colleges and scholarships — all in one premium platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
