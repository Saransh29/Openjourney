import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";
export default function About() {
  return (
    <div>
      <div className="h-20"></div>
      <div className="w-full items-center justify-center text-center text-3xl px-6 pb-10">
        About page
      </div>
      <div className="w-full flex flex-col items-start justify-center  px-6">
        <ul className="list-outside list-disc ml-6 px-10">
          <li className="text-1xl max-w-3xl pb-4">
            Generate an imaginative image through Stable Diffusion AI -
            midjourney v4 Model.
          </li>
          <li className="text-1xl max-w-3xl pb-4">
            GCP VM instance with 8 vCPUs and 30 GB of memory. 1 GPU Tesla T4.
            Stable Diffusion AI - midjourney v4 Model.
          </li>
          <li className="text-1xl max-w-3xl pb-4">
            Connected from VM to API using SSH tunnels.
          </li>
          <li className="text-1xl max-w-3xl pb-4">
            API hosted on cyclic serverless functions.
          </li>
          <li className="text-1xl max-w-3xl pb-4">
            Frontend hosted on Vercel. Built with Next.js and Tailwind CSS.
          </li>
        </ul>
        <div className="w-full items-center justify-center text-center text-2xl px-6 pb-10 ">
          Under development
        </div>
        <ul className="list-outside list-disc ml-6 px-10">
          <li className="text-1xl max-w-3xl pb-4">
            Change Models and parameters. (Currently only midjourney v4 Model is
            available). switch to OpenJourney and stable Diffusion 1.4 Model.
          </li>
          <li className="text-1xl max-w-3xl pb-4">
            Host images on AWS S3 or some other cloud storage.
          </li>
          <li className="text-1xl max-w-3xl pb-4">
            Add download image feature.
          </li>
        </ul>
        <div className="w-full flex items-center justify-center text-center text-1xl px-6 pt-24">
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
