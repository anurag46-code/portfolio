
import styles from "./bubble.module.css";

const Example = ({text}) => {
  return (
    <span>
      <BubbleText  text={text}/>
    </span>
  );
};

const BubbleText = ({text}) => {
  // const text = "Anurag";

  return (
    <span className="text-4xl font-playfair z-10 text-center md:text-start text-indigo-300">
      {text.split("").map((char, idx) => (
        <span className={styles.hoverText} key={idx}>
          {char}
        </span>
      ))}
    </span>
  );
};

export default Example;
