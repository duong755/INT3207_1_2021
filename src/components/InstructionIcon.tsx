type InstructionProps = {
  name?: string;
};

const InstructionIcon: React.FC<InstructionProps> = (props) => {
  switch (props.name) {
    case "left":
      return <span className="icon-corner-up-left"></span>;
    case "right":
      return <span className="icon-corner-up-right"></span>;
    case "sharp left":
      return <span className="icon-corner-left-down"></span>;
    case "sharp right":
      return <span className="icon-corner-right-down"></span>;
    case "straight":
      return <span className="icon-arrow-thin-up"></span>;
    case "slight left":
      return <span className="icon-arrow-up-left"></span>;
    case "slight right":
      return <span className="icon-arrow-up-right"></span>;
    default:
      return <span style={{ paddingLeft: 15 }}></span>;
  }
};

export { InstructionIcon };
