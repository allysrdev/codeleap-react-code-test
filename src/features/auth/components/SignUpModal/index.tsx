import { useEffect, useRef, useState } from "react";
import { useUser } from "../../hooks/useUser";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
export default function SignUpModal() {
  const { user, setUser } = useUser();
  const [usernameInput, setUsernameInput] = useState(user?.username || "");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (usernameInput.trim() === "") return;
    setUser({ id: Date.now(), username: usernameInput });
    setUsernameInput("");
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50 p-4!">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-full max-w-md bg-white p-5! rounded-[10px] flex flex-col gap-5! shadow-lg"
      >
        <h2 className="font-bold text-[22px] text-center">
          Welcome to CodeLeap network!
        </h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Please enter your username</label>
          <Input
            type="text"
            id="username"
            name="username"
            placeholder="John Doe"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            aria-label="Username input"
            ref={inputRef}
          />
        </div>
        <div className="w-full flex justify-end">
          <Button
            type="submit"
            aria-label="Enter username"
            disabled={usernameInput.trim() === ""}
          >
            ENTER
          </Button>
        </div>
      </form>
    </div>
  );
}
