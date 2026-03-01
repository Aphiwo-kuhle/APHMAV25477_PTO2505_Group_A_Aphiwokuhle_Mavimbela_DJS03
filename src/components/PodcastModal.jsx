import { genreMap } from "../data/genreMap";

/**
 * Modal that displays detailed podcast information.
 * @param {Object} props
 * @param {Object} props.podcast - Selected podcast
 * @param {Function} props.onClose - Close modal function
 * @returns {JSX.Element|null}
 */
function PodcastModal({ podcast, onClose }) {
  if (!podcast) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <h2>{podcast.title}</h2>

        <img
          src={podcast.image}
          alt={podcast.title}
          className="card-image"
        />

        <div className="genre-container">
          {podcast.genres.map((id) => (
            <span key={id} className="genre-tag">
              {genreMap[id]}
            </span>
          ))}
        </div>

        <p>{podcast.description}</p>

        <p className="season-count">
          {podcast.seasons}{" "}
          {podcast.seasons === 1 ? "Season" : "Seasons"}
        </p>
      </div>
    </div>
  );
}

export default PodcastModal;