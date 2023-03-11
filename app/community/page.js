import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";
export default function About() {
  return (
    <div>
      <div className="h-20"></div>
      <div className="w-full items-center justify-center text-center text-3xl px-6 pb-10">
        About page
      </div>
      <div className="w-full items-center justify-center text-center text-2xl px-6 pb-10 ">
        Under development
      </div>
      <div className="w-full flex flex-col items-start justify-center  px-6">
        <div className="w-full flex flex-row items-center justify-center text-center text-1xl px-6 pt-24">
          <p>Made by Saransh Bibiyan</p>
          <div>
            <div className=" m-2 p-5 rounded-xl flex flex-row items-center justify-center space-x-2 mb-1">
              <a
                href="https://github.com/Saransh29"
                rel="noreferrer"
                target="_blank"
              >
                <AiOutlineGithub
                  className="hover:-translate-y-1 transition-transform cursor-pointer text-black "
                  size={30}
                />
              </a>

              <a
                href="https://www.linkedin.com/in/saransh-bibiyan/"
                rel="noreferrer"
                target="_blank"
              >
                <AiOutlineLinkedin
                  className="hover:-translate-y-1 transition-transform cursor-pointer text-black"
                  size={30}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
