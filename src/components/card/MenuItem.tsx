import "./MenuItem";

type menuItem = {
  imageUrl: string;
  imageAlt: string;
  size: string;
};

type Props = {
  menuItem: section;
};

type section = {
  title: string;
  imageUrl: string;
  id: number;
  linkUrl: string;
};

export default function Card({ menuItem }: Props) {
  // const { imageUrl, imageAlt, size } = menuItem;
  return (
    <div className={`card_container`}>
      <img src={menuItem.linkUrl} alt={menuItem.title} />
    </div>
  );
}
