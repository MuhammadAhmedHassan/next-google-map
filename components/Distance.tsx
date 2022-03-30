const commutesPerYear = 260 * 2;
const litersPerKM = 10 / 100;
const gasLitreCost = 1.5;
const litreCostKM = litersPerKM * gasLitreCost;
const secondsPerDay = 60 * 60 * 24;
interface IProps {
  leg: google.maps.DirectionsLeg;
}

function Distance({ leg }: IProps) {
  if (!leg.distance || !leg.duration) return null;

  /* leg.duration.value is in seconds */
  const daysSpentInsideCar = Math.floor(
    (commutesPerYear * leg.duration.value) / secondsPerDay
  );
  // leg.distance.value is in meters, and dividing it by 1000 make them in kilometers
  const cost = Math.floor(
    (leg.distance.value / 1000) * litreCostKM * commutesPerYear
  );

  return (
    <div>
      <p>
        This home is <span className='highlight'>{leg.distance.text}</span> away
        from your office. That would take{' '}
        <span className='highlight'>{leg.duration.text} each direction.</span>
      </p>

      <p>
        That's <span className='highlight'>{daysSpentInsideCar}</span> in your
        car each year at a cost of{' '}
        <span className='highlight'>
          ${new Intl.NumberFormat().format(cost)}
        </span>.
      </p>
    </div>
  );
}

export default Distance;
