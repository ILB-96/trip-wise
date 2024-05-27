// components/AttractionPreview.tsx
import { useState } from "react";
import { AttractionType } from "@app/attractions/page";
import Image from "next/image";
type AttractionPreviewProps = {
    attraction: AttractionType;
    onAdd: (day: string) => void;
};

const AttractionPreview: React.FC<AttractionPreviewProps> = ({
                                                                 attraction,
                                                                 onAdd,
                                                             }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedDay, setSelectedDay] = useState("");

    return (
        <div>
            <Image
                src={attraction.image}
                alt={attraction.name}
                width={500}
                height={300}
                onClick={() => setShowPopup(true)}
            />
            {showPopup && (
                <div className="popup">
                    <h2>{attraction.name}</h2>
                    <p>{attraction.description}</p>
                    <label>
                        Select Day:
                        <input
                            type="text"
                            value={selectedDay}
                            onChange={(e) => setSelectedDay(e.target.value)}
                        />
                    </label>
                    <button onClick={() => onAdd(selectedDay)}>Add to Trip</button>
                    <button onClick={() => setShowPopup(false)}>Close</button>
                </div>
            )}
        </div>
    );
};

export default AttractionPreview;
