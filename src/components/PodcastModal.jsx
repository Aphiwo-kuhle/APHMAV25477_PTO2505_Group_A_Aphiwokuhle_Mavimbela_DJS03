import { formatDistanceToNow, parseISO } from "date-fns";

/**
 * PodcastModal component
 * Displays detailed podcast information in an overlay
 * @param {Object} props
 * @param {Object} props.podcast - Podcast data
 * @param {Function} props.onClose - Function to close modal
 */
function PodcastModal({ podcast, onClose }) {
  const updatedDate = formatDistanceToNow(parseISO(podcast.updated), { addSuffix: true });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <img src={podcast.image} alt={podcast.title} />
        <h2>{podcast.title}</h2>
        <p><strong>Seasons:</strong> {podcast.seasons}</p>
        <p><strong>Genres:</strong> {podcast.genres.join(", ")}</p>
        <p><strong>Last Updated:</strong> {updatedDate}</p>
        <p><strong>Description:</strong> {podcast.description || "No description available."}</p>
      </div>
    </div>
  );
}

export default PodcastModal;
