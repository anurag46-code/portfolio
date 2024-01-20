import React from "react";
// import { motion } from "framer-motion";

const SkillsMedia = () => {
  return (
    <div className="flex flex-wrap border-4  border-blue hover:border-cyan-600 rounded-lg pr-3 w-full mt-10 h-[100%] justify-around items-center">
      <div className="w-[120px] h-[120px] sm:w-60 sm:h-60 flex justify-center items-center rounded-md bg-gradient-to-t from-react border-react  border-b-4 m-2 hover:saturate-200">
        <img className="w-5/6 h-5/6 " 
        src="../assets/react-2.svg" 
        alt="react" />
      </div>
      <div className="w-[100px] h-[100px] sm:w-60 sm:h-60 flex justify-center items-center rounded-md bg-gradient-to-t from-tail border-tail border-b-4 m-2 hover:saturate-200">
        <img
          className="w-5/6 h-5/6  "
          src="../assets/tailwind-css-2.svg"
          alt="react"
        />
      </div>
      <div className="w-[100px] h-[100px] sm:w-60 sm:h-60 flex justify-center items-center rounded-md bg-gradient-to-t from-dark-grey border-dark-grey border-b-4 m-2 hover:saturate-200">
        <img
          className="w-5/6 h-5/6  "
          src="../assets/solidity.svg"
          alt="react"
        />
      </div>
      <div className="w-[100px] h-[100px] sm:w-60 sm:h-60 flex justify-center items-center rounded-md bg-gradient-to-t from-git border-git  border-b-4 m-2 hover:saturate-200">
        <img
          className="w-5/6 h-5/6  "
          src="../assets/github-icon-1.svg"
          alt="react"
        />
      </div>
      <div className="w-[100px] h-[100px] sm:w-60 sm:h-60 flex justify-center items-center rounded-md bg-gradient-to-t from-c border-c  border-b-4 m-2 hover:saturate-200">
        <img className="w-5/6 h-5/6  " src="../assets/css-3.svg" alt="react" />
      </div>
      <div className="w-[100px] h-[100px] sm:w-60 sm:h-60 flex justify-center items-center rounded-md bg-gradient-to-t from-orange border-orange border-b-4 m-2 hover:saturate-200">
        <img className="w-5/6 h-5/6  " src="../assets/html-1.svg" alt="react" />
      </div>
      <div className="w-[100px] h-[100px] sm:w-60 sm:h-60 flex justify-center items-center rounded-md bg-gradient-to-t from-yellow1 border-yellow1  border-b-4 m-2 hover:saturate-200">
        <img
          className="w-5/6 h-5/6  "
          src="../assets/javascript-1.svg"
          alt="react"
        />
      </div>
      <div className="w-[100px] h-[100px] sm:w-60 sm:h-60 flex justify-center items-center rounded-md bg-gradient-to-t from-c border-c  border-b-4 m-2 hover:saturate-200">
        <img className="w-5/6 h-5/6 ml-6 " src="../assets/c.svg" alt="react" />
      </div>
      <div className="w-[100px] h-[100px] sm:w-60 sm:h-60 flex justify-center items-center rounded-md bg-gradient-to-t from-python border-python border-b-4 m-2 hover:saturate-200">
        <img
          className="w-5/6 h-5/6  "
          src="../assets/python-5.svg"
          alt="react"
        />
      </div>
      <div className="w-[100px] h-[100px] sm:w-60 sm:h-60 flex justify-center items-center rounded-md bg-gradient-to-t from-c border-c border-b-4 m-2 hover:saturate-200">
        <img className="w-5/6 h-5/6  " src="../assets/c-1.svg" alt="react" />
      </div>
      <div className="w-[100px] h-[100px] sm:w-60 sm:h-60 flex justify-center items-center rounded-md bg-gradient-to-t from-c border-c  border-b-4 m-2 hover:saturate-200">
        <img
          className="w-5/6 h-5/6  "
          src="../assets/mysql-logo.svg"
          alt="react"
        />
      </div>
      <div className="w-[100px] h-[100px] sm:w-60 sm:h-60 flex justify-center items-center rounded-md bg-gradient-to-t from-mongo border-mongo  border-b-4 m-2 hover:saturate-200">
        <img
          className="w-5/6 h-5/6  "
          src="../assets/mongodb-icon-1.svg"
          alt="react"
        />
      </div>
    </div>
  );
};

export default SkillsMedia;
