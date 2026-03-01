import { useEffect, useState } from "react";
import PodcastPreviewCard from "./components/PodcastPreviewCard";
import PodcastModal from "./components/PodcastModal";
import "./App.css";

/**
 * Main Application Component.
 * Fetches podcast data and renders preview grid.
 * @returns {JSX.Element}
 */
function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPodcast, setSelectedPodcast] = useState(null);

  /**
   * Fetch podcast data from external API.
   */
  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch(
          "https://podcast-api.netlify.app/"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch podcasts.");
        }

        const data = await response.json();
        setPodcasts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  const openModal = (podcast) => setSelectedPodcast(podcast);
  const closeModal = () => setSelectedPodcast(null);

  return (
    <div className="container">
      <h1 className="title">Podcast Discovery</h1>

      {loading && (
        <div className="status">
          <div className="spinner"></div>
          Loading podcasts...
        </div>
      )}

      {error && (
        <div className="status error">
          {error}
        </div>
      )}

      {!loading && !error && podcasts.length === 0 && (
        <div className="status">
          No podcasts available.
        </div>
      )}

      {!loading && !error && podcasts.length > 0 && (
        <div className="grid">
          {podcasts.map((podcast) => (
            <PodcastPreviewCard
              key={podcast.id}
              podcast={podcast}
              onClick={() => openModal(podcast)}
            />
          ))}
        </div>
      )}

      {selectedPodcast && (
        <PodcastModal
          podcast={selectedPodcast}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;