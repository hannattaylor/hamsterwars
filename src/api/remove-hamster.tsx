const removeHamster = async (id: string) => {
  let response = await fetch(
    `https://hamsterwars.onrender.com/hamsters/${id}`,
    {
      method: "DELETE",
    }
  );
  let removed = await response.json();
  if (removed) {
    return removed;
  }
};

export default removeHamster;
