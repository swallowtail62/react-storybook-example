export function UserCreateForm() {
  const onSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: "foo" }),
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <button type="submit">Create</button>
    </form>
  );
}
