const addNewMatch = async (winnerId: string, loserId: string) => {
  try {
    await fetch(`https://hamsterwars.onrender.com/matches`, {
      method: "POST",
      body: JSON.stringify({ winnerId: winnerId, loserId: loserId }),
      headers: { "Content-Type": "application/json" },
    }).then((resp) => {
      return resp.status;
    });
  } catch (err) {
    console.error(err);
  }
};

export default addNewMatch;
