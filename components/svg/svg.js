import Image from "next/image";
import  { Fade } from 'react-awesome-reveal'
import { toast } from 'react-toastify';

import headerVector from '../../public/hero/undraw_thought_process_re_om58.svg'

const Svg = () => {
  const notify = () => toast.info("We are working on it")

  return (
    <div className="header">
      {/* <!--Content before waves--> */}
      <div className="inner-header flex">
        <div className="heroDetails">
          <Fade direction="left">
            <h1>Building a Community</h1>
          </Fade>
          <Fade direction="right">
            <h3>of creatives</h3>
          </Fade>
          <Fade direction="up">
            <p>A platform for creatives and skilled individuals to connect, work together and showcase their talents.</p>
          </Fade>
          <button onClick={notify}>Join our Community</button>
        </div>
        <div className="vectorContainer">
          <Fade delay={3}>
            <Image className="vectorImage" src={headerVector} layout="responsive" alt="vectorImage" />
          </Fade>
        </div>
      </div>

      {/* <!--Header ends--> */}
    </div>
  )
}

export default Svg