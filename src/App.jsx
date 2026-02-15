import { useEffect, useState } from "react";
import PodcastPreviewCard from "./components/PodcastPreviewCard";
import PodcastModal from "./components/PodcastModal";
import "./styles/App.css";

/**
 * App component
 * Fetches podcast data and renders preview cards.
 */
function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPodcast, setSelectedPodcast] = useState(null); // For modal

  /**
   * Fetch podcast data when component mounts
   */
  useEffect(() => {
    fetch("https://podcast-api.netlify.app/")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch podcasts.");
        return response.json();
      })
      .then((data) => {
        setPodcasts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="status">Loading podcasts...</p>;
  if (error) return <p className="status error">Error: {error}</p>;
  if (podcasts.length === 0) return <p className="status">No podcasts available.</p>;

  return (
    <div>
      <h1>Podcast Discovery App</h1>

      <div className="podcast-grid">
        {podcasts.map((podcast) => (
          <PodcastPreviewCard
            key={podcast.id}
            podcast={podcast}
            onClick={() => setSelectedPodcast(podcast)}
          />
        ))}
      </div>

      {/* Show modal if user clicked a card */}
      {selectedPodcast && (
        <PodcastModal
          podcast={selectedPodcast}
          onClose={() => setSelectedPodcast(null)}
        />
      )}
    </div>
  );
}

export default App;
