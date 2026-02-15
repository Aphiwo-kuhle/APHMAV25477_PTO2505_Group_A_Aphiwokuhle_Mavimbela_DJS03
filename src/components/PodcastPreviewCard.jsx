import { formatDistanceToNow, parseISO } from "date-fns";

/**
 * PodcastPreviewCard component
 * Displays a single podcast preview and handles click.
 * @param {Object} props
 * @param {Object} props.podcast - Podcast data
 * @param {Function} props.onClick - Function to call when card is clicked
 */
function PodcastPreviewCard({ podcast, onClick }) {
  const updatedDate = formatDistanceToNow(parseISO(podcast.updated), { addSuffix: true });

  return (
    <div
      className="podcast-card"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <img src={podcast.image} alt={podcast.title} />
      <h3>{podcast.title}</h3>
      <p>Seasons: {podcast.seasons}</p>
      <p>Genres: {podcast.genres.join(", ")}</p>
      <p>Last Updated: {updatedDate}</p>
    </div>
  );
}

export default PodcastPreviewCard;
