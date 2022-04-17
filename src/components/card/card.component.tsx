import "./card.component";

type Props = {
  imageUrl: string;
  imageAlt: string;
  size: string;
};

export default function Card({ imageUrl, imageAlt, size }: Props) {
  return (
    <div className={`card_container ${size}`}>
      <img src={imageUrl} alt={imageAlt} />
    </div>
  );
}
