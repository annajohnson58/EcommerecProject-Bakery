

import PickMeals from "../Images/dine-in.png";
import ChooseMeals from "../Images/choose.png";
import DeliveryMeals from "../Images/freedelivery.jpg";
const Work = () => {
  const workInfoData = [
    {
      image: PickMeals,
      title: "Pick Meals",
      text: "Create parties with our delicious range of desserts and wholesome bread",
    },
    {
      image: ChooseMeals,
      title: "Choose How Often",
      text: "Join us celebrating joy of baking",
    },
    {
      image: DeliveryMeals,
      title: "Fast Deliveries",
      text:"We promise you fast and quick delivery for our subscribers",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
        Indulge in our wide selection of cakes,cookies,and savory snacks crafted with love and care. We love to bring you the best goodies and hope that they make smile in your face!
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
