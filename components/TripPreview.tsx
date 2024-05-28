import { AttractionType } from "@app/attractions/page";

type TripPreviewProps = {
  selectedAttractions: Map<string, AttractionType[]>;
};

const TripPreview: React.FC<TripPreviewProps> = ({ selectedAttractions }) => {
  return (
    <div>
      <h2>Your Trip Plan</h2>
      {Array.from(selectedAttractions.entries()).map(([day, attractions]) => (
        <div key={day}>
          <h3>Day {day}</h3>
          {attractions.map((attraction) => (
            <div key={attraction.name}>
              <h4>{attraction.name}</h4>
              <p>{attraction.description}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TripPreview;
