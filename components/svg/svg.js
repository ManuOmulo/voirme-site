import Image from "next/image";
import headerVector from '../../public/hero/undraw_thought_process_re_om58.svg'

const Svg = () => {
  return (
    <div className="header">
      {/* <!--Content before waves--> */}
      <div className="inner-header flex">
        <div className="heroDetails">
          <h1>Building a Community</h1>
          <h3>of creatives</h3>
          <p>A platform for creatives and skilled individuals to connect, work together and showcase their talents.</p>
          <button>Join our Community</button>
        </div>
        <div className="vectorContainer">
          <Image className="vectorImage" src={headerVector} layout="responsive" alt="vectorImage" />
        </div>
      </div>

      {/* <!--Header ends--> */}
    </div>
  )
}

export default Svg