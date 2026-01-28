import { useState } from "react";
import { Eye, EyeOff, Sparkles, Github, Chrome } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add authentication logic here
    console.log("Login attempt with:", { email, password });
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      {/* Background Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent-purple/10 blur-[150px]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-accent-cyan/5 blur-[100px]" />
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        {/* Back to Home */}
        <button
          onClick={() => navigate("/")}
          className="absolute -top-16 left-0 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </button>

        <div className="glass rounded-3xl p-8 shadow-card">
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-2 focus:ring-primary/50"
                />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <a
                href="#"
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm overflow-hidden group transition-all duration-300 hover:shadow-glow"
            >
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent-purple to-primary bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite] opacity-0 group-hover:opacity-30" />
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
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl glass hover:bg-primary/10 transition-all duration-200"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm font-medium">Github</span>
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl glass hover:bg-primary/10 transition-all duration-200"
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
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
