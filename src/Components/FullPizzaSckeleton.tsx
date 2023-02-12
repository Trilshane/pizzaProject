import { FC } from "react";
import ContentLoader from "react-content-loader";

const FullPizzaSckeleton: FC = () => (
  <ContentLoader
    speed={2}
    width={500}
    height={500}
    viewBox="0 0 500 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="199" cy="132" r="125" />
    <rect x="65" y="267" rx="0" ry="0" width="295" height="50" />
    <rect x="467" y="465" rx="0" ry="0" width="6" height="6" />
    <rect x="4" y="330" rx="0" ry="0" width="421" height="46" />
  </ContentLoader>
);

export default FullPizzaSckeleton;
