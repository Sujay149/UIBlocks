import { useState } from "react";
import { Eye, EyeOff, Sparkles, Github, Chrome, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/contexts/AdminContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAdmin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Admin login
    if (email === "sujayss149@gmail.com") {
      login(email);
      onClose();
      setEmail("");
      setPassword("");
    } else {
      alert("Only admin can login. Please use admin email.");
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={cn(
        "relative w-full max-w-md",
        "glass rounded-3xl p-8 shadow-card",
        "animate-in fade-in-0 zoom-in-95 duration-200"
      )}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent-purple mb-4">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-foreground">Welcome back</span>
          </h1>
          <p className="text-muted-foreground">Sign in to continue to UIBlocksX</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-xl glass text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
              required
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl glass text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-2 focus:ring-primary/50 cursor-pointer"
              />
              <span className="text-muted-foreground">Remember me</span>
            </label>
            <a
              href="#"
              className="text-primary transition-colors font-medium"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm transition-all duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/50"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocialLogin("github")}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl glass transition-all duration-200"
          >
            <Github className="w-4 h-4" />
            <span className="text-sm font-medium">Github</span>
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl glass transition-all duration-200"
          >
            <Chrome className="w-4 h-4" />
            <span className="text-sm font-medium">Google</span>
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <a
            href="#"
            className="text-primary transition-colors font-medium"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};
