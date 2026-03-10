import { useNavigate } from "react-router-dom";
import SignUpModal from "../../features/auth/components/SignUpModal";
import { useUser } from "../../features/auth/hooks/useUser";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("blog");
    }
  }, [user, navigate]);
  return (
    <div>
      <SignUpModal />
    </div>
  );
}
