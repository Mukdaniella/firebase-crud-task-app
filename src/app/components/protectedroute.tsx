import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/app/lib/useauth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (loading || !user) return <div>Loading...</div>;

  return <>{children}</>;
}
