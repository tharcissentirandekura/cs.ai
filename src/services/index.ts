

async function searchInternet(query: string) {
  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  return await res.json();
}

export default searchInternet