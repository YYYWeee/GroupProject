
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPinsThunk } from "../../store/pins";

import "./Splash.css";


function Splash() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  let pins = Object.values(
    useSelector((state) => (state.pins.allPins ? state.pins.allPins : {}))
  );

  const limitedPins = [

    { image_url: "https://i.pinimg.com/564x/34/35/b2/3435b238465bbdebd2098ae70dd79a06.jpg" },
    { image_url: "https://i.pinimg.com/564x/14/dc/98/14dc98bcce1bd45df120c43adf2a9a7f.jpg" },
    { image_url: "https://i.pinimg.com/564x/de/fc/34/defc343b713997e72debf5c47a201143.jpg" },
    { image_url: "https://i.pinimg.com/564x/b5/15/42/b51542a45bbc39d884f333527970ea55.jpg" },
    { image_url: "https://i.pinimg.com/564x/02/b9/56/02b956800d386022c1e8c5e02d962e5a.jpg" },
    { image_url: "https://i.pinimg.com/564x/15/05/fc/1505fc50f61e13adfd3704b024677d40.jpg" },
    { image_url: "https://i.pinimg.com/564x/17/25/3f/17253f0628a4723138f9d024ee5dfdeb.jpg" },
    { image_url: "https://i.pinimg.com/564x/35/5e/b4/355eb444ea33b38047b1a8540ed6890b.jpg" },
    { image_url: "https://i.pinimg.com/564x/71/9c/0b/719c0b9c74a26d1a29a11cefa19e9101.jpg" },
    { image_url: "https://i.pinimg.com/564x/f0/59/6f/f0596f234efeb5e45024d6bd64ac8468.jpg" },
    { image_url: "https://i.pinimg.com/564x/d0/d7/cd/d0d7cd31465d138d89eb6fa74cb70fb1.jpg" },
    { image_url: "https://i.pinimg.com/564x/7a/79/f0/7a79f0d859bbf427f905c5d38cfb261e.jpg" },
    { image_url: 'https://i.pinimg.com/564x/bf/6c/b8/bf6cb8f97b8763a6d5cbeb0268d74239.jpg' },
    { image_url: "https://i.pinimg.com/564x/f3/9c/84/f39c841b0bafe94edaa3c021f516a4a3.jpg" },
    { image_url: "https://i.pinimg.com/564x/ba/ab/40/baab40a5db81519bb91a142674d45793.jpg" },
    { image_url: "https://i.pinimg.com/564x/2e/67/92/2e67923cd5408d529c1c0771642f1ac0.jpg" },
    { image_url:"https://i.pinimg.com/564x/54/c7/1a/54c71a6b419e211e73d24fed5e101b80.jpg" },
    { image_url: "https://i.pinimg.com/564x/15/77/7b/15777b242adc76b055a540fa029bc4ce.jpg"},
    { image_url: "https://i.pinimg.com/564x/3d/fd/75/3dfd757831ce44d0d40cb2531a23f127.jpg"},
    { image_url: "https://i.pinimg.com/564x/55/ff/ba/55ffba853c387c0c6b73628ee161fd2c.jpg"},
    { image_url: "https://i.pinimg.com/564x/48/7b/07/487b07a5a417da32f816da39055ee71d.jpg"},
    { image_url: "https://i.pinimg.com/564x/8e/15/0f/8e150f71c558a212b7e74d90514e8c29.jpg"},
    { image_url: "https://i.pinimg.com/564x/9d/7f/2c/9d7f2c6adc6d81bf667b7e93e3352880.jpg"},
    { image_url: "https://i.pinimg.com/564x/35/82/05/35820502e9cf4cdc23d0a90e534e04a0.jpg"},
    { image_url: "https://i.pinimg.com/564x/d9/9b/ff/d99bffa243615e2ea0de16c170a2db77.jpg"},
    { image_url: "https://i.pinimg.com/564x/7d/88/04/7d880478063f1d495f73c8c50140722a.jpg"},
    { image_url: "https://i.pinimg.com/564x/80/e6/fd/80e6fd71da40f8c456cefbe31b5db5b2.jpg"},
    { image_url: "https://i.pinimg.com/564x/37/0d/a8/370da817ac09be198903d9c646ce6182.jpg"},
    { image_url: "https://i.pinimg.com/564x/4b/47/40/4b4740da4a7a48f640d83f3ac3de2f37.jpg"},
    { image_url: "https://i.pinimg.com/564x/9c/c9/98/9cc9985d4194593b83c5d8775520175d.jpg"},
    { image_url: "https://i.pinimg.com/564x/8e/3b/9e/8e3b9e864660b85a857d9e489c82a3df.jpg"},
    { image_url: "https://i.pinimg.com/564x/1e/07/c0/1e07c0b1754dd02013e68109aef48b2c.jpg"},


  ]

  // test!!!!!!!!!!!!!
  // const [randomLimitedPins, setRandomLimitedPins] = useState(limitedPins);
  // const getRandomPin = () => {
  //   const randomIndex = Math.floor(Math.random() * limitedPins.length);
  //   return limitedPins[randomIndex];
  // };

  // useEffect(() => {
  //   const updateRandomPins = () => {
  //     const newLimitedPins = limitedPins.map(() => getRandomPin());
  //     setRandomLimitedPins(newLimitedPins);
  //   };
  //   const interval = setInterval(updateRandomPins, 2500);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [limitedPins]);
  // test!!!!!!!!!!!!!
  const [imageRatios, setImageRatios] = useState([]);

  // test!!!!!!!!!!!!!2
  const getRandomPins = () => {
    const shuffledPins = [...limitedPins];
    for (let i = shuffledPins.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPins[i], shuffledPins[j]] = [shuffledPins[j], shuffledPins[i]];
    }
    return shuffledPins.slice(0, 12);
  };

  const [randomLimitedPins, setRandomLimitedPins] = useState(getRandomPins());

  useEffect(() => {

    const interval = setInterval(() => {
      setRandomLimitedPins(getRandomPins());
    }, 2500);


    return () => {
      clearInterval(interval);
    };
  }, []);

  //test2!!!!!!!!!!!!!!







  const handleImageLoad = (e, index) => {
    const { naturalHeight, naturalWidth } = e.target;
    const ratio = naturalHeight / naturalWidth;
    setImageRatios((prevRatios) => {
      const updatedRatios = [...prevRatios];
      updatedRatios[index] = ratio;
      return updatedRatios;
    });
  };




  // and attach the right height class to the img
  const defaultRatios_dict = {
    s1: 0.75,
    s2: 1,
    s3: 1.25,
    s4: 1.5,
    s5: 1.78,
    s6: 1.83,
    s7: 2,
    s8: 2.3,
  };




  const defaultRatios = [0.75, 1, 1.25, 1.5, 1.78, 1.83, 2, 2.3];

  const closestRatios = [];
  for (let goal of imageRatios) {
    const closest = defaultRatios.reduce(function (prev, curr) {
      return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
    });
    closestRatios.push(closest);
  }

  const keysList = closestRatios.map((ratio) => {
    const matchingKeys = Object.keys(defaultRatios_dict).find(
      (key) => defaultRatios_dict[key] === ratio
    );
    return matchingKeys;
  });

  useEffect(() => {
    dispatch(fetchAllPinsThunk()).then(setIsLoaded(true));
    window.scroll(0, 0);
  }, [dispatch]);



  return (
    <>
      {/* <div className="pin-container">
        {limitedPins.map((pin, index) => (
          <div
            key={index}
            className={`card-container ${keysList[index]}`}
          >
            <img
              src={pin.image_url ? pin.image_url : "no preview img"}
              alt="No pin preview"
              onLoad={(e) => handleImageLoad(e, index)}
              className="pin-card-img one "
            ></img>

          </div>
        ))}
        <h2 className="green1">Get your next  </h2>
        <h2 className="green2">home decor idea </h2>
      </div> */}


      {/* test1 */}
      {/* <div className="pin-container">
        {randomLimitedPins.map((pin, index) => (
          <div
            key={index}
            className={`card-container ${keysList[index]}`}
          >
            <img
              src={pin.image_url ? pin.image_url : "no preview img"}
              alt="No pin preview"
              onLoad={(e) => handleImageLoad(e, index)}
              className="pin-card-img one"
            />
          </div>
        ))}
        <h2 className="green1">Get your next</h2>
        <h2 className="green2">home decor idea</h2>
      </div> */}
      {/* test1 */}



      {/* test2 */}
      <div className="pin-container">
        {randomLimitedPins.map((pin, index) => (
          <div
            key={index}
            className={`card-container ${keysList[index]}`}
          >
            <img
              src={pin.image_url ? pin.image_url : "no preview img"}
              alt="No pin preview"
              onLoad={(e) => handleImageLoad(e, index)}
              className="pin-card-img one"
            />
          </div>
        ))}
        <h2 className="green1">Get your next home decor idea</h2>
        {/* <h2 className="green2">home decor idea</h2> */}
      </div>

      {/* test2 */}
    </>
  )
}


export default Splash;
