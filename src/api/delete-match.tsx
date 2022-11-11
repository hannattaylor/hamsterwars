const deleteMatch = async (id: string) => {
  let response = await fetch(`https://hamsterwars.onrender.com/matches/${id}`, {
    method: "DELETE",
  });
  let removed = await response.json();
  if (removed) {
    return removed;
  }
};

export default deleteMatch;
