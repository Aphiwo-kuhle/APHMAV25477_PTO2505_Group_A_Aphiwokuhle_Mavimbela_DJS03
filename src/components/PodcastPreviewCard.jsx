import { formatDistanceToNow } from "date-fns";
import { genreMap } from "../data/genreMap";

/**
 * Renders a podcast preview card.
 * @param {Object} props
 * @param {Object} props.podcast - Podcast data object
 * @param {Function} props.onClick - Click handler
 * @returns {JSX.Element}
 */
function PodcastPreviewCard({ podcast, onClick }) {
  const { title, image, seasons, genres, updated } = podcast;

  return (
    <div className="card" onClick={onClick}>
      <img src={image} alt={title} className="card-image" />

      <h2 className="card-title">{title}</h2>

      <div className="genre-container">
        {genres.map((id) => (
          <span
            key={id}
            className="genre-tag"
            onClick={(e) => e.stopPropagation()}
          >
            {genreMap[id]}
          </span>
        ))}
      </div>

      <p className="season-count">
        {seasons} {seasons === 1 ? "Season" : "Seasons"}
      </p>

      <p className="updated">
        Updated {formatDistanceToNow(new Date(updated))} ago
      </p>
    </div>
  );
}

export default PodcastPreviewCard;