import { useEffect, useState } from "react";

interface hookProps {
  keyword: string;
}

const API_KEY = import.meta.env.VITE_GIPHY_API;

function useFetchGiphyUrl({ keyword }: hookProps) {
  const [giphyUrl, setGiphyUrl] = useState<string>("");
  const [giphyLoading, setGiphyLoading] = useState<boolean>(false);

  const fetchGiphyUrl = async () => {
    setGiphyLoading(true);
    try {
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/search?q=${keyword.split(" ").join("")}&limit=1&api_key=${API_KEY}`,
      );
      const data = await res.json();
      setGiphyUrl(data.data[0].images.original.url);
      // console.log("Fetch giphy image success keyword", keyword, data);
    } catch (error) {
      setGiphyUrl(
        "https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284",
      );
      console.log("Fetching giphy image error", error);
    } finally {
      setGiphyLoading(false);
    }
  };

  useEffect(() => {
    if (keyword) fetchGiphyUrl();
  }, [keyword]);

  return { giphyLoading, giphyUrl };
}

export default useFetchGiphyUrl;
