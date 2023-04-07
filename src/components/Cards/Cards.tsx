import { bg_card_back, bg_card_front, card_logo } from "../../assets/images";
import "./Cards.scss";
import { useAtom } from "jotai/react";
import {
  cardNumberAtom,
  cardHolderAtom,
  cardMMAtom,
  cardYYAtom,
  cardCVCAtom,
} from "../../lib/atoms/atoms";
import useWindowWidth from "../../hooks/useWindowWidth";
import { SetStateAction } from "jotai";

interface ICardsProps {
  setIsLoaded: React.Dispatch<SetStateAction<boolean>>;
}

const Cards = ({ setIsLoaded }: ICardsProps) => {
  const windowWidth = useWindowWidth();

  return (
    <div className="cards">
      {windowWidth > 800 ? (
        <>
          <CardFront setIsLoaded={setIsLoaded} />
          <CardBack />
        </>
      ) : (
        <>
          <CardBack />
          <CardFront setIsLoaded={setIsLoaded} />
        </>
      )}
    </div>
  );
};

const CardFront = ({ setIsLoaded }: ICardsProps) => {
  const [numToShow] = useAtom(cardNumberAtom);
  const [nameToShow] = useAtom(cardHolderAtom);
  const [MMToShow] = useAtom(cardMMAtom);
  const [YYToShow] = useAtom(cardYYAtom);

  return (
    <div className="front">
      <img
        src={bg_card_front}
        alt="Image that shows card details from the front."
        onLoad={() => setIsLoaded(true)}
      />
      <img src={card_logo} alt="card logo" />
      <span>{numToShow}</span>
      <div>
        <span>{nameToShow}</span>
        <span>
          {MMToShow}/{YYToShow}
        </span>
      </div>
    </div>
  );
};

const CardBack = () => {
  const [CVCToShow] = useAtom(cardCVCAtom);

  return (
    <div className="back">
      <img
        src={bg_card_back}
        alt="Image that shows card details from the back."
      />
      <span>{CVCToShow}</span>
    </div>
  );
};

export default Cards;
